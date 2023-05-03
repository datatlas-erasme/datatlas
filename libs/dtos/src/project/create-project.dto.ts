import { DatasetInterface, ProjectInterface } from '@datatlas/models';
import { ConfigDto } from './config.dto';
import { IsBoolean, IsOptional, IsString, ValidateNested } from 'class-validator';

export class CreateProjectDto
  implements Omit<Partial<ProjectInterface>, 'id' | 'owner' | 'contributors' | 'createdAt'>
{
  @IsString()
  title: string;
  @IsOptional()
  @IsBoolean()
  draft? = true;
  datasets: DatasetInterface[] = [];
  @IsOptional()
  @IsString()
  description?: string;
  contributors: number[] = [];
  @IsOptional()
  @ValidateNested()
  config: ConfigDto = new ConfigDto();
  @IsOptional()
  version? = 'v1' as const;

  constructor(createProjectDto: CreateProjectDto) {
    Object.assign(this, createProjectDto);
  }
}
