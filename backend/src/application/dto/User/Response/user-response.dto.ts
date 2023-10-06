import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsNotEmpty, IsString, IsNumber } from "class-validator";
import { Types } from "mongoose";

export class UserResponseDto {
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
  @Type(() => Types.ObjectId)
  companyId: Types.ObjectId;

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
