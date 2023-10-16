import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, IsNumber, IsArray } from "class-validator";
import { UpdateDocumentationContentRequestDto } from "../DocumentationContent/Request/update-documentation-content-request.dto";

export class UpdateDocumentationRequestDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  title?: string;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  step?: number;

  @ApiProperty()
  @IsArray()
  @IsNotEmpty()
  documentationContent?: UpdateDocumentationContentRequestDto[];
}
