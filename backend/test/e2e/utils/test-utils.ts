import request from "supertest";
import { INestApplication } from "@nestjs/common";
import axios from "axios";
import { validUserData } from "./test-data";
import { UserResponseDto } from "src/application/dto/User/Response/user-response.dto";

export async function loginUser(
  app: INestApplication,
  email: string,
  password: string
): Promise<string> {
  const response = await request(app.getHttpServer())
    .post("/auth/signin")
    .send({ email, password });
  return response.body.accessToken;
}

export async function createUserTest(
  app: INestApplication
): Promise<UserResponseDto> {
  const response = await request(app.getHttpServer())
    .post("/users/create")
    .send(validUserData);
  return response.body;
}

export function generateUniqueCompanyName(baseName: string): string {
  return `${baseName}-${Date.now()}`;
}

export async function fetchImageStream() {
  const response = await axios.get("https://placehold.co/600x400", {
    responseType: "stream",
  });
  return response.data;
}
