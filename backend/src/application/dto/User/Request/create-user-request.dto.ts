import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, IsArray } from "class-validator";
import { Types } from "mongoose";

export class CreateUserRequestDto {
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
  @IsNotEmpty()
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
  createdAt: Date;
}
