import { Injectable } from "@nestjs/common";
import { CreateCompanyRequestDto } from "../../../application/dto/Company/Request/create-company-group-request.dto";
import { UpdateCompanyRequestDto } from "../../../application/dto/Company/Request/update-company-group-request.dto";
import { CompanyResponseDto } from "../../../application/dto/Company/Response/company-response.dto";
import { ICompanyService } from "../../../domain/interfaces/services/ICompanyService";
import { AddCompanyGroupRequestDto } from "../../../application/dto/Company/CompanyGroup/Request/add-company-group-request.dto";
import { ChapterResponseDto } from "src/application/dto/Chapter/Response/chapter-response.dto";

@Injectable()
export class CompanyUseCase {
  constructor(private companyService: ICompanyService) {}

  async createCompany(
    company: CreateCompanyRequestDto
  ): Promise<CompanyResponseDto> {
    return await this.companyService.create(company);
  }

  async getCompany(companyId: string): Promise<CompanyResponseDto> {
    return await this.companyService.get(companyId);
  }

  async getAllCompanies(): Promise<Array<CompanyResponseDto>> {
    return await this.companyService.getAll();
  }

  async deleteCompany(company: string): Promise<void> {
    return await this.companyService.delete(company);
  }

  async updateCompany(
    companyId: string,
    company: UpdateCompanyRequestDto
  ): Promise<CompanyResponseDto> {
    return await this.companyService.update(companyId, company);
  }

  async addCompanyGroup(
    companyId: string,
    company: AddCompanyGroupRequestDto
  ): Promise<CompanyResponseDto> {
    return await this.companyService.addCompanyGroup(companyId, company);
  }

  async getAllChapterByCompanyId(
    companyId: string
  ): Promise<Array<ChapterResponseDto>> {
    return await this.companyService.getAllChapterByCompanyId(companyId);
  }
}
