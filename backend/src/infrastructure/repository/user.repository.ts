import { User, UserDocument } from "src/domain/entities/user/user";
import { IUserRepository } from "src/domain/interfaces/repository/IUserRepository";
import { Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";
import { UpdateUserRequestDto } from "src/application/dto/User/Request/update-user-request.dto";
import { Injectable } from "@nestjs/common";
import { CreateUserRequestDto } from "src/application/dto/User/Request/create-user-request.dto";
import { UserResponseDto } from "src/application/dto/User/Response/user-response.dto";

@Injectable()
export class UserRepository implements IUserRepository {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async get(id: string): Promise<UserResponseDto | null> {
    return this.userModel.findById(id).exec();
  }

  async getByMail(email: string): Promise<UserResponseDto | null> {
    const user = await this.userModel.findOne({ email: email }).exec();
    return user;
  }

  async create(user: CreateUserRequestDto): Promise<UserResponseDto> {
    const newUser = new this.userModel(user);
    return newUser.save();
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
}
