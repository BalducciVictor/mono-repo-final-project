import { Injectable, UnauthorizedException } from "@nestjs/common";
import { IUserService } from "../interfaces/services/IUserService";
import * as jwt from "jsonwebtoken";
import { User } from "../entities/user";
import { LoginUserResponseDto } from "src/application/dto/User/auth/login-user-response.dto";
import * as bcrypt from "bcrypt";

@Injectable()
export class AuthService {
  constructor(private usersService: IUserService) {}

  async signIn(email: string, pass: string): Promise<LoginUserResponseDto> {
    const user: User = await this.usersService.getByMail(email);
    const isPasswordValid = await bcrypt.compare(pass, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException();
    }

    const payload = {
      username: user.email,
      sub: user.lastName,
      role: user.role,
    };
    const accessToken = jwt.sign(payload, process.env.SECRET_KEY, {
      expiresIn: "1h",
    });

    const { ...result } = user;

    return {
      ...result,
      accessToken,
    };
  }
}