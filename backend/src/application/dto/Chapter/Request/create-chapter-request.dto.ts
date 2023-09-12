import { ApiProperty } from "@nestjs/swagger";
import {
  IsNotEmpty,
  IsString,
  IsBoolean,
  ValidateNested,
  IsArray,
} from "class-validator";
import { Type } from "class-transformer";
import { CreateDocumentationRequestDto } from "../../Documentation/Request/create-documentation-request.dto";

export class CreateChapterRequestDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  chapterName: string;

  @ApiProperty()
  @IsBoolean()
  @IsNotEmpty()
  hasQuiz: boolean;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateDocumentationRequestDto)
  @IsNotEmpty()
  documents: CreateDocumentationRequestDto[];
}
