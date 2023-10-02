import { Controller, Post, Body } from "@nestjs/common";
import { AuthService } from "../../domain/services/auth.service";
import { LoginUserRequestDto } from "../dto/User/auth/login-user-request.dto";
import { ApiResponse, ApiTags } from "@nestjs/swagger";
import { LoginUserResponseDto } from "../dto/User/auth/login-user-response.dto";

@Controller("auth")
@ApiTags("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("signin")
  @ApiResponse({
    status: 201,
    description: "User connected.",
    type: LoginUserResponseDto,
  })
  @ApiResponse({ status: 401, description: "Unauthorized." })
  async signIn(
    @Body() credentials: LoginUserRequestDto
  ): Promise<LoginUserResponseDto> {
    return this.authService.signIn(credentials.email, credentials.password);
  }
}
