import { CreateCompanyRequestDto } from "src/application/dto/Company/Request/create-company-group-request.dto";
import { UpdateCompanyRequestDto } from "src/application/dto/Company/Request/update-company-group-request.dto";
import { CompanyResponseDto } from "src/application/dto/Company/Response/company-response.dto";

export abstract class ICompanyRepository {
  createCompany: (
    company: CreateCompanyRequestDto
  ) => Promise<CompanyResponseDto>;
  get: (id: string) => Promise<CompanyResponseDto>;
  delete: (id: string) => Promise<void>;
  update: (
    id: string,
    updateChapterDto: UpdateCompanyRequestDto
  ) => Promise<CompanyResponseDto | null>;
  getAll: () => Promise<Array<CompanyResponseDto> | null>;
}
