import request from "supertest";
import { INestApplication } from "@nestjs/common";
import axios from "axios";

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

export function generateUniqueCompanyName(baseName: string): string {
  return `${baseName}-${Date.now()}`;
}

export async function fetchImageStream() {
  const response = await axios.get("https://placehold.co/600x400", {
    responseType: "stream",
  });
  return response.data;
}
