import { Types } from "mongoose";
import { CreateCompanyRequestDto } from "../../../application/dto/Company/Request/create-company-group-request.dto";
import { UpdateCompanyRequestDto } from "../../../application/dto/Company/Request/update-company-group-request.dto";
import { CompanyResponseDto } from "../../../application/dto/Company/Response/company-response.dto";
import { GetUserCompanyGroupResponseDto } from "src/application/dto/Documentation/Response/get-user-company-group-response.dto";
import { AddCompanyGroupRequestDto } from "src/application/dto/Company/CompanyGroup/Request/add-company-group-request.dto";

export abstract class ICompanyRepository {
  createCompany: (
    company: CreateCompanyRequestDto
  ) => Promise<CompanyResponseDto>;
  get: (id: string) => Promise<CompanyResponseDto>;
  getUserGroup: (
    companyId: Types.ObjectId,
    userId: string
  ) => Promise<GetUserCompanyGroupResponseDto | null>;
  delete: (id: string) => Promise<void>;
  update: (
    id: string,
    updateChapterDto: UpdateCompanyRequestDto
  ) => Promise<CompanyResponseDto | null>;
  getAll: () => Promise<Array<CompanyResponseDto> | null>;
  addGroupToCompany: (
    companyId: string,
    groupDto: AddCompanyGroupRequestDto
  ) => Promise<CompanyResponseDto>;
}
