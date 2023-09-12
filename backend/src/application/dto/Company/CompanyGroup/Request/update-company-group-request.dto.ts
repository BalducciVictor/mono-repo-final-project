import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsArray } from "class-validator";

export class UpdateCompanyGroupRequestDto {
  @ApiProperty()
  @IsArray()
  @IsNotEmpty()
  user?: Array<string>;

  @ApiProperty()
  @IsArray()
  @IsNotEmpty()
  groupName?: string;
}
