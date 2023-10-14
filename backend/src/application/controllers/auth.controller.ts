import { Controller, Post, Body, Param } from "@nestjs/common";
import { LoginUserRequestDto } from "../dto/User/auth/login-user-request.dto";
import { ApiParam, ApiResponse, ApiTags } from "@nestjs/swagger";
import { LoginUserResponseDto } from "../dto/User/auth/login-user-response.dto";
import { AuthUseCase } from "../useCases/auth/auth.use-case";
import { CreateRefreshTokenRequestDto } from "../dto/User/auth/create-refresh-token-response.dto";

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

  @Post("refresh/:refreshToken")
  @ApiResponse({
    status: 201,
    description: "RefreshToken generated.",
    type: LoginUserResponseDto,
  })
  @ApiParam({ name: "refreshToken", description: "RefreshToken" })
  async refreshToken(
    @Param("refreshToken") refreshToken: string
  ): Promise<CreateRefreshTokenRequestDto> {
    return this.authUseCase.refreshToken(refreshToken);
  }
}
