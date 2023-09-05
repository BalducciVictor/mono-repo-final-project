import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { MongooseModule } from "@nestjs/mongoose";
import { User, UserSchema } from "./domain/entities/user";

@Module({
  imports: [
    MongooseModule.forRoot(
      "mongodb+srv://admin:admin@ewcglki.mongodb.net/?retryWrites=true&w=majority"
    ),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
