import { Test, TestingModule } from "@nestjs/testing";
import { INestApplication, HttpStatus } from "@nestjs/common";
import request from "supertest";
import { AppModule } from "../../../src/infrastructure/config/modules/app.module";
import { fetchImageStream, loginUser } from "../utils/test-utils";
import { adminCredentials, userCredentials } from "../utils/test-data";

describe("ContentController (e2e)", () => {
  let app: INestApplication;
  let adminToken: string;
  let userToken: string;
  let image: any;
  const listBlobName: string[] = [];

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    adminToken = await loginUser(
      app,
      adminCredentials.email,
      adminCredentials.password
    );
    userToken = await loginUser(
      app,
      userCredentials.email,
      userCredentials.password
    );
    image = await fetchImageStream();
  }, 10000);

  it("should allow ADMIN to upload a file and return url", async () => {
    const response = await request(app.getHttpServer())
      .post("/upload")
      .set("Authorization", `Bearer ${adminToken}`)
      .attach("file", image, "test_file.svg")
      .query({ contentType: "image/svg+xml" });
    const returnedUrl: string = response.body.url;

    expect(response.status).toBe(HttpStatus.CREATED);
    expect(returnedUrl).toMatch(
      /https:\/\/[a-zA-Z0-9]+\.blob\.core\.windows\.net\/[a-zA-Z0-9]+\/[a-zA-Z0-9]+/
    );

    const urlParts: Array<string> = returnedUrl.split("/");
    const blobName: string = urlParts[urlParts.length - 1];
    listBlobName.push(blobName);
  });

  it("should reject access to USER to upload a file", async () => {
    const response = await request(app.getHttpServer())
      .post("/upload")
      .set("Authorization", `Bearer ${userToken}`)
      .attach("file", image, "test_file.svg")
      .query({ contentType: "image/svg+xml" });
    expect(response.status).toBe(HttpStatus.FORBIDDEN);
  });

  it("should reject access to upload a file for unauthorized users", async () => {
    const response = await request(app.getHttpServer())
      .post("/upload")
      .attach("file", image, "test_file.svg")
      .query({ contentType: "image/svg+xml" });
    expect(response.status).toBe(HttpStatus.UNAUTHORIZED);
  });

  afterAll(async () => {
    for (const blobName of listBlobName) {
      await request(app.getHttpServer())
        .delete(`/upload/${blobName}`)
        .set("Authorization", `Bearer ${adminToken}`);
    }

    await app.close();
  });
});
