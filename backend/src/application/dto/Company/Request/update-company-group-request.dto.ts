import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsNotEmpty, IsArray } from "class-validator";
import { UpdateCompanyGroupRequestDto } from "../CompanyGroup/Request/update-company-group-request.dto";

export class UpdateCompanyRequestDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name?: string;

  @ApiProperty()
  @IsArray()
  @IsNotEmpty()
  companyGroup?: Array<UpdateCompanyGroupRequestDto>;
}
