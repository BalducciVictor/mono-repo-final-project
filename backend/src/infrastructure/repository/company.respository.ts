import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, Types } from "mongoose";
import { CreateCompanyRequestDto } from "../../application/dto/Company/Request/create-company-group-request.dto";
import { UpdateCompanyRequestDto } from "../../application/dto/Company/Request/update-company-group-request.dto";
import { CompanyResponseDto } from "../../application/dto/Company/Response/company-response.dto";
import { Company } from "../../domain/entities/company/company";
import { ICompanyRepository } from "../../domain/interfaces/repository/ICompanyRepository";
import { GetUserCompanyGroupResponseDto } from "../../application/dto/Documentation/Response/get-user-company-group-response.dto";
import { AddCompanyGroupRequestDto } from "../../application/dto/Company/CompanyGroup/Request/add-company-group-request.dto";

@Injectable()
export class CompanyRepository implements ICompanyRepository {
  constructor(
    @InjectModel(Company.name) private companyModel: Model<Company>
  ) {}

  async get(id: string): Promise<CompanyResponseDto | null> {
    return this.companyModel.findById(id).exec();
  }

  async getUserGroup(
    companyId: Types.ObjectId,
    userId: string
  ): Promise<GetUserCompanyGroupResponseDto | null> {
    const company = await this.companyModel.findById(companyId).exec();
    if (!company) {
      throw new NotFoundException(`Company with ID ${companyId} not found.`);
    }

    const objectId: Types.ObjectId = new Types.ObjectId(userId);
    const group = company.companyGroup.find((g) => g.user.includes(objectId));

    if (!group) {
      throw new NotFoundException(
        `Group Company with userID ${objectId} not found.`
      );
    }

    return {
      name: company.name,
      companyGroup: group,
    };
  }

  async getAll(): Promise<Array<CompanyResponseDto> | null> {
    return this.companyModel.find().exec();
  }

  async createCompany(
    company: CreateCompanyRequestDto
  ): Promise<CompanyResponseDto> {
    const newCompany = new this.companyModel(company);
    return newCompany.save();
  }

  async addGroupToCompany(
    companyId: string,
    groupDto: AddCompanyGroupRequestDto
  ): Promise<CompanyResponseDto> {
    const company = await this.companyModel.findById(companyId).exec();

    if (!company) {
      throw new NotFoundException(`Company with ID ${companyId} not found.`);
    }
    company.companyGroup.push(groupDto);
    await company.save();

    return company;
  }

  async delete(id: string): Promise<void> {
    await this.companyModel.findByIdAndDelete(id).exec();
  }

  async update(
    id: string,
    updateCompanyDto: UpdateCompanyRequestDto
  ): Promise<CompanyResponseDto | null> {
    const updatedChapter = await this.companyModel
      .findByIdAndUpdate(id, updateCompanyDto, { new: true })
      .exec();

    return updatedChapter ? updatedChapter.toObject() : null;
  }
}
