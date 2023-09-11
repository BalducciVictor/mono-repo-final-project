import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, IsNumber } from "class-validator";

export class UpdateDocumentationRequestDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  title?: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  content?: string;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  step?: number;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  chapterId?: number;
}
