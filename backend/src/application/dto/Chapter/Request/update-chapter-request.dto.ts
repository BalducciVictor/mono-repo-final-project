import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, IsBoolean, IsNumber } from "class-validator";
import { UpdateDocumentationRequestDto } from "../../Documentation/Request/update-documentation-request.dto";

export class UpdateChapterRequestDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  chapterName?: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  category?: string;

  @ApiProperty()
  @IsBoolean()
  @IsNotEmpty()
  hasQuiz?: boolean;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  description?: string;

  @ApiProperty()
  @IsString()
  companyId?: string;

  @ApiProperty()
  @IsNumber()
  timeToRead?: number;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  documentation?: UpdateDocumentationRequestDto[];
}
