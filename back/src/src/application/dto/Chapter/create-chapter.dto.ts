import { IsNotEmpty, IsString, IsNumber, IsBoolean } from "class-validator";

export class CreateChapterDto {
  @IsString()
  @IsNotEmpty()
  chapterName: string;

  @IsBoolean()
  @IsNotEmpty()
  hasQuiz: boolean;

  @IsString()
  @IsNotEmpty()
  description: string;
}
