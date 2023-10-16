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

  @Prop()
  currentChapterIds: Array<string>;

  @Prop()
  currentChapterStepId: Array<string>;

  @Prop()
  validatedChapterId: Array<string>;

  @Prop()
  createdAt: Date;

  @Prop()
  refreshToken: string;

  @Prop()
  refreshTokenExpiresAt: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);
