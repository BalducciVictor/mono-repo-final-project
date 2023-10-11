import {
  adminCredentials,
  companyId,
  userCredentials,
} from "../utils/test-data";
import request from "supertest";
import { Test, TestingModule } from "@nestjs/testing";
import { AppModule } from "../../../src/infrastructure/config/modules/app.module";
import { loginUser } from "../utils/test-utils";
import { HttpStatus, INestApplication } from "@nestjs/common";

describe("GET /company/:companyId", () => {
  let app: INestApplication;
  let adminToken: string;
  let userToken: string;

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
  }, 10000);

  it("should allow ADMIN to get a company by ID", async () => {
    const response = await request(app.getHttpServer())
      .get(`/company/${companyId}`)
      .set("Authorization", `Bearer ${adminToken}`);

    expect(response.status).toBe(HttpStatus.OK);
    expect(response.body).toHaveProperty("_id", companyId);
  });

  it("should allow USER to get a company by ID", async () => {
    const response = await request(app.getHttpServer())
      .get(`/company/${companyId}`)
      .set("Authorization", `Bearer ${userToken}`);

    expect(response.status).toBe(HttpStatus.OK);
    expect(response.body).toHaveProperty("_id", companyId);
  });

  it("should reject access for unauthorized users", async () => {
    const response = await request(app.getHttpServer()).get(
      `/company/${companyId}`
    );
    expect(response.status).toBe(HttpStatus.UNAUTHORIZED);
  });

  it("should return NOT FOUND for non-existing company IDs", async () => {
    const nonExistentId = "651ff1d2a7c08f6a11cf84e2";
    const response = await request(app.getHttpServer())
      .get(`/company/${nonExistentId}`)
      .set("Authorization", `Bearer ${adminToken}`);

    expect(response.status).toBe(HttpStatus.NOT_FOUND);
  });
});
