import { IsNotEmpty, IsString, IsNumber } from "class-validator";

export class CreateDocumentationDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  content: string;

  @IsNumber()
  @IsNotEmpty()
  step: number;

  @IsNumber()
  @IsNotEmpty()
  chapterId: number;
}
