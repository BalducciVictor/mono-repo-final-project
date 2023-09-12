import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { CreateCompanyRequestDto } from "src/application/dto/Company/Request/create-company-group-request.dto";
import { UpdateCompanyRequestDto } from "src/application/dto/Company/Request/update-company-group-request.dto";
import { CompanyResponseDto } from "src/application/dto/Company/Response/company-response.dto";
import { Company } from "src/domain/entities/company/company";
import { ICompanyRepository } from "src/domain/interfaces/repository/ICompanyRepository";

@Injectable()
export class CompanyRepository implements ICompanyRepository {
  constructor(
    @InjectModel(Company.name) private companyModel: Model<Company>
  ) {}

  async get(id: string): Promise<CompanyResponseDto | null> {
    return this.companyModel.findById(id).exec();
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
