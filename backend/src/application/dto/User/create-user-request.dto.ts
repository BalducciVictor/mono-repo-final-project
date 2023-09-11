import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, IsNumber } from "class-validator";

export class CreateUserDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  adminMail: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  lastName: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  email: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  password: string;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  companyId: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  role: string;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  currentChapterId: number;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  currentChapterStepId: number;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  validatedChapterId: number[];
}
