import { Injectable, UnauthorizedException } from "@nestjs/common";
import { IUserService } from "../interfaces/services/IUserService";
import * as jwt from "jsonwebtoken";
import { User } from "../entities/user/user";
import { LoginUserResponseDto } from "../../application/dto/User/auth/login-user-response.dto";
import * as bcrypt from "bcryptjs";
import { IAuthService } from "../interfaces/services/IAuthService";

@Injectable()
export class AuthService implements IAuthService {
  constructor(private usersService: IUserService) {}

  async signIn(email: string, pass: string): Promise<LoginUserResponseDto> {
    const user: User = await this.usersService.getByMail(email);
    const isPasswordValid = await bcrypt.compare(pass, user.password);
    if (!isPasswordValid) throw new UnauthorizedException();

    const payload = {
      username: user.email,
      sub: user.lastName,
      role: user.role,
    };
    const accessToken = jwt.sign(payload, process.env.SECRET_KEY, {
      expiresIn: "1h",
    });

    return {
      user,
      accessToken,
    };
  }
}
