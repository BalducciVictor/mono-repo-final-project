import { IsArray, IsNotEmpty, IsString, ValidateNested } from "class-validator";
import { Type } from "class-transformer";
import { AnswerResponseDto } from "../Answer/Response/answer-response.dto";
import { ApiProperty } from "@nestjs/swagger";

export class QuestionResponseDto {
  @IsString()
  @ApiProperty()
  @IsNotEmpty()
  content: string;

  @ApiProperty()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => AnswerResponseDto)
  answers: Array<AnswerResponseDto>;
}
