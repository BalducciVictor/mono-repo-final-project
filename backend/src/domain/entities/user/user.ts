import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument, Types } from "mongoose";

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

  @Prop({ type: Types.ObjectId, ref: "Company", required: true })
  companyId: Types.ObjectId;

  @Prop({ required: true })
  role: string;

  @Prop({ required: true })
  currentChapterId: number;

  @Prop({ required: true })
  currentChapterStepId: number;

  @Prop([String])
  validatedChapterId: string[];
}

export const UserSchema = SchemaFactory.createForClass(User);
