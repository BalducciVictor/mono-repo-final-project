import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, IsNumber, IsArray } from "class-validator";

export class UpdateUserRequestDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  firstName?: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  lastName?: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  email?: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  password?: string;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  companyId?: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  role?: string;

  @ApiProperty()
  @IsArray()
  @IsNotEmpty()
  currentChapterIds?: Array<string>;

  @ApiProperty()
  @IsArray()
  @IsNotEmpty()
  currentChapterStepId?: Array<string>;

  @ApiProperty()
  @IsArray()
  @IsNotEmpty()
  validatedChapterId?: Array<string>;
}
