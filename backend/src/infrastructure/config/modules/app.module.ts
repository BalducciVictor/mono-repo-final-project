import { MongooseModule } from "@nestjs/mongoose";
import { User, UserSchema } from "../../../domain/entities/user/user";
import { Module } from "@nestjs/common";
import { UserService } from "../../../domain/services/user.service";
import { UserRepository } from "../../repository/user.repository";
import { IUserService } from "../../../domain/interfaces/services/IUserService";
import { IUserRepository } from "../../../domain/interfaces/repository/IUserRepository";
import { IChapterService } from "../../../domain/interfaces/services/IChapterService";
import { ChapterService } from "../../../domain/services/chapter.service";
import { IChapterRepository } from "../../../domain/interfaces/repository/IChapterRepository";
import { ChapterRepository } from "../../repository/chapter.respository";
import {
  Chapter,
  ChapterSchema,
} from "../../../domain/entities/chapter/chapter";
import { UserUseCase } from "../../../application/useCases/user/user.use-case";
import { ChapterUseCase } from "../../../application/useCases/chapter/chapter.use-case";
import UserController from "../../../application/controllers/user.controller";
import ChapterController from "../../../application/controllers/chapter.controller";
import { PassportModule } from "@nestjs/passport";
import { JwtModule } from "@nestjs/jwt";
import { AuthService } from "../../../domain/services/auth.service";
import { AuthController } from "../../../application/controllers/auth.controller";
import { ConfigModule } from "@nestjs/config";
import { CompanyRepository } from "../../../infrastructure/repository/company.respository";
import { ICompanyRepository } from "../../../domain/interfaces/repository/ICompanyRepository";
import { ICompanyService } from "../../../domain/interfaces/services/ICompanyService";
import { CompanyService } from "../../../domain/services/company.service";
import {
  Company,
  CompanySchema,
} from "../../../domain/entities/company/company";
import CompanyController from "../../../application/controllers/company.controller";
import { CompanyUseCase } from "../../../application/useCases/company/company.use-case";
import { ContentController } from "src/application/controllers/content.controller";
import { BlobContentService } from "src/domain/services/blobContent.service";
import { IBlobContentService } from "src/domain/interfaces/services/IBlobContentService";
import { IQuestionnaireService } from "src/domain/interfaces/services/IQuestionnaireService";
import { QuestionnaireService } from "src/domain/services/questionnaire.service";
import { QuestionnaireController } from "src/application/controllers/questionnaire.controller";
import {
  Questionnaire,
  QuestionnaireSchema,
} from "src/domain/entities/quiz/questionnaire";
import { ContentUseCase } from "src/application/useCases/content/content.use-case";
import { QuestionnaireUseCase } from "src/application/useCases/questionnaire/questionnaire.use-case";
import { AuthUseCase } from "src/application/useCases/auth/auth.use-case";

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
    MongooseModule.forFeature([{ name: Company.name, schema: CompanySchema }]),
    MongooseModule.forFeature([
      { name: Questionnaire.name, schema: QuestionnaireSchema },
    ]),
  ],
  controllers: [
    UserController,
    ChapterController,
    AuthController,
    CompanyController,
    ContentController,
    QuestionnaireController,
  ],
  providers: [
    //DeclareUseCase
    UserUseCase,
    ChapterUseCase,
    CompanyUseCase,
    ContentUseCase,
    QuestionnaireUseCase,
    AuthUseCase,

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
      provide: ICompanyService,
      useClass: CompanyService,
    },
    {
      provide: IBlobContentService,
      useClass: BlobContentService,
    },
    {
      provide: IQuestionnaireService,
      useClass: QuestionnaireService,
    },
    ///Declare Repository
    {
      provide: IChapterRepository,
      useClass: ChapterRepository,
    },
    {
      provide: ICompanyRepository,
      useClass: CompanyRepository,
    },
    {
      provide: IUserRepository,
      useClass: UserRepository,
    },
  ],
})
export class AppModule {}
