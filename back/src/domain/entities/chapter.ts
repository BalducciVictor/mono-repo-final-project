import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type ChapterDocument = HydratedDocument<Chapter>;

@Schema()
export class Chapter {
  @Prop({ required: true, unique: true })
  chapterName: string;
  @Prop({ required: true })
  hasQuiz: boolean;
  @Prop({ required: true })
  description: string;
  @Prop({ required: true })
  adminMail: string;
}

export const ChapterSchema = SchemaFactory.createForClass(Chapter);
