import {useEffect} from 'react';
import {useMutation, useQuery} from '@tanstack/react-query';

import {
  ResponseProfile,
  getAccessToken,
  getProfile,
  signOut,
  postSignIn,
  postSignUp,
} from '@/api/auth';
import {
  removeEncryptedStorage,
  removeHeader,
  setEncryptedStorage,
  setHeader,
} from '@/utils';
import queryClient from '@/api/queryClient';
import {numbers, queryKeys, storageKeys} from '@/constants';
import type {
  UseMutationCustomOptions,
  UseQueryCustomOptions,
} from '@/types/common';

function useSignUp(mutationOptions?: UseMutationCustomOptions) {
  return useMutation({
    mutationFn: postSignUp,
    ...mutationOptions,
  });
}

function useSignIn(mutationOptions?: UseMutationCustomOptions) {
  return useMutation({
    mutationFn: postSignIn,
    onSuccess: ({accessToken, refreshToken}) => {
      setHeader('Authorization', `Bearer ${accessToken}`);
      setEncryptedStorage(storageKeys.REFRESH_TOKEN, refreshToken);
    },
    onSettled: () => {
      queryClient.refetchQueries({
        queryKey: [queryKeys.AUTH, queryKeys.GET_ACCESS_TOKEN],
      });
      queryClient.invalidateQueries({
        queryKey: [queryKeys.AUTH, queryKeys.GET_PROFILE],
      });
    },
    ...mutationOptions,
  });
}

function useGetRefreshToken() {
  const {data, error, isSuccess, isError} = useQuery({
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
  }, [isSuccess]);

  useEffect(() => {
    if (isError) {
      removeHeader('Authorization');
      removeEncryptedStorage(storageKeys.REFRESH_TOKEN);
    }
  }, [isError]);

  return {isSuccess, isError};
}

function useGetProfile(queryOptions?: UseQueryCustomOptions<ResponseProfile>) {
  return useQuery({
    queryFn: getProfile,
    queryKey: [queryKeys.AUTH, queryKeys.GET_PROFILE],
    ...queryOptions,
  });
}

function useSignOut(mutationOptions?: UseMutationCustomOptions) {
  return useMutation({
    mutationFn: signOut,
    onSuccess: () => {
      removeHeader('Authorization');
      removeEncryptedStorage(storageKeys.REFRESH_TOKEN);
    },
    onSettled: () => {
      queryClient.invalidateQueries({queryKey: [queryKeys.AUTH]});
    },
    ...mutationOptions,
  });
}

function useAuth() {
  const signUpMutation = useSignUp();
  const refreshTokenQuery = useGetRefreshToken();
  const getProfileQuery = useGetProfile({
    enabled: refreshTokenQuery.isSuccess,
  });
  const isSignIn = getProfileQuery.isSuccess;
  const signInMutation = useSignIn();
  const signOutMutation = useSignOut();

  return {
    signUpMutation,
    signInMutation,
    refreshTokenQuery,
    getProfileQuery,
    signOutMutation,
    isSignIn,
  };
}

export default useAuth;
