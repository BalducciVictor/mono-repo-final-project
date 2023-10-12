import { INestApplication } from "@nestjs/common";
import { AppModule } from "../../../src/infrastructure/config/modules/app.module";
import request from "supertest";
import { Test } from "@nestjs/testing";
import { adminCredentials, companyId, userId } from "../utils/test-data";
import { loginUser } from "../utils/test-utils";
import { UserResponseDto } from "../../../src/application/dto/User/Response/user-response.dto";

describe("UserController (e2e)", () => {
  let app: INestApplication;
  let adminToken: string;

  beforeAll(async () => {
    const moduleFixture = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
    adminToken = await loginUser(
      app,
      adminCredentials.email,
      adminCredentials.password
    );
  }, 10000);

  it("should return a user for a valid userId with correct authorization", async () => {
    const response = await request(app.getHttpServer())
      .get(`/users/${userId}`)
      .set("Authorization", `Bearer ${adminToken}`);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("_id");
  });

  it("should return forbidden if the user does not have the correct authorization", async () => {
    const unauthorizedToken = "some_token";
    const response = await request(app.getHttpServer())
      .get(`/users/${userId}`)
      .set("Authorization", `Bearer ${unauthorizedToken}`);

    expect(response.status).toBe(401);
  });

  it("should return forbidden if the user does not have the correct authorization for getting users by companyId", async () => {
    const unauthorizedToken = "some_token";
    const response = await request(app.getHttpServer())
      .get("/users")
      .query({ companyId })
      .set("Authorization", `Bearer ${unauthorizedToken}`);

    expect(response.status).toBe(401);
  });

  afterAll(async () => {
    await app.close();
  });
});
