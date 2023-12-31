import { User, UserDocument } from "../../domain/entities/user/user";
import { IUserRepository } from "../../domain/interfaces/repository/IUserRepository";
import { Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";
import { UpdateUserRequestDto } from "../../application/dto/User/Request/update-user-request.dto";
import { Injectable } from "@nestjs/common";
import { CreateUserRequestDto } from "../../application/dto/User/Request/create-user-request.dto";
import { UserResponseDto } from "../../application/dto/User/Response/user-response.dto";

@Injectable()
export class UserRepository implements IUserRepository {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async get(id: string): Promise<UserResponseDto | null> {
    const user = await this.userModel.findById(id).exec();
    return user ? user.toObject() : null;
  }

  async getUsersByCompanyId(
    companyId: string
  ): Promise<Array<UserResponseDto> | null> {
    const users = await this.userModel.find({ companyId: companyId }).exec();
    return users.map((user) => user.toObject());
  }

  async getByMail(email: string): Promise<UserResponseDto | null> {
    const user = await this.userModel.findOne({ email: email }).exec();
    return user ? user.toObject() : null;
  }

  async create(user: CreateUserRequestDto): Promise<UserResponseDto> {
    const newUser = new this.userModel(user);
    const savedUser = await newUser.save();
    return savedUser.toObject();
  }

  async delete(id: string): Promise<void> {
    await this.userModel.findByIdAndDelete(id).exec();
  }

  async update(
    userId: string,
    updateUserDto: UpdateUserRequestDto
  ): Promise<UserResponseDto | null> {
    const updatedUser = await this.userModel
      .findByIdAndUpdate(userId, updateUserDto, { new: true })
      .exec();

    return updatedUser ? updatedUser.toObject() : null;
  }

  async findUserByRefreshToken(token: string): Promise<UserResponseDto | null> {
    return this.userModel.findOne({
      refreshToken: token,
      refreshTokenExpiresAt: { $gt: new Date() },
    });
  }
}
