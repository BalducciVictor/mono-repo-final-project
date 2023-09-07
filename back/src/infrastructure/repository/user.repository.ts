import { User, UserDocument } from "src/domain/entities/user";
import { IUserRepository } from "src/domain/interfaces/repository/IUserRepository";
import { Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";
import { UpdateUserDto } from "src/application/dto/User/update-user.dto";
import { Injectable } from "@nestjs/common";

@Injectable()
export class UserRepository implements IUserRepository {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async get(id: string): Promise<User | null> {
    return this.userModel.findById(id).exec();
  }

  async getByMail(email: string): Promise<User | null> {
    return this.userModel.findOne({ email: email }).exec();
  }

  async create(user: User): Promise<User> {
    const newUser = new this.userModel(user);
    return newUser.save();
  }

  async delete(id: string): Promise<void> {
    await this.userModel.findByIdAndDelete(id).exec();
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User | null> {
    const updatedUser = await this.userModel
      .findByIdAndUpdate(id, updateUserDto, { new: true })
      .exec();

    return updatedUser ? updatedUser.toObject() : null;
  }
}
