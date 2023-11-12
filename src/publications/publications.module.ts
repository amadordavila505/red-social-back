;
import { Publication } from './entities/publications.entity';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PublicationsController } from './controller/publications.controller';
import { PublicationsRepository, PublicationsService } from './services/publications.service';


@Module({
  imports: [TypeOrmModule.forFeature([PublicationsRepository, Publication])],
  controllers: [PublicationsController],
  providers: [PublicationsService, PublicationsRepository],
})
export class PublicationsModule {}
