import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsArray } from "class-validator";
import { Type } from "class-transformer";
import { UpdateQuestionRequestDto } from "../Question/Request/update-question-request.dto";

export class UpdateQuestionnaireRequestDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  step?: number;

  @ApiProperty()
  @IsArray()
  @Type(() => UpdateQuestionRequestDto)
  questions?: Array<UpdateQuestionRequestDto>;
}
