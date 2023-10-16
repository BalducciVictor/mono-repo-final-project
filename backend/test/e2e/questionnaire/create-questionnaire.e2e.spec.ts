import request from "supertest";
import { AppModule } from "../../../src/infrastructure/config/modules/app.module";
import { HttpStatus, INestApplication } from "@nestjs/common";
import { Test } from "@nestjs/testing";
import { loginUser } from "../utils/test-utils";
import {
  adminCredentials,
  chapterId,
  userCredentials,
  createQuestionnaireData,
} from "../utils/test-data";

describe("QuestionnaireController (e2e)", () => {
  let app: INestApplication;
  let adminToken: string;
  let userToken: string;
  const createdQuestionnaireIds: string[] = [];

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

  it("should reject create a questionnaire for a USER", async () => {
    const response = await request(app.getHttpServer())
      .post(`/chapters/${chapterId}/questionnaires`)
      .set("Authorization", `Bearer ${userToken}`)
      .send(createQuestionnaireData);
    expect(response.status).toBe(HttpStatus.FORBIDDEN);
  });

  it("should create multiple questionnaires for an ADMIN", async () => {
    const response = await request(app.getHttpServer())
      .post(`/chapters/${chapterId}/questionnaires`)
      .set("Authorization", `Bearer ${adminToken}`)
      .send(createQuestionnaireData);

    expect(response.status).toBe(HttpStatus.CREATED);
    expect(Array.isArray(response.body)).toBeTruthy();

    response.body.forEach((questionnaire) => {
      expect(questionnaire).toHaveProperty("_id");
      createdQuestionnaireIds.push(questionnaire._id);
    });
  });

  it("should reject questionnaire creation for unauthorized user", async () => {
    const response = await request(app.getHttpServer())
      .post(`/chapters/${chapterId}/questionnaires`)
      .set("Authorization", `Bearer ${userToken}`)
      .send(createQuestionnaireData);
    expect(response.status).toBe(HttpStatus.FORBIDDEN);
  });

  afterAll(async () => {
    for (const questionnaireId of createdQuestionnaireIds) {
      await request(app.getHttpServer())
        .delete(`/chapters/${chapterId}/questionnaires/${questionnaireId}`)
        .set("Authorization", `Bearer ${adminToken}`);
    }
    await app.close();
  });
});
