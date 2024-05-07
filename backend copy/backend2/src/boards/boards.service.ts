import { Injectable, NotFoundException } from '@nestjs/common';
import { BoardsRepository } from './boards.repository';
import { Boards } from './boards.entity';

// @Injectable() 데코레이터
// 다른 모듈에서 이 서비스를 사용할 수 있도록 해줌
@Injectable()
export class BoardsService {
  constructor(private boardsRepository: BoardsRepository) {}

  async getByBoardId(board_seq: number): Promise<Boards> {
    const found: Boards = await this.boardsRepository.getBoardById(board_seq);
    if (!found) {
      throw new NotFoundException(`Board with ID "${board_seq}" not found`);
    }
    return found;
  }
}
