import { NestFactory } from "@nestjs/core";
import { AppModule } from "./infrastructure/config/modules/app.module";
import { SwaggerModule, DocumentBuilder } from "@nestjs/swagger";
import * as dotenv from "dotenv";

async function bootstrap() {
  dotenv.config();
  const app = await NestFactory.create(AppModule);
  const swaggerConfig = new DocumentBuilder()
    .setTitle("API with NestJS")
    .setDescription("API developed throughout the API with NestJS course")
    .setVersion("1.0")
    .addTag("chapter")
    .addTag("users")
    .addTag("auth")
    .addTag("documentation")
    .build();

  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup("api", app, document);

  await app.listen(3000);
  console.log(`Application is running on: localhost:3000/api`);
}
bootstrap();
