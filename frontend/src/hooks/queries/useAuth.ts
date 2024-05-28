import {useMutation, useQuery} from '@tanstack/react-query';
import {UseMutationCustomOptions, UseQueryCustomOptions} from '@/types/common';
import {getAccessToken, getProfile, postSignIn, postSignUp} from '@/api';
import {
  removeEncryptedStorage,
  removeHeader,
  setEncryptedStorage,
  setHeader,
} from '@/utils';
import {useEffect} from 'react';
import queryClient from '@/api/queryClient';
import {numbers, queryKeys, storageKeys} from '@/constants';

export function useSignUp(mutationOptions?: UseMutationCustomOptions) {
  return useMutation({
    mutationFn: postSignUp,
    ...mutationOptions,
  });
}

export function useSignIn(mutationOptions?: UseMutationCustomOptions) {
  return useMutation({
    mutationFn: postSignIn,
    onSuccess: ({accessToken, refreshToken}) => {
      setHeader('Authorization', `Bearer ${accessToken}`);
      setEncryptedStorage(storageKeys.REFRESH_TOKEN, refreshToken);
    },
    onSettled: () => {
      // 로그인 후 리프레쉬 훅 호출하여 자동 갱신이 처음 로그인 했을 때에도
      // 옵션에 따라 로직이 돌도록 해줌
      queryClient.refetchQueries({
        queryKey: [queryKeys.AUTH, queryKeys.GET_ACCESS_TOKEN],
      });
      // 로그인 후 쿼리 한 번 무효화
      queryClient.invalidateQueries({
        queryKey: [queryKeys.AUTH, queryKeys.GET_PROFILE],
      });
    },
    ...mutationOptions,
  });
}

export function useGetRefreshToken() {
  // useQuery의 반환 상태 값으로 핸들링
  const {isSuccess, data, isError} = useQuery({
    queryKey: [queryKeys.AUTH, queryKeys.GET_ACCESS_TOKEN],
    queryFn: getAccessToken,
    staleTime: numbers.ACCESS_TOKEN_REFRESH_TIME,
    refetchInterval: numbers.ACCESS_TOKEN_REFRESH_TIME,
    refetchOnReconnect: true,
    refetchIntervalInBackground: true,
  });

  useEffect(() => {
    if (isSuccess) {
      setHeader('Authorization', `Bearer ${data.accessToken}`);
      setEncryptedStorage(storageKeys.REFRESH_TOKEN, data.refreshToken);
    }
    if (isError) {
      removeHeader('Authorization');
      removeEncryptedStorage(storageKeys.REFRESH_TOKEN);
    }
  }, [isSuccess, isError]);

  return {isSuccess, isError};
}

export function useGetProfile(queryOptions?: UseQueryCustomOptions) {
  return useQuery({
    queryKey: [queryKeys.AUTH, queryKeys.GET_PROFILE],
    queryFn: getProfile,
    ...queryOptions,
  });
}

export function useAuth() {
  const refreshTokenQuery = useGetRefreshToken();
  const getProfileQuery = useGetProfile({
    enabled: refreshTokenQuery.isSuccess,
  });
  const isSignIn = getProfileQuery.isSuccess;
  const signUpMutation = useSignUp();
  const signInMutation = useSignIn();

  return {
    refreshTokenQuery,
    getProfileQuery,
    isSignIn,
    signInMutation,
    signUpMutation,
  };
}
