import {QueryClient} from '@tanstack/react-query';

// queryClient는 react-query의 핵심 객체로, useQuery나 useMutation을 사용할 때 필요
// queryClient에는 옵션을 설정할 수 있는데, 이를 통해 캐시의 TTL, 쿼리의 재시도 횟수 등을 설정할 수 있다.
// react-query는 기본적으로 쿼리나 뮤테이션을 실패하면 자동으로 재시도(3번)
// 이 기능을 끄고 싶다면 아래와 같이 defaultOptions를 설정해주면 된다.
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
    mutations: {
      retry: false,
    },
  },
});

export default queryClient;
