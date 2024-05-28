import { createParamDecorator, ExecutionContext } from '@nestjs/common';

/*
createParamDecorator: 커스텀 파라미터 데코레이터를 만드는 함수
ExecutionContext: 현재 실행 컨텍스트에 대한 정보를 제공하는 인터페이스
(HTTP, WS 등 다양한 요청 문맥에 대해 추상화된 접근 제공)
*/

/*
GetUser: 요청의 user 속성을 반환하는 커스텀 데코레이터
createParamDecorator 함수는 두 개의 인자를 받은 콜백 함수를 인자로 받음
첫 번째 인자: 데코레이터의 데이터를 받을 수 있지만 사용되지 않아 '_'로 표기
두 번째 인자: ExecutionContext 객체로 현재 실행 문맥을 나타냄
*/

export const GetUser = createParamDecorator((_, ctx: ExecutionContext) => {
  // switchToHttp().getRequest()를 호출하여 HTTP 요청 객체를 얻어옴
  // user 속성은 인증 미들웨어(passport)를 통해 설정된 사용자 정보를 담고 있음
  const request = ctx.switchToHttp().getRequest();
  return request.user;
});
