import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument, Types } from "mongoose";
import { DocumentationDocument, DocumentationSchema } from "./documentation";
import {
  QuestionnaireSchema,
  QuestionnaireDocument,
} from "../questionnaire/questionnaire";

export type ChapterDocument = HydratedDocument<Chapter>;

@Schema()
export class Chapter {
  @Prop({ required: true, unique: true })
  chapterName: string;

  @Prop({ required: true })
  hasQuiz: boolean;

  @Prop({ type: [QuestionnaireSchema], default: [] })
  questionnaire: Types.DocumentArray<QuestionnaireDocument>;

  @Prop({ required: true })
  category: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true, min: 0 })
  timeToRead: number;

  @Prop({ required: true, ref: "Company" })
  companyId: Types.ObjectId;

  @Prop({ type: [DocumentationSchema], default: [] })
  documentation: Types.DocumentArray<DocumentationDocument>;
}

export const ChapterSchema = SchemaFactory.createForClass(Chapter);
