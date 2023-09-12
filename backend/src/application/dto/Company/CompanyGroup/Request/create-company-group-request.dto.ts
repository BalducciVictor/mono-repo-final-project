import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsArray } from "class-validator";

export class CreateCompanyGroupRequestDto {
  @ApiProperty()
  @IsArray()
  @IsNotEmpty()
  user: Array<string>;

  @ApiProperty()
  @IsArray()
  @IsNotEmpty()
  groupName: string;
}
