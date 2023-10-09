import { LoginUserResponseDto } from "src/application/dto/User/auth/login-user-response.dto";

export abstract class IAuthService {
  signIn: (email: string, password: string) => Promise<LoginUserResponseDto>;
}
