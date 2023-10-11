import { Injectable } from "@nestjs/common";
import { LoginUserRequestDto } from "../../../application/dto/User/auth/login-user-request.dto";
import { LoginUserResponseDto } from "../../../application/dto/User/auth/login-user-response.dto";
import { AuthService } from "../../../domain/services/auth.service";

@Injectable()
export class AuthUseCase {
  constructor(private readonly authService: AuthService) {}

  async signIn(
    credentials: LoginUserRequestDto
  ): Promise<LoginUserResponseDto> {
    return await this.authService.signIn(
      credentials.email,
      credentials.password
    );
  }
}
