import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, IsNumber, IsArray } from "class-validator";
import { DocumentationContent } from "src/domain/entities/documentationContent";

export class CreateDocumentationRequestDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  content: string;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  step: number;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  chapterId: number;

  @ApiProperty()
  @IsArray()
  @IsNotEmpty()
  documentationContent: Array<DocumentationContent>;
}
