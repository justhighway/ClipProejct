import { Module } from '@nestjs/common';
import { BoardsModule } from './boards/boards.module';
import { typeOrmConfig } from './configs/typeorm.config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmExModule } from './database/typeorm-ex.decorator';
import { BoardsRepository } from './boards/boards.repository';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    TypeOrmExModule.forCustomRepository([BoardsRepository]),
    BoardsModule,
  ],
})
export class AppModule {}
