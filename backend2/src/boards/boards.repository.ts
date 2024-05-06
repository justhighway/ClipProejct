import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Boards } from './boards.entity';

@Injectable()
export class BoardsRepository extends Repository<Boards> {
  constructor(private dataSource: DataSource) {
    super(Boards, dataSource.createEntityManager());
  }

  // 기본 쿼리 설정 후 Service에서 꺼내서 사용
  async getBoardById(id: number): Promise<Boards> {
    return await this.findOneBy({ board_seq: id });
  }
}
