import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, IsNumber, IsBoolean } from "class-validator";

export class ChapterResponseDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  _id: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  adminMail: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  chapterName: string;

  @ApiProperty()
  @IsBoolean()
  @IsNotEmpty()
  hasQuiz: boolean;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  step?: number;
}