import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { DocumentationContent } from "./documentationContent";
import { HydratedDocument } from "mongoose";
import * as mongoose from "mongoose";

export type DocumentationDocument = HydratedDocument<Documentation>;

@Schema()
export class Documentation {
  @Prop({ required: true })
  title: string;
  @Prop({ required: true })
  step: number;
  @Prop({ required: true })
  chapterId: number;
  @Prop({ required: true })
  documentationContentId: Array<string>;
}

export const DocumentationSchema = SchemaFactory.createForClass(Documentation);
