import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument, Types } from "mongoose";
import { QuestionDocument, QuestionSchema } from "./question";

export type QuestionnaireDocument = HydratedDocument<Questionnaire>;

@Schema()
export class Questionnaire {
  @Prop({ required: true })
  step: number;

  @Prop({ type: [QuestionSchema], default: [] })
  questions: Types.DocumentArray<QuestionDocument>;
}

export const QuestionnaireSchema = SchemaFactory.createForClass(Questionnaire);
