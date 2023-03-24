import { Module } from '@nestjs/common';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { DatasetService } from './dataset.service';
import { DatasetController } from './dataset.controller';
import { DatasetEntity } from './entities/dataset.entity';


@Module({
  imports: [MikroOrmModule.forFeature([DatasetEntity])],
  providers: [DatasetService],
  controllers: [DatasetController],
})
export class DatasetModule {}
