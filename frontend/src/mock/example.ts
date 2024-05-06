// src/mock/mockApi.js:
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import mockData from './mockData.json';

const mock = new MockAdapter(axios);

// 메모리 데이터 저장
let memoryData = [...mockData];

// POST 요청에 대한 모의 응답 설정
mock.onPost('/api/example').reply(config => {
  const newItem = JSON.parse(config.data);

  // 새로운 아이템에 대해 ID를 생성
  const maxId = memoryData.reduce(
    (max, item) => Math.max(max, item.itemSeq),
    0,
  );
  newItem.itemSeq = maxId + 1;

  // 새로운 아이템을 메모리 데이터에 추가
  memoryData.push(newItem);

  // HTTP 201 상태 코드와 함께 추가된 아이템 반환
  return [201, newItem];
});
