import { IsNotEmpty, IsBoolean } from "class-validator";

export class UpdateAnswerRequestDto {
  @IsNotEmpty()
  content?: string;

  @IsBoolean()
  isCorrect?: boolean;
}
