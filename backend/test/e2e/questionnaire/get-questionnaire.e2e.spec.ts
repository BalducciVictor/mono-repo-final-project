import { Test, TestingModule } from "@nestjs/testing";
import { INestApplication, HttpStatus } from "@nestjs/common";
import request from "supertest";
import { AppModule } from "../../../src/infrastructure/config/modules/app.module";
import { loginUser } from "../utils/test-utils";
import {
  adminCredentials,
  chapterId,
  questionnaireId,
  userCredentials,
} from "../utils/test-data";

describe("QuestionnaireController (e2e)", () => {
  let app: INestApplication;

  let userToken: string;
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
    userToken = await loginUser(
      app,
      userCredentials.email,
      userCredentials.password
    );
  });

  it("should fetch all questionnaires for USER role", async () => {
    const response = await request(app.getHttpServer())
      .get(`/chapters/${chapterId}/questionnaires`)
      .set("Authorization", `Bearer ${userToken}`);
    expect(response.status).toBe(HttpStatus.OK);
    expect(response.body.length).toBeGreaterThan(0);
  });

  it("should fetch all questionnaires for ADMIN role", async () => {
    const response = await request(app.getHttpServer())
      .get(`/chapters/${chapterId}/questionnaires`)
      .set("Authorization", `Bearer ${adminToken}`);
    expect(response.status).toBe(HttpStatus.OK);
    expect(response.body.length).toBeGreaterThan(0);
  });

  it("should reject access to fetch all questionnaires for unauthorized users", async () => {
    const response = await request(app.getHttpServer()).get(
      `/chapters/${chapterId}/questionnaires`
    );
    expect(response.status).toBe(HttpStatus.UNAUTHORIZED);
  });

  it("should fetch the questionnaire for ADMIN role", async () => {
    const response = await request(app.getHttpServer())
      .get(`/chapters/${chapterId}/questionnaires/${questionnaireId}`)
      .set("Authorization", `Bearer ${adminToken}`);
    expect(response.status).toBe(HttpStatus.OK);
    expect(response.body).toHaveProperty("_id");
  });

  it("should reject access to fetch a questionnaire for unauthorized users", async () => {
    const response = await request(app.getHttpServer()).get(
      `/chapters/${chapterId}/questionnaires/${questionnaireId}`
    );
    expect(response.status).toBe(HttpStatus.UNAUTHORIZED);
  });

  afterAll(async () => {
    await app.close();
  });
});
