import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from '../../domain/category.entity';
import { CreateCategoryDTO } from '../dto/CreateCategoryDTO';
import { UpdateCategoryDTO } from '../dto/UpdateCategoryDTO';
import { CategoryResponseDTO } from '../dto/CategoryReponseDTO';

@Injectable()
export class CategoriesService {
        constructor(
            @InjectRepository(Category)
            private readonly category_repository: Repository<Category>,
        ) { }

    async create(data: CreateCategoryDTO): Promise<CategoryResponseDTO> {
        const category = this.category_repository.create(data);
        const saved = await this.category_repository.save(category);
        return this.toResponseDTO(saved);
    }

    async findAll(): Promise<CategoryResponseDTO[]> {
        const categories = await this.category_repository.find();
        return categories.map(this.toResponseDTO);
    }

    async findById(id: number): Promise<CategoryResponseDTO> {
        const category = await this.category_repository.findOne({ where: { id } });
        if (!category) throw new NotFoundException(`Category ${id} not found`);
        return this.toResponseDTO(category);
    }

    async update(id: number, data: UpdateCategoryDTO): Promise<CategoryResponseDTO> {
        const category = await this.category_repository.findOne({ where: { id } });
        if (!category) throw new NotFoundException(`Category ${id} not found`);

        Object.assign(category, data);
        const updated = await this.category_repository.save(category);
        return this.toResponseDTO(updated);
    }

    async delete(id: number): Promise<void> {
        const result = await this.category_repository.delete(id);
        if (result.affected === 0) throw new NotFoundException(`Category ${id} not found`);
    }

    private toResponseDTO(category: Category): CategoryResponseDTO {
        return {
            id: category.id,
            name: category.name,
            created_at: category.created_at,
            updated_at: category.updated_at,
        };
    }
}
