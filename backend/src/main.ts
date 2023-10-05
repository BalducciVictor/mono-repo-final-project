import { NestFactory } from "@nestjs/core";
import { AppModule } from "./infrastructure/config/modules/app.module";
import { SwaggerModule, DocumentBuilder } from "@nestjs/swagger";
import * as dotenv from "dotenv";

dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const swaggerConfig = new DocumentBuilder()
    .setTitle("API with NestJS for our Onby app")
    .setDescription("Onby swagger")
    .setVersion("1.0")
    .addBearerAuth()
    .addTag("chapter")
    .addTag("users")
    .addTag("auth")
    .addTag("company")
    .addTag("upload")
    .build();

  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup("api", app, document);

  const PORT = process.env.PORT || 8000;
  await app.listen(PORT);
  console.log(`Application is running on: localhost:${PORT}/api`);
}
bootstrap();
