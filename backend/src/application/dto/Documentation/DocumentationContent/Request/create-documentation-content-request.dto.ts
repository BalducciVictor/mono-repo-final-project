import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, IsNumber } from "class-validator";
import { DocumentationContentType } from "src/domain/enum/documentationContentType";

export class CreateDocumentationContentRequestDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  content: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  contentType: DocumentationContentType;
}
