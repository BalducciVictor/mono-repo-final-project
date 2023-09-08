import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";
import { User } from "src/domain/entities/user";

export class LoginUserResponseDto extends User {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  accessToken: string;
}