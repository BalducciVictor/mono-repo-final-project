import { ApiProperty } from "@nestjs/swagger";
import {
  IsNotEmpty,
  IsString,
  IsBoolean,
  ValidateNested,
  IsArray,
} from "class-validator";
import { CreateDocumentationRequestDto } from "../../Documentation/Request/create-documentation-request.dto";
import { Type } from "class-transformer";
import { QuestionnaireResponseDto } from "../../Questionnaire/Response/questionnaire-response.dto";

export class ChapterResponseDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  adminMail?: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  chapterName?: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  category?: string;

  @ApiProperty()
  @IsBoolean()
  @IsNotEmpty()
  hasQuiz?: boolean;

  @ApiProperty()
  @IsBoolean()
  @IsNotEmpty()
  @Type(() => QuestionnaireResponseDto)
  questionnaire?: Array<QuestionnaireResponseDto>;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  description?: string;

  @ApiProperty()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateDocumentationRequestDto)
  @IsNotEmpty()
  documents?: Array<CreateDocumentationRequestDto>;
}
