import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Delete,
  Put,
  UseGuards,
} from "@nestjs/common";
import { User } from "src/domain/entities/user/user";
import { CreateUserRequestDto } from "../dto/User/Request/create-user-request.dto";
import { UpdateUserRequestDto } from "../dto/User/Request/update-user-request.dto";
import { ApiOperation, ApiResponse, ApiTags, ApiParam } from "@nestjs/swagger";
import { UserUseCase } from "../useCases/user/user.use-case";
import { JwtAuthGuard } from "src/infrastructure/config/modules/auth/guards/jwt-auth.gard";
import { Roles } from "../decorator/user/roles.decorator";
import { UserResponseDto } from "../dto/User/Response/user-response.dto";
import { UserType } from "src/domain/enum/userType";

@ApiTags("users")
@Controller("users")
export default class UserController {
  constructor(private readonly userUseCase: UserUseCase) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @Roles([UserType.ADMIN, UserType.SUPERADMIN])
  @ApiOperation({
    summary: "Create User",
  })
  @ApiResponse({ status: 201, description: "User created.", type: User })
  @ApiResponse({ status: 403, description: "Forbidden." })
  async create(@Body() user: CreateUserRequestDto): Promise<UserResponseDto> {
    return await this.userUseCase.createUser(user);
  }

  @Get(":userId")
  @UseGuards(JwtAuthGuard)
  @Roles([UserType.ADMIN, UserType.SUPERADMIN, UserType.USER])
  @ApiOperation({
    summary: "Get User",
  })
  @ApiResponse({ status: 200, description: "The found user.", type: User })
  @ApiParam({ name: "userId", description: "User ID" })
  async get(@Param("userId") userId: string): Promise<UserResponseDto> {
    return await this.userUseCase.getUser(userId);
  }

  @Delete(":userId")
  @UseGuards(JwtAuthGuard)
  @Roles([UserType.ADMIN, UserType.SUPERADMIN])
  @ApiOperation({
    summary: "Delete User",
  })
  @ApiResponse({ status: 204, description: "User deleted." })
  @ApiParam({ name: "userId", description: "User ID" })
  async delete(@Param("userId") userId: string): Promise<void> {
    await this.userUseCase.deleteUser(userId);
  }

  @Put(":userId")
  @UseGuards(JwtAuthGuard)
  @Roles([UserType.ADMIN, UserType.SUPERADMIN, UserType.USER])
  @ApiOperation({
    summary: "Update User",
  })
  @ApiResponse({ status: 200, description: "The updated user.", type: User })
  @ApiParam({ name: "userId", description: "User ID" })
  async update(
    @Param("userId") userId: string,
    @Body() user: UpdateUserRequestDto
  ): Promise<UserResponseDto> {
    return await this.userUseCase.updateUser(userId, user);
  }
}
