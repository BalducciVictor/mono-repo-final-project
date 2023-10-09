import { IsNotEmpty, IsBoolean } from "class-validator";

export class CreateAnswerRequestDto {
  @IsNotEmpty()
  content: string;

  @IsBoolean()
  isCorrect: boolean;
}
