import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import {
  DocumentationContentDocument,
  DocumentationContentSchema,
} from "./documentationContent";
import { HydratedDocument, Types } from "mongoose";

export type DocumentationDocument = HydratedDocument<Documentation>;

@Schema()
export class Documentation {
  @Prop({ required: true })
  title: string;
  @Prop({ required: true })
  step: number;
  @Prop({ type: [DocumentationContentSchema], default: [] })
  documentationContent: Types.DocumentArray<DocumentationContentDocument>;
}

export const DocumentationSchema = SchemaFactory.createForClass(Documentation);
