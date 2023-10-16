import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, IsNumber, IsArray } from "class-validator";
import { CreateDocumentationContentRequestDto } from "../DocumentationContent/Request/create-documentation-content-request.dto";

export class CreateDocumentationRequestDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  step: number;

  @ApiProperty()
  @IsArray()
  @IsNotEmpty()
  documentationContent: CreateDocumentationContentRequestDto[];
}
