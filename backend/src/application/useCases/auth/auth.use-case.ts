import { Injectable } from "@nestjs/common";
import { LoginUserRequestDto } from "../../../application/dto/User/auth/login-user-request.dto";
import { LoginUserResponseDto } from "../../../application/dto/User/auth/login-user-response.dto";
import { IAuthService } from "../../../domain/interfaces/services/IAuthService";
import { CreateRefreshTokenRequestDto } from "../../../application/dto/User/auth/create-refresh-token-response.dto";

@Injectable()
export class AuthUseCase {
  constructor(private readonly authService: IAuthService) {}

  async signIn(
    credentials: LoginUserRequestDto
  ): Promise<LoginUserResponseDto> {
    return await this.authService.signIn(
      credentials.email,
      credentials.password
    );
  }

  async refreshToken(
    refreshToken: string
  ): Promise<CreateRefreshTokenRequestDto> {
    return await this.authService.refreshAccessToken(refreshToken);
  }
}
