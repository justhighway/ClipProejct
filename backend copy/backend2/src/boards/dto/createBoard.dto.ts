// DTO(Data Transfer Object): 데이터를 전송할 때 데이터의 형식을 정의하는 역할
// 데이터베이스에서 데이터를 가져오거나 데이터베이스로 데이터를 보낼 때 사용한다.
// 데이터베이스의 데이터를 서비스로 가져올 때 사용하거나 서비스에서 데이터를 데이터베이스로 보낼 때 사용한다.
// 데이터베이스의 데이터를 컨트롤러로 가져올 때 사용하거나 컨트롤러에서 데이터를 데이터베이스로 보낼 때 사용한다.

// class-validator: DTO의 데이터를 검증하는 역할
// pipes에 사용함 (Handler-level, Parameter-level, Global-level)
// IsNotEmpty: 값이 비어있지 않은지 확인
import { IsNotEmpty } from 'class-validator';

export class CreateBoardDto {
  @IsNotEmpty()
  board_title: string;

  @IsNotEmpty()
  board_description: string;
}
