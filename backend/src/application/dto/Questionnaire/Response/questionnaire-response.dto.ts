import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsArray } from "class-validator";
import { Type } from "class-transformer";
import { QuestionResponseDto } from "../Question/Response/question-response.dto";

export class QuestionnaireResponseDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  step: number;

  @ApiProperty()
  @IsArray()
  @Type(() => QuestionResponseDto)
  questions: Array<QuestionResponseDto>;
}
