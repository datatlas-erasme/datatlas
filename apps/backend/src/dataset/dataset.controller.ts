import { Controller, Get, Post, Put, Delete, Body, Param, Logger } from '@nestjs/common';
import { DatasetService } from './dataset.service';
import { DatasetDto } from '@datatlas/shared/models';

@Controller('dataset')
export class DatasetController {
  constructor(private readonly datasetService: DatasetService) {}
  @Get()
  async fetchAll(): Promise<DatasetDto[]> {
    return await this.datasetService.findAll();
  }
  @Get(':id')
  async fetchOne(@Param('id') id: number): Promise<DatasetDto> {
    return await this.datasetService.findOneById(id);
  }
  @Post()
  async create(@Body() DatasetDto: DatasetDto) {
    Logger.log(DatasetDto);
    return this.datasetService.create(DatasetDto);
  }
  @Delete(':id')
  async delete(@Param('id') id: number): Promise<number> {
    return await this.datasetService.delete(id);
  }
  @Put(':id')
  async update(@Param('id') id: number, @Body() DatasetDto: DatasetDto): Promise<DatasetDto> {
    return await this.datasetService.update(id, DatasetDto);
  }
}
