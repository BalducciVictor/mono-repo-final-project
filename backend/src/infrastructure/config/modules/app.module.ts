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
import { AuthService } from "src/domain/services/auth.service";
import { AuthController } from "src/application/controllers/auth.controller";
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
  ],
  controllers: [UserController, ChapterController, AuthController],
  providers: [
    UserUseCase,
    ChapterUseCase,

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
