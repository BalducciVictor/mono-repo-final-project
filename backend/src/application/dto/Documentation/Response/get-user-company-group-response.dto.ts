import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsNotEmpty, IsString } from "class-validator";
import { CompanyGroupDocument } from "src/domain/entities/company/companyGroup";

export class GetUserCompanyGroupResponseDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsArray()
  @IsNotEmpty()
  companyGroup: CompanyGroupDocument;
}
