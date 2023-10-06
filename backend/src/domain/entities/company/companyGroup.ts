import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument, Types } from "mongoose";

export type CompanyGroupDocument = HydratedDocument<CompanyGroup>;

@Schema()
export class CompanyGroup {
  @Prop([{ type: Types.ObjectId, ref: "User" }])
  user: Types.ObjectId[];
  @Prop({ required: true })
  groupName: string;
}

export const CompanyGroupSchema = SchemaFactory.createForClass(CompanyGroup);
