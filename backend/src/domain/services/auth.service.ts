import { Injectable, UnauthorizedException } from "@nestjs/common";
import { IUserService } from "../interfaces/services/IUserService";
import * as jwt from "jsonwebtoken";
import { LoginUserResponseDto } from "../../application/dto/User/auth/login-user-response.dto";
import * as bcrypt from "bcryptjs";
import { IAuthService } from "../interfaces/services/IAuthService";
import { UserResponseDto } from "src/application/dto/User/Response/user-response.dto";
import { IUserRepository } from "../interfaces/repository/IUserRepository";
import { UpdateUserRequestDto } from "src/application/dto/User/Request/update-user-request.dto";
import { CreateRefreshTokenRequestDto } from "src/application/dto/User/auth/create-refresh-token-response.dto";

@Injectable()
export class AuthService implements IAuthService {
  constructor(
    private usersService: IUserService,
    private readonly userRepository: IUserRepository
  ) {}

  async signIn(email: string, pass: string): Promise<LoginUserResponseDto> {
    const user: UserResponseDto = await this.usersService.getByMail(email);
    const isPasswordValid = await bcrypt.compare(pass, user.password);
    if (!isPasswordValid) throw new UnauthorizedException();

    const payload = {
      username: user.email,
      userId: user._id,
      sub: user.lastName,
      role: user.role,
    };
    const accessToken = jwt.sign(payload, process.env.SECRET_KEY, {
      expiresIn: "1h",
    });
    user.refreshToken = await this.generateRefreshToken(user._id);
    console.log(user.refreshToken);
    return {
      user: user,
      accessToken,
    };
  }

  private async generateRefreshToken(userId: string): Promise<string> {
    const token = jwt.sign({}, process.env.SECRET_KEY, { expiresIn: "7d" });
    const user = new UpdateUserRequestDto();
    user.refreshToken = token;
    user.refreshTokenExpiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
    await this.usersService.update(userId, user);
    return token;
  }

  private async findUserByRefreshToken(
    token: string
  ): Promise<UserResponseDto> {
    return this.userRepository.findUserByRefreshToken(token);
  }

  async refreshAccessToken(
    refreshToken: string
  ): Promise<CreateRefreshTokenRequestDto> {
    const user = await this.findUserByRefreshToken(refreshToken);
    if (!user) throw new UnauthorizedException("Invalid refresh token");
    const payload = { email: user.email, sub: user.lastName, role: user.role };
    return {
      tokenRefreshed: jwt.sign(payload, process.env.SECRET_KEY, {
        expiresIn: "1h",
      }),
    };
  }
}
