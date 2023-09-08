import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { JwtService } from "@nestjs/jwt";
import { Request } from "express";
import { Roles } from "src/application/decorator/user/roles.decorator";

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private jwtService: JwtService, private reflector: Reflector) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);
    if (!token) {
      throw new UnauthorizedException();
    }
    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: "your-secret-key",
      });
      request["user"] = payload;
    } catch {
      throw new UnauthorizedException();
    }

    const roles = this.reflector.get(Roles, context.getHandler());
    if (!roles) {
      return true;
    }

    const user = request.user;
    console.log(user.role);
    console.log(roles);
    console.log(roles.includes(user.role));
    return roles.includes(user.role);
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(" ") ?? [];
    return type === "Bearer" ? token : undefined;
  }
}
