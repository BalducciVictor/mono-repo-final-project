import { IsNotEmpty, IsBoolean } from "class-validator";

export class AnswerResponseDto {
  @IsNotEmpty()
  content: string;

  @IsBoolean()
  isCorrect: boolean;
}
