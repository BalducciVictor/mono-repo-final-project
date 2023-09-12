import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Delete,
  Put,
  UseGuards,
} from "@nestjs/common";
import { CreateChapterRequestDto } from "../dto/Chapter/Request/create-chapter-request.dto";
import { UpdateChapterRequestDto } from "../dto/Chapter/Request/update-chapter-request.dto";
import {
  ApiOperation,
  ApiResponse,
  ApiTags,
  ApiParam,
  ApiBearerAuth,
} from "@nestjs/swagger";
import { JwtAuthGuard } from "src/infrastructure/config/modules/auth/guards/jwt-auth.gard";
import { Roles } from "../decorator/user/roles.decorator";
import { UserType } from "src/domain/enum/userType";
import { CreateCompanyRequestDto } from "../dto/Company/Request/create-company-group-request.dto";
import { CompanyResponseDto } from "../dto/Company/Response/company-response.dto";
import { CompanyUseCase } from "../useCases/company/company.use-case";
import { UpdateCompanyRequestDto } from "../dto/Company/Request/update-company-group-request.dto";

@ApiBearerAuth()
@ApiTags("company")
@Controller("company")
export default class CompanyController {
  constructor(private readonly companyUseCase: CompanyUseCase) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @Roles([UserType.ADMIN, UserType.SUPERADMIN])
  @ApiOperation({
    summary: "Create company",
  })
  @ApiResponse({
    status: 201,
    description: "Company created.",
    type: CompanyResponseDto,
  })
  @ApiResponse({ status: 403, description: "Forbidden." })
  async create(
    @Body() createCompanyDto: CreateCompanyRequestDto
  ): Promise<CompanyResponseDto> {
    return await this.companyUseCase.createCompany(createCompanyDto);
  }

  @Get(":companyId")
  @UseGuards(JwtAuthGuard)
  @Roles([UserType.ADMIN, UserType.USER, UserType.SUPERADMIN])
  @ApiOperation({
    summary: "Get company",
  })
  @ApiResponse({
    status: 200,
    description: "The found company.",
    type: CompanyResponseDto,
  })
  @ApiResponse({ status: 403, description: "Forbidden." })
  @ApiParam({ name: "companyId", description: "Company ID" })
  async get(
    @Param("companyId") companyId: string
  ): Promise<CompanyResponseDto> {
    return await this.companyUseCase.getCompany(companyId);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  @Roles([UserType.ADMIN, UserType.USER, UserType.SUPERADMIN])
  @ApiOperation({
    summary: "Get all companies",
  })
  @ApiResponse({
    status: 200,
    description: "The found chapters.",
    type: Array<CompanyResponseDto>,
  })
  @ApiResponse({ status: 403, description: "Forbidden." })
  async getAll(): Promise<Array<CompanyResponseDto>> {
    return await this.companyUseCase.getAllCompanies();
  }

  @Delete(":companyId")
  @UseGuards(JwtAuthGuard)
  @Roles([UserType.ADMIN, UserType.SUPERADMIN])
  @ApiOperation({
    summary: "Delete Chapter",
  })
  @ApiResponse({ status: 204, description: "Chapter deleted." })
  @ApiResponse({ status: 403, description: "Forbidden." })
  @ApiParam({ name: "companyId", description: "Chapter ID" })
  async delete(@Param("companyId") companyId: string): Promise<void> {
    await this.companyUseCase.deleteCompany(companyId);
  }

  @Put(":companyId")
  @UseGuards(JwtAuthGuard)
  @Roles([UserType.ADMIN, UserType.SUPERADMIN])
  @ApiOperation({
    summary: "Company Chapter",
  })
  @ApiResponse({
    status: 200,
    description: "Company Updated.",
    type: CompanyResponseDto,
  })
  @ApiResponse({ status: 403, description: "Forbidden." })
  @ApiParam({ name: "companyId", description: "Company ID" })
  async update(
    @Param("companyId") companyId: string,
    @Body() updateCompanyDto: UpdateCompanyRequestDto
  ): Promise<CompanyResponseDto> {
    return await this.companyUseCase.updateCompany(companyId, updateCompanyDto);
  }
}
