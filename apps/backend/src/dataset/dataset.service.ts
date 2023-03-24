import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityRepository } from '@mikro-orm/core';
import { DatasetEntity } from './entities/dataset.entity';
import { DatasetDto } from '@datatlas/shared/models';

@Injectable()
export class DatasetService {
   constructor(
        @InjectRepository(DatasetEntity)
        private readonly datasetRepository: EntityRepository<DatasetEntity>
    ) {}

    async findAll(): Promise<DatasetDto[]> {
        return this.datasetRepository.findAll();
    }
    async findOneById(id: number): Promise<DatasetDto> {
        return this.datasetRepository.findOne({ id });
    }
    async update(id: number, datasetDto: DatasetDto): Promise<DatasetDto> {
        const datasetToUpdate = await this.datasetRepository.findOne(id);
        this.datasetRepository.assign(datasetToUpdate, datasetDto);
        await this.datasetRepository.persistAndFlush(datasetToUpdate);
        return datasetToUpdate;
    }
    async delete(id: number): Promise<number> {
        const datasetToDelete = await this.datasetRepository.findOne(id);
        await this.datasetRepository.removeAndFlush(datasetToDelete);
        return id;
    }
    async create(datasetDto: DatasetDto): Promise<DatasetDto> {
        const dataset = new DatasetEntity(
            datasetDto.url,
            datasetDto.updatedAt,
            datasetDto.checksum,
            datasetDto.warning
        );
        await this.datasetRepository.persistAndFlush(dataset);
        return dataset;
    }

}
