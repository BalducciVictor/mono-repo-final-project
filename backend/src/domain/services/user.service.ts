import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { CreateUserRequestDto } from "../../application/dto/User/Request/create-user-request.dto";
import { IUserService } from "../interfaces/services/IUserService";
import { IUserRepository } from "../interfaces/repository/IUserRepository";
import { UpdateUserRequestDto } from "../../application/dto/User/Request/update-user-request.dto";
import * as bcrypt from "bcryptjs";
import { UserResponseDto } from "../../application/dto/User/Response/user-response.dto";
import { ICompanyRepository } from "../interfaces/repository/ICompanyRepository";
import { GetUserCompanyGroupResponseDto } from "../../application/dto/Documentation/Response/get-user-company-group-response.dto";
import { IChapterRepository } from "../interfaces/repository/IChapterRepository";
import { ChapterResponseDto } from "src/application/dto/Chapter/Response/chapter-response.dto";

@Injectable()
export class UserService implements IUserService {
  constructor(
    private readonly userRepository: IUserRepository,
    private readonly companyRepository: ICompanyRepository,
    private readonly chapterRepository: IChapterRepository
  ) {}

  public async create(
    createUserDto: CreateUserRequestDto
  ): Promise<UserResponseDto> {
    if ((await this.userRepository.getByMail(createUserDto.email)) != null)
      throw new ConflictException(`This user already exist`);

    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (!emailRegex.test(createUserDto.email)) {
      throw new BadRequestException("Invalid email format");
    }

    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/;
    if (!passwordRegex.test(createUserDto.password)) {
      throw new BadRequestException(
        "Password should be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, one number, and one special character"
      );
    }

    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
    const newUser: CreateUserRequestDto = {
      ...createUserDto,
      password: hashedPassword,
    };

    return await this.userRepository.create(newUser);
  }

  public async get(userId: string): Promise<UserResponseDto> {
    const existingUser: UserResponseDto = await this.userRepository.get(userId);
    if (!existingUser) {
      throw new NotFoundException(`User not found`);
    }

    return await this.userRepository.get(userId);
  }

  public async getAllByUserId(
    userId: string
  ): Promise<Array<ChapterResponseDto>> {
    const existingUser: UserResponseDto = await this.userRepository.get(userId);
    if (!existingUser) {
      throw new NotFoundException(`User not found`);
    }
    console.log(existingUser.companyId.toString());
    return await this.chapterRepository.getAllByCompanyId(
      existingUser.companyId.toString()
    );
  }

  public async getUsersByCompanyId(
    companyId: string
  ): Promise<Array<UserResponseDto>> {
    const existingUsers: Array<UserResponseDto> =
      await this.userRepository.getUsersByCompanyId(companyId);

    if (!existingUsers) {
      throw new NotFoundException(`User not found`);
    }

    return existingUsers;
  }

  public async getUserGroup(
    userId: string
  ): Promise<GetUserCompanyGroupResponseDto> {
    const existingUser: UserResponseDto = await this.userRepository.get(userId);
    if (!existingUser) {
      throw new NotFoundException(`User not found`);
    }

    const companyGroup: GetUserCompanyGroupResponseDto | null =
      await this.companyRepository.getUserGroup(existingUser.companyId, userId);

    if (!companyGroup) {
      throw new NotFoundException(`Group not found`);
    }

    return companyGroup;
  }

  public async getByMail(userMail: string): Promise<UserResponseDto> {
    const existingUser: UserResponseDto = await this.userRepository.getByMail(
      userMail
    );
    if (!existingUser) {
      throw new NotFoundException(`User not found`);
    }

    return existingUser;
  }

  public async update(
    userId: string,
    updateUserDto: UpdateUserRequestDto
  ): Promise<UserResponseDto> {
    const existingUser: UserResponseDto = await this.userRepository.get(userId);
    if (!existingUser) {
      throw new NotFoundException(`User not found`);
    }

    return await this.userRepository.update(userId, updateUserDto);
  }

  public async delete(userId: string): Promise<void> {
    const existingUser: UserResponseDto = await this.userRepository.get(userId);
    if (!existingUser) {
      throw new NotFoundException(`User not found`);
    }

    await this.userRepository.delete(userId);
  }
}
