import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsNotEmpty, IsArray } from "class-validator";
import { CompanyGroupDocument } from "src/domain/entities/company/companyGroup";

export class CompanyResponseDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsArray()
  @IsNotEmpty()
  companyGroup: Array<CompanyGroupDocument>;
}
