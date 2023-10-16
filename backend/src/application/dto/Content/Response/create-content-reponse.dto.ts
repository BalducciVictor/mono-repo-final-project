import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class CreateContentResponseDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  url: string;
}
