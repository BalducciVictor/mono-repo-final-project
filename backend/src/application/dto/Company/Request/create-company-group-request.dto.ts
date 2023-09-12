import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsNotEmpty, IsArray } from "class-validator";
import { CreateCompanyGroupRequestDto } from "../CompanyGroup/Request/create-company-group-request.dto";

export class CreateCompanyRequestDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsArray()
  @IsNotEmpty()
  companyGroup?: Array<CreateCompanyGroupRequestDto>;
}
