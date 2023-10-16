import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Delete,
  Put,
  UseGuards,
  Query,
} from "@nestjs/common";
import { User } from "../../domain/entities/user/user";
import { CreateUserRequestDto } from "../dto/User/Request/create-user-request.dto";
import { UpdateUserRequestDto } from "../dto/User/Request/update-user-request.dto";
import {
  ApiOperation,
  ApiResponse,
  ApiTags,
  ApiParam,
  ApiBearerAuth,
} from "@nestjs/swagger";
import { UserUseCase } from "../useCases/user/user.use-case";
import { JwtAuthGuard } from "../../infrastructure/config/modules/auth/guards/jwt-auth.gard";
import { Roles } from "../decorator/user/roles.decorator";
import { UserResponseDto } from "../dto/User/Response/user-response.dto";
import { UserType } from "../../domain/enum/userType";
import { GetUserCompanyGroupResponseDto } from "../dto/Documentation/Response/get-user-company-group-response.dto";
import { ChapterResponseDto } from "../dto/Chapter/Response/chapter-response.dto";

@ApiBearerAuth()
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

  @UseGuards(JwtAuthGuard)
  @Get(":userId/chapters")
  @Roles([UserType.ADMIN, UserType.SUPERADMIN, UserType.USER])
  @ApiOperation({
    summary: "Get all chapters for a specific user",
  })
  @ApiResponse({ status: 200, description: "List of chapters for the user." })
  @ApiResponse({ status: 404, description: "User not found." })
  @ApiResponse({ status: 403, description: "Forbidden." })
  @ApiParam({ name: "userId", description: "User ID" })
  async getAllChapters(
    @Param("userId") userId: string
  ): Promise<Array<ChapterResponseDto>> {
    return await this.userUseCase.getAllChaptersByUserId(userId);
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

  @Get()
  @UseGuards(JwtAuthGuard)
  @Roles([UserType.ADMIN, UserType.SUPERADMIN, UserType.USER])
  @ApiOperation({
    summary: "Get Users by company id",
  })
  @ApiResponse({ status: 200, description: "The found users.", type: User })
  @ApiParam({ name: "companyId", description: "Company ID" })
  async getUsersByCompany(
    @Query("companyId") companyId: string
  ): Promise<Array<UserResponseDto>> {
    return await this.userUseCase.getUsersByCompany(companyId);
  }

  @Get("company/:userId")
  @ApiOperation({
    summary: "Get User group",
  })
  @ApiResponse({ status: 200, description: "The found users.", type: User })
  @ApiParam({ name: "userId", description: "User ID" })
  async getGroupUser(
    @Param("userId") userId: string
  ): Promise<GetUserCompanyGroupResponseDto> {
    return await this.userUseCase.getUserGroup(userId);
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
