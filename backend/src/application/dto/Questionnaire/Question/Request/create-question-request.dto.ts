import { IsArray, IsNotEmpty, IsString, ValidateNested } from "class-validator";
import { Type } from "class-transformer";
import { CreateAnswerRequestDto } from "../Answer/Request/create-answer-request.dto";
import { ApiProperty } from "@nestjs/swagger";

export class CreateQuestionRequestDto {
  @IsString()
  @ApiProperty()
  @IsNotEmpty()
  content: string;

  @ApiProperty()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateAnswerRequestDto)
  answers: CreateAnswerRequestDto[];
}
