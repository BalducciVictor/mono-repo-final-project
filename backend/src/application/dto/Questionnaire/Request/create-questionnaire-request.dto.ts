import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsArray } from "class-validator";
import { Type } from "class-transformer";
import { CreateQuestionRequestDto } from "../Question/Request/create-question-request.dto";

export class CreateQuestionnaireRequestDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  step: number;

  @ApiProperty()
  @IsArray()
  @Type(() => CreateQuestionRequestDto)
  questions: Array<CreateQuestionRequestDto>;
}
