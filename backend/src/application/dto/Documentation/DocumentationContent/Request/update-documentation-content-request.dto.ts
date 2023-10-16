import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";
import { DocumentationContentType } from "src/domain/enum/documentationContentType";

export class UpdateDocumentationContentRequestDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  content?: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  contentType?: DocumentationContentType;
}
