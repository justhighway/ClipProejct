import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { BoardStatus } from './boardStatus.enum';

@Entity()
export class Boards extends BaseEntity {
  @PrimaryGeneratedColumn()
  board_seq: number;

  @Column({
    length: 30,
  })
  board_title: string;

  @Column({
    length: 30,
  })
  board_description: string;

  @Column()
  board_status: BoardStatus;
}
