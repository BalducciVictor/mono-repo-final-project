import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, IsBoolean } from "class-validator";
import { UpdateDocumentationRequestDto } from "../../Documentation/Request/update-documentation-request.dto";

export class UpdateChapterRequestDto {
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
  @IsString()
  @IsNotEmpty()
  documents: UpdateDocumentationRequestDto[];
}
