import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";
import { v4 as uuidv4 } from "uuid";

export type ChapterDocument = HydratedDocument<Chapter>;

@Schema()
export class Chapter {
  @Prop({ required: false })
  steps?: number;
  @Prop({ required: true, unique: true })
  chapterName: string;
  @Prop({ required: true })
  hasQuiz: boolean;
  @Prop({ required: true })
  description: string;
  @Prop({ unique: true, default: uuidv4 })
  userId: string;
}

export const ChapterSchema = SchemaFactory.createForClass(Chapter);
