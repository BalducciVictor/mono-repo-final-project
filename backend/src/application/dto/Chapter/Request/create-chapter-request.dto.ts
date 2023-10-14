import { ApiProperty } from "@nestjs/swagger";
import {
  IsNotEmpty,
  IsString,
  IsBoolean,
  ValidateNested,
  IsArray,
  IsNumber,
  IsDate,
} from "class-validator";
import { Type } from "class-transformer";
import { CreateDocumentationRequestDto } from "../../Documentation/Request/create-documentation-request.dto";
import { CreateQuestionnaireRequestDto } from "../../Questionnaire/Request/create-questionnaire-request.dto";

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
  @Type(() => CreateQuestionnaireRequestDto)
  @IsNotEmpty()
  questionnaire: Array<CreateQuestionnaireRequestDto>;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  category: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty()
  @IsString()
  companyId: string;

  @ApiProperty()
  @IsNumber()
  timeToRead: number;

  @ApiProperty()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateDocumentationRequestDto)
  @IsNotEmpty()
  documentation: CreateDocumentationRequestDto[];

  @IsDate()
  createdAt: Date;
}
