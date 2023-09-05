import { IsNotEmpty, IsString, IsNumber, IsBoolean } from "class-validator";

export class UpdateChapterDto {
  @IsString()
  @IsNotEmpty()
  chapterName: string;

  @IsBoolean()
  @IsNotEmpty()
  hasQuiz: boolean;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsNumber()
  @IsNotEmpty()
  step?: number;
}
