import { CreateRefreshTokenRequestDto } from "src/application/dto/User/auth/create-refresh-token-response.dto";
import { LoginUserResponseDto } from "src/application/dto/User/auth/login-user-response.dto";

export abstract class IAuthService {
  signIn: (email: string, password: string) => Promise<LoginUserResponseDto>;
  refreshAccessToken: (
    refreshToken: string
  ) => Promise<CreateRefreshTokenRequestDto>;
}
