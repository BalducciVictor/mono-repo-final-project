import { Model } from "mongoose";
import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Documentation } from "src/domain/entities/documentation";
import { IDocumentationRepository } from "src/domain/interfaces/repository/IDocumentationRepository";
import { CreateDocumentationRequestDto } from "src/application/dto/Documentation/Request/create-documentation-request.dto";

@Injectable()
export class DocumentationRepository implements IDocumentationRepository {
  constructor(
    @InjectModel(Documentation.name)
    private documentationModel: Model<Documentation>
  ) {}

  async createDocumentation(
    documentation: Documentation
  ): Promise<Documentation> {
    console.log(documentation, "zaz");
    const createdDocumentation = new this.documentationModel(documentation);
    return createdDocumentation.save();
  }

  async getDocumentation(id: string): Promise<Documentation | null> {
    return this.documentationModel.findById(id).exec();
  }

  async updateDocumentation(
    id: string,
    updateData: Partial<Documentation>
  ): Promise<Documentation | null> {
    return this.documentationModel
      .findByIdAndUpdate(id, updateData, { new: true })
      .exec();
  }

  async deleteDocumentation(id: string): Promise<void> {
    await this.documentationModel.findByIdAndDelete(id).exec();
  }
}
