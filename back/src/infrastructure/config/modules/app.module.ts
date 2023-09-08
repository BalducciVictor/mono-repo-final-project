import { MongooseModule } from "@nestjs/mongoose";
import { User, UserSchema } from "../../../domain/entities/user";
import { Module } from "@nestjs/common";
import { UserService } from "../../../domain/services/user.service";
import { UserRepository } from "../../repository/user.repository";
import { IUserService } from "src/domain/interfaces/services/IUserService";
import { IUserRepository } from "../../../domain/interfaces/repository/IUserRepository";
import { IChapterService } from "../../../domain/interfaces/services/IChapterService";
import { ChapterService } from "../../../domain/services/chapter.service";
import { IChapterRepository } from "../../../domain/interfaces/repository/IChapterRepository";
import { ChapterRepository } from "../../repository/chapter.respository";
import { Chapter, ChapterSchema } from "../../../domain/entities/chapter";
import { UserUseCase } from "../../../application/useCases/user/user.use-case";
import { ChapterUseCase } from "../../../application/useCases/chapter/chapter.use-case";
import UserController from "../../../application/controllers/user.controller";
import ChapterController from "../../../application/controllers/chapter.controller";
import { PassportModule } from "@nestjs/passport";
import { JwtModule } from "@nestjs/jwt";
import { AuthModule } from "./auth/auth.module";
import { AuthService } from "src/domain/services/auth.service";
import { AuthController } from "src/application/controllers/auth.controller";
import { APP_GUARD } from "@nestjs/core";
import { IDocumentationRepository } from "src/domain/interfaces/repository/IDocumentationRepository";
import { DocumentationRepository } from "src/infrastructure/repository/document.repository";
import { DocumentationContentRepository } from "src/infrastructure/repository/documentation-content.repository";
import { IDocumentationContentRepository } from "src/domain/interfaces/repository/IDocumentationContentRepository";
import { IDocumentationService } from "src/domain/interfaces/services/IDocumentationService";
import { DocumentationService } from "src/domain/services/documentation.service";
import { DocumentationUseCase } from "src/application/useCases/documentation/documentation.use-case";
import DocumentationController from "src/application/controllers/documentation.controller";
import {
  DocumentationContent,
  DocumentationContentSchema,
} from "src/domain/entities/documentationContent";
import {
  Documentation,
  DocumentationSchema,
} from "src/domain/entities/documentation";
import { ConfigModule } from "@nestjs/config";

@Module({
  imports: [
    ConfigModule.forRoot(),
    PassportModule.register({ defaultStrategy: "jwt" }),
    JwtModule.register({
      global: true,
      secret: process.env.SECRET_KEY,
      signOptions: { expiresIn: "1h" },
    }),
    MongooseModule.forRoot(process.env.DATABASE_URL),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    MongooseModule.forFeature([{ name: Chapter.name, schema: ChapterSchema }]),
    MongooseModule.forFeature([
      { name: Documentation.name, schema: DocumentationSchema },
    ]),
    MongooseModule.forFeature([
      { name: DocumentationContent.name, schema: DocumentationContentSchema },
    ]),
  ],
  controllers: [
    UserController,
    ChapterController,
    AuthController,
    DocumentationController,
  ],
  providers: [
    UserUseCase,
    ChapterUseCase,
    DocumentationUseCase,

    ///Declare Services
    AuthService,
    {
      provide: IChapterService,
      useClass: ChapterService,
    },
    {
      provide: IUserService,
      useClass: UserService,
    },
    {
      provide: IDocumentationService,
      useClass: DocumentationService,
    },
    ///Declare Repository
    {
      provide: IChapterRepository,
      useClass: ChapterRepository,
    },
    {
      provide: IUserRepository,
      useClass: UserRepository,
    },
    {
      provide: IDocumentationRepository,
      useClass: DocumentationRepository,
    },
    {
      provide: IDocumentationContentRepository,
      useClass: DocumentationContentRepository,
    },
  ],
})
export class AppModule {}
