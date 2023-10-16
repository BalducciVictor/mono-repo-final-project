import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class CreateRefreshTokenRequestDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  tokenRefreshed: string;
}
