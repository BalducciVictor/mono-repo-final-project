import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsArray } from "class-validator";
import { Types } from "mongoose";

export class AddCompanyGroupRequestDto {
  @ApiProperty()
  @IsArray()
  @IsNotEmpty()
  user?: Array<Types.ObjectId>;

  @ApiProperty()
  @IsArray()
  @IsNotEmpty()
  groupName?: string;
}
