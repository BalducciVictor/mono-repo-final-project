import {
  Controller,
  Post,
  Body,
  HttpException,
  HttpStatus,
  Get,
  Param,
  Delete,
  Put,
  UseGuards,
} from "@nestjs/common";
import { User } from "src/domain/entities/user";
import { CreateUserDto } from "../dto/User/create-user-request.dto";
import { UpdateUserDto } from "../dto/User/update-user-request.dto";
import { ApiOperation, ApiResponse, ApiTags, ApiParam } from "@nestjs/swagger";
import { UserUseCase } from "../useCases/user/user.use-case";
import { JwtAuthGuard } from "src/infrastructure/config/modules/auth/guards/jwt-auth.gard";
import { Roles } from "../decorator/user/roles.decorator";

@ApiTags("users")
@Controller("users")
export default class UserController {
  constructor(private readonly userUseCase: UserUseCase) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @Roles(["ADMIN"])
  @ApiOperation({
    summary: "Create User",
  })
  @ApiResponse({ status: 201, description: "User created.", type: User })
  @ApiResponse({ status: 403, description: "Forbidden." })
  async create(@Body() user: CreateUserDto): Promise<User> {
    try {
      return await this.userUseCase.createUser(user, user.adminMail);
    } catch (error) {
      throw new HttpException(
        "Une erreur est survenue",
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  @Get(":userId")
  @ApiOperation({
    summary: "Get User",
  })
  @ApiResponse({ status: 200, description: "The found user.", type: User })
  @ApiParam({ name: "userId", description: "User ID" })
  async get(@Param("userId") userId: string): Promise<User> {
    try {
      return await this.userUseCase.getUser(userId);
    } catch (error) {
      throw new HttpException(
        "Une erreur est survenue",
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  @Delete(":userId/:adminMail")
  @UseGuards(JwtAuthGuard)
  @Roles(["ADMIN"])
  @ApiOperation({
    summary: "Delete User",
  })
  @ApiResponse({ status: 204, description: "User deleted." })
  @ApiParam({ name: "userId", description: "User ID" })
  @ApiParam({ name: "adminMail", description: "Admin Mail" })
  async delete(
    @Param("userId") userId: string,
    @Param("adminMail") adminMail: string
  ): Promise<void> {
    try {
      await this.userUseCase.deleteUser(userId, adminMail);
    } catch (error) {
      throw new HttpException(
        "Une erreur est survenue",
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  @Put(":userId")
  @UseGuards(JwtAuthGuard)
  @Roles(["ADMIN"])
  @ApiOperation({
    summary: "Update User",
  })
  @ApiResponse({ status: 200, description: "The updated user.", type: User })
  @ApiParam({ name: "userId", description: "User ID" })
  async update(
    @Param("userId") userId: string,
    @Body() user: UpdateUserDto
  ): Promise<User> {
    try {
      return await this.userUseCase.updateUser(userId, user, user.adminMail);
    } catch (error) {
      throw new HttpException(
        "Une erreur est survenue",
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }
}
