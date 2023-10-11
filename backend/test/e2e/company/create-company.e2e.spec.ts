import { Test, TestingModule } from "@nestjs/testing";
import { INestApplication, HttpStatus } from "@nestjs/common";
import request from "supertest";
import { AppModule } from "../../../src/infrastructure/config/modules/app.module";
import { generateUniqueCompanyName, loginUser } from "../utils/test-utils";
import {
  adminCredentials,
  companyData,
  userCredentials,
} from "../utils/test-data";

describe("CompanyController (e2e)", () => {
  let app: INestApplication;
  let adminToken: string;
  let userToken: string;
  const createdCompanyIds: string[] = [];

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
  });

  it("should allow ADMIN to create a company", async () => {
    const dynamicCompanyData = {
      ...companyData,
      name: generateUniqueCompanyName("Hetic"),
    };
    const response = await request(app.getHttpServer())
      .post("/company")
      .set("Authorization", `Bearer ${adminToken}`)
      .send(dynamicCompanyData);
    expect(response.status).toBe(HttpStatus.CREATED);
    expect(response.body).toHaveProperty("_id");
    createdCompanyIds.push(response.body._id);
  });

  it("should reject access to USER to create a company", async () => {
    const response = await request(app.getHttpServer())
      .post("/company")
      .set("Authorization", `Bearer ${userToken}`)
      .send(companyData);
    expect(response.status).toBe(HttpStatus.FORBIDDEN);
  });

  it("should reject access to create a company for unauthorized users", async () => {
    const response = await request(app.getHttpServer())
      .post("/company")
      .send(companyData);
    expect(response.status).toBe(HttpStatus.UNAUTHORIZED);
  });

  afterAll(async () => {
    for (const companyId of createdCompanyIds) {
      await request(app.getHttpServer())
        .delete(`/company/${companyId}`)
        .set("Authorization", `Bearer ${adminToken}`);
    }
    await app.close();
  });
});
