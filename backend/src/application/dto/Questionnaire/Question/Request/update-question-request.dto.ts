import { IsArray, IsNotEmpty, IsString, ValidateNested } from "class-validator";
import { Type } from "class-transformer";
import { UpdateAnswerRequestDto } from "../Answer/Request/update-answer-request.dto";
import { ApiProperty } from "@nestjs/swagger";

export class UpdateQuestionRequestDto {
  @IsString()
  @ApiProperty()
  @IsNotEmpty()
  content?: string;

  @ApiProperty()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => UpdateAnswerRequestDto)
  answers?: UpdateAnswerRequestDto[];
}
