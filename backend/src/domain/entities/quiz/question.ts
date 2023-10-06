import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument, Types } from "mongoose";
import { AnswerSchema, AnswerDocument } from "./answer";

export type QuestionDocument = HydratedDocument<Question>;

@Schema()
export class Question {
  @Prop({ required: true })
  content: string;

  @Prop({ type: [AnswerSchema], default: [] })
  answers: Types.DocumentArray<AnswerDocument>;
}

export const QuestionSchema = SchemaFactory.createForClass(Question);
