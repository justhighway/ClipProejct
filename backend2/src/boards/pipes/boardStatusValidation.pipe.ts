import { BadRequestException, PipeTransform } from '@nestjs/common';
import { BoardStatus } from '../boardStatus.enum';

export class BoardStatusValidationPipe implements PipeTransform {
  readonly StatusOptions = [BoardStatus.PRIVATE, BoardStatus.PUBLIC];

  transform(value: any) {
    value = value.toUpperCase();

    if (!this.isStatusValid(value)) {
      throw new BadRequestException(`${value} is an invalid status`);
    }
    return value;
  }

  private isStatusValid(status: any) {
    const idx = this.StatusOptions.indexOf(status);
    return idx !== -1;
  }
}
