import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, IsBoolean } from "class-validator";
import { CreateDocumentationRequestDto } from "../../Documentation/Request/create-documentation-request.dto";

export class CreateChapterRequestDto {
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
  documents: CreateDocumentationRequestDto[];
}
