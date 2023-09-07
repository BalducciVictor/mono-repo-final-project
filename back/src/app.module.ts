import { MongooseModule } from "@nestjs/mongoose";
import { User, UserSchema } from "./domain/entities/user";
import { Module } from "@nestjs/common";
import { UserService } from "./domain/services/user.service";
import { UserRepository } from "./infrastructure/repository/user.repository";
import { IUserService } from "src/domain/interfaces/services/IUserService";
import { IUserRepository } from "./domain/interfaces/repository/IUserRepository";
import { IChapterService } from "./domain/interfaces/services/IChapterService";
import { ChapterService } from "./domain/services/chapter.service";
import { IChapterRepository } from "./domain/interfaces/repository/IChapterRepository";
import { ChapterRepository } from "./infrastructure/repository/chapter.respository";
import { Chapter, ChapterSchema } from "./domain/entities/chapter";
import { UserUseCase } from "./application/useCases/user/user.use-case";
import { ChapterUseCase } from "./application/useCases/chapter/chapter.use-case";
import UserController from "./application/controllers/user.controller";
import ChapterController from "./application/controllers/chapter.controller";

@Module({
  imports: [
    MongooseModule.forRoot(
      "mongodb+srv://admin:admin@ewcglki.mongodb.net/?retryWrites=true&w=majority"
    ),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    MongooseModule.forFeature([{ name: Chapter.name, schema: ChapterSchema }]),
  ],
  controllers: [UserController, ChapterController],
  providers: [
    UserUseCase,
    ChapterUseCase,

    ///Declare Services
    {
      provide: IChapterService,
      useClass: ChapterService,
    },
    {
      provide: IUserService,
      useClass: UserService,
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
  ],
})
export class AppModule {}
