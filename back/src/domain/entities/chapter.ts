import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type ChapterDocument = HydratedDocument<Chapter>;

@Schema()
export class Chapter {
  @Prop({ required: false })
  steps?: number;
  @Prop({ required: true, unique: true })
  name: string;
  @Prop({ required: true })
  hasQuiz: boolean;
  @Prop({ required: true })
  description: string;
}

export const ChapterSchema = SchemaFactory.createForClass(Chapter);
