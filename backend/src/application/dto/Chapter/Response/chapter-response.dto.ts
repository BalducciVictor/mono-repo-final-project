import { ApiProperty } from "@nestjs/swagger";
import {
  IsNotEmpty,
  IsString,
  IsBoolean,
  ValidateNested,
  IsArray,
  IsNumber,
} from "class-validator";
import { CreateDocumentationRequestDto } from "../../Documentation/Request/create-documentation-request.dto";
import { Type } from "class-transformer";
import { QuestionnaireResponseDto } from "../../Questionnaire/Response/questionnaire-response.dto";
import { Types } from "mongoose";

export class ChapterResponseDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  chapterName: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  category: string;

  @ApiProperty()
  @IsBoolean()
  @IsNotEmpty()
  hasQuiz: boolean;

  @ApiProperty()
  @IsBoolean()
  @IsNotEmpty()
  @Type(() => QuestionnaireResponseDto)
  questionnaire: Array<QuestionnaireResponseDto>;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty()
  @IsNotEmpty()
  @Type(() => Types.ObjectId)
  companyId: Types.ObjectId;

  @ApiProperty()
  @IsNumber()
  timeToRead: number;

  @ApiProperty()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateDocumentationRequestDto)
  @IsNotEmpty()
  documentation: Array<CreateDocumentationRequestDto>;
}
