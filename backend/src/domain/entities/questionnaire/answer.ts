import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type AnswerDocument = HydratedDocument<Answer>;

@Schema()
export class Answer {
  @Prop({ required: true })
  content: string;

  @Prop({ default: false })
  isCorrect: boolean;
}

export const AnswerSchema = SchemaFactory.createForClass(Answer);
