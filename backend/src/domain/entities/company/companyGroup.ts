import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type CompanyGroupDocument = HydratedDocument<CompanyGroup>;

@Schema()
export class CompanyGroup {
  _id?: any;
  @Prop({ required: true })
  user: Array<string>;
  @Prop({ required: true })
  groupName: string;
}

export const CompanyGroupSchema = SchemaFactory.createForClass(CompanyGroup);
