import { Controller, Post, Body } from "@nestjs/common";
import { LoginUserRequestDto } from "../dto/User/auth/login-user-request.dto";
import { ApiResponse, ApiTags } from "@nestjs/swagger";
import { LoginUserResponseDto } from "../dto/User/auth/login-user-response.dto";
import { AuthUseCase } from "../useCases/auth/auth.use-case";

@Controller("auth")
@ApiTags("auth")
export class AuthController {
  constructor(private readonly authUseCase: AuthUseCase) {}

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
    return this.authUseCase.signIn(credentials);
  }
}
