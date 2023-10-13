import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsArray } from "class-validator";
import { Types } from "mongoose";

export class UpdateUserRequestDto {
  @ApiProperty()
  firstName?: string;

  @ApiProperty()
  lastName?: string;

  @ApiProperty()
  email?: string;

  @ApiProperty()
  password?: string;

  @ApiProperty()
  companyId?: Types.ObjectId;

  @ApiProperty()
  role?: string;

  @ApiProperty()
  currentChapterIds?: Array<string>;

  @ApiProperty()
  currentChapterStepId?: Array<string>;

  @ApiProperty()
  validatedChapterId?: Array<string>;

  @ApiProperty()
  createdAt: Date;
}
