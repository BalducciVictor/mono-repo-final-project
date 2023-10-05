import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument, Types } from "mongoose";
import { DocumentationDocument, DocumentationSchema } from "./documentation";

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

  @Prop({ type: [DocumentationSchema], default: [] })
  documents: Types.DocumentArray<DocumentationDocument>;
}

export const ChapterSchema = SchemaFactory.createForClass(Chapter);
