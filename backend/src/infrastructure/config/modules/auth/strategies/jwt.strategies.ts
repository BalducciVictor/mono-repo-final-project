import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy, ExtractJwt } from "passport-jwt";
import { ConfigService } from "@nestjs/config";
import { IUserService } from "src/domain/interfaces/services/IUserService";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly configService: ConfigService,
    private readonly userService: IUserService
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: "your-secret-key",
    });
  }

  async validate(payload: any) {
    const user = await this.userService.get(payload.sub);
    if (!user) throw new UnauthorizedException("Utilisateur non trouvé");
    return user;
  }
}
