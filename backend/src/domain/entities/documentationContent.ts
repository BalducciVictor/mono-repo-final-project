import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { DocumentationContentType } from "./documentationContentType";
import { HydratedDocument, SchemaTypes } from "mongoose";
import * as mongoose from "mongoose";

export type DocumentationContentDocument =
  HydratedDocument<DocumentationContent>;

@Schema()
export class DocumentationContent {
  @Prop({ required: true })
  content: string;
  @Prop({ required: true })
  contentType: DocumentationContentType;
  _id: any;
}

export const DocumentationContentSchema =
  SchemaFactory.createForClass(DocumentationContent);
