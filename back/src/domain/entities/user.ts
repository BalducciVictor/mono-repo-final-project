import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";
import { v4 as uuidv4 } from "uuid";

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
  @Prop({ required: true })
  firstName: string;

  @Prop({ required: true })
  lastName: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ unique: true, default: uuidv4 })
  userId: string;

  @Prop({ required: true })
  companyId: string;

  @Prop({ required: true })
  role: string;

  @Prop({ required: true })
  currentChapterId: number;

  @Prop({ required: true })
  currentChapterStepId: number;

  @Prop([Number])
  validatedChapterId: number[];
}

export const UserSchema = SchemaFactory.createForClass(User);
