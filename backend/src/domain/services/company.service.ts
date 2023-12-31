import { Injectable, NotFoundException } from "@nestjs/common";
import { ICompanyService } from "../interfaces/services/ICompanyService";
import { CompanyResponseDto } from "../../application/dto/Company/Response/company-response.dto";
import { CreateCompanyRequestDto } from "../../application/dto/Company/Request/create-company-group-request.dto";
import { ICompanyRepository } from "../interfaces/repository/ICompanyRepository";
import { UpdateCompanyRequestDto } from "../../application/dto/Company/Request/update-company-group-request.dto";
import { AddCompanyGroupRequestDto } from "../../application/dto/Company/CompanyGroup/Request/add-company-group-request.dto";
import { ChapterResponseDto } from "src/application/dto/Chapter/Response/chapter-response.dto";
import { IChapterRepository } from "../interfaces/repository/IChapterRepository";

@Injectable()
export class CompanyService implements ICompanyService {
  constructor(
    private readonly companyRepository: ICompanyRepository,
    private readonly chapterRepository: IChapterRepository
  ) {}

  public async create(
    company: CreateCompanyRequestDto
  ): Promise<CompanyResponseDto> {
    return await this.companyRepository.createCompany(company);
  }

  public async get(companyId: string): Promise<CompanyResponseDto> {
    const existingCompany: CompanyResponseDto =
      await this.companyRepository.get(companyId);
    if (!existingCompany) throw new NotFoundException(`Company not found`);

    return await this.companyRepository.get(companyId);
  }

  public async getAll(): Promise<Array<CompanyResponseDto>> {
    const existingCompanies: Array<CompanyResponseDto> =
      await this.companyRepository.getAll();
    if (!existingCompanies) throw new NotFoundException(`Companies not found`);

    return existingCompanies;
  }

  public async update(
    companyId: string,
    updatedCompany: UpdateCompanyRequestDto
  ): Promise<CompanyResponseDto> {
    const existingCompany: CompanyResponseDto =
      await this.companyRepository.get(companyId);
    if (!existingCompany) throw new NotFoundException(`Company not found`);

    return this.companyRepository.update(companyId, updatedCompany);
  }

  public async addCompanyGroup(
    companyId: string,
    updatedCompany: AddCompanyGroupRequestDto
  ): Promise<CompanyResponseDto> {
    const existingCompany: CompanyResponseDto =
      await this.companyRepository.get(companyId);
    if (!existingCompany) throw new NotFoundException(`Company not found`);

    return this.companyRepository.addGroupToCompany(companyId, updatedCompany);
  }

  public async delete(companyId: string): Promise<void> {
    const existingCompany: CompanyResponseDto =
      await this.companyRepository.get(companyId);
    if (!existingCompany) throw new NotFoundException(`Company not found`);

    await this.companyRepository.delete(companyId);
  }

  public async getAllChapterByCompanyId(
    companyId: string
  ): Promise<Array<ChapterResponseDto>> {
    return await this.chapterRepository.getAllByCompanyId(companyId);
  }
}
