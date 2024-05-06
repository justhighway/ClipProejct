import {
  Controller,
  Get,
  Param,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { BoardsService } from './boards.service';
import { CreateBoardDto } from './dto/createBoard.dto';
import { Boards } from './boards.entity';

@Controller('boards')
export class BoardsController {
  constructor(private boardsService: BoardsService) {}

  @Get('/:board_seq')
  getBoardById(@Param('board_seq') board_seq: number): Promise<Boards> {
    return this.boardsService.getByBoardId(board_seq);
  }
}
