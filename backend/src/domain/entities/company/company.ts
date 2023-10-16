import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument, Types } from "mongoose";
import { CompanyGroupDocument, CompanyGroupSchema } from "./companyGroup";

export type CompanyDocument = HydratedDocument<Company>;

@Schema()
export class Company {
  @Prop({ required: true, unique: true })
  name: string;
  @Prop({ type: [CompanyGroupSchema], default: [] })
  companyGroup: Types.DocumentArray<CompanyGroupDocument>;
}

export const CompanySchema = SchemaFactory.createForClass(Company);
