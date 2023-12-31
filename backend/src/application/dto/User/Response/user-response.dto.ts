import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsNotEmpty, IsString, IsArray, IsDate } from "class-validator";
import { Types } from "mongoose";

export class UserResponseDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  _id: string;

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
  password?: string;

  @ApiProperty()
  @IsNotEmpty()
  @Type(() => Types.ObjectId)
  companyId: Types.ObjectId;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  role: string;

  @ApiProperty()
  @IsArray()
  @IsNotEmpty()
  currentChapterIds: Array<string>;

  @ApiProperty()
  @IsArray()
  @IsNotEmpty()
  currentChapterStepId: Array<string>;

  @ApiProperty()
  @IsArray()
  @IsNotEmpty()
  validatedChapterId: Array<string>;

  @ApiProperty()
  @IsDate()
  createdAt: Date;

  @ApiProperty()
  @IsString()
  refreshToken: string;

  @ApiProperty()
  @IsString()
  refreshTokenExpiresAt: Date;
}
