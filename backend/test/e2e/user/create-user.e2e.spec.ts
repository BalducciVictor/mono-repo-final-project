import { INestApplication } from "@nestjs/common";
import request from "supertest";
import {
  adminCredentials,
  invalidUserData,
  userCredentials,
  validUserData,
} from "../utils/test-data";
import { loginUser } from "../utils/test-utils";
import { AppModule } from "../../../src/infrastructure/config/modules/app.module";
import { Test } from "@nestjs/testing";

describe("UserController (e2e)", () => {
  let app: INestApplication;
  let adminToken: string;
  let userToken: string;
  const listUserId: string[] = [];

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
    userToken = await loginUser(
      app,
      userCredentials.email,
      userCredentials.password
    );
  }, 10000);

  it("should allow ADMIN to create a user", async () => {
    const response = await request(app.getHttpServer())
      .post("/users")
      .set("Authorization", `Bearer ${adminToken}`)
      .send(validUserData);

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("_id");
    listUserId.push(response.body._id);
  });

  it("should throw a conflic when ADMIN create a user", async () => {
    const response = await request(app.getHttpServer())
      .post("/users")
      .set("Authorization", `Bearer ${adminToken}`)
      .send(validUserData);

    expect(response.status).toBe(409);
  });

  it("should reject access to USER to create a user", async () => {
    const response = await request(app.getHttpServer())
      .post("/users")
      .set("Authorization", `Bearer ${userToken}`)
      .send(validUserData);

    expect(response.status).toBe(403);
  });

  it("should reject access to create a user for unauthorized users", async () => {
    const response = await request(app.getHttpServer())
      .post("/users")
      .send(validUserData);

    expect(response.status).toBe(401);
  });

  it("should not allow creation of user with invalid data", async () => {
    const response = await request(app.getHttpServer())
      .post("/users")
      .set("Authorization", `Bearer ${adminToken}`)
      .send(invalidUserData);

    expect(response.status).not.toBe(201);
  });

  afterAll(async () => {
    for (const userId of listUserId) {
      await request(app.getHttpServer())
        .delete(`/users/${userId}`)
        .set("Authorization", `Bearer ${adminToken}`);
    }
    await app.close();
  });
});
