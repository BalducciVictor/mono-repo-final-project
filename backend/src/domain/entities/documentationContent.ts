import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { DocumentationContentType } from "../enum/documentationContentType";
import { HydratedDocument } from "mongoose";

export type DocumentationContentDocument =
  HydratedDocument<DocumentationContent>;

@Schema()
export class DocumentationContent {
  @Prop({ required: true })
  content: string;
  @Prop({ required: true, enum: Object.values(DocumentationContentType) })
  contentType: DocumentationContentType;
  _id: any;
}

export const DocumentationContentSchema =
  SchemaFactory.createForClass(DocumentationContent);
