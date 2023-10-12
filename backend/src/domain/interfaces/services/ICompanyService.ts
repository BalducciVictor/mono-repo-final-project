import { ChapterResponseDto } from "src/application/dto/Chapter/Response/chapter-response.dto";
import { AddCompanyGroupRequestDto } from "src/application/dto/Company/CompanyGroup/Request/add-company-group-request.dto";
import { CreateCompanyRequestDto } from "src/application/dto/Company/Request/create-company-group-request.dto";
import { UpdateCompanyRequestDto } from "src/application/dto/Company/Request/update-company-group-request.dto";
import { CompanyResponseDto } from "src/application/dto/Company/Response/company-response.dto";

export abstract class ICompanyService {
  create: (company: CreateCompanyRequestDto) => Promise<CompanyResponseDto>;
  get: (companyId: string) => Promise<CompanyResponseDto>;
  update: (
    companyId: string,
    updateCompanyDto: UpdateCompanyRequestDto
  ) => Promise<CompanyResponseDto>;
  addCompanyGroup: (
    companyId: string,
    updateCompanyDto: AddCompanyGroupRequestDto
  ) => Promise<CompanyResponseDto>;
  delete: (companyId: string) => Promise<void>;
  getAll: () => Promise<Array<CompanyResponseDto>>;
  getAllChapterByCompanyId: (
    companyId: string
  ) => Promise<Array<ChapterResponseDto>>;
}
