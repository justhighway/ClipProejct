import {getEncryptedStorage} from '@/utils';
import {axiosInstance} from '@/api/axios';
import {Profile} from '@/types/domain';

// axiosInstance: axios.create로 생성한 axios 인스턴스

export type RequestUser = {
  username: string;
  password: string;
};

export type ResponseToken = {
  grantType: string;
  accessToken: string;
  refreshToken: string;
};

export type ResponseProfile = Profile;

export const postSignUp = async ({
  username,
  password,
}: RequestUser): Promise<void> => {
  const {data} = await axiosInstance.post('/members/sign-up', {
    username,
    password,
  });
  return data;
};

export const postSignIn = async ({
  username,
  password,
}: RequestUser): Promise<ResponseToken> => {
  const {data} = await axiosInstance.post('/members/sign-in', {
    username,
    password,
  });
  return data;
};

export const postSignOut = async (): Promise<void> => {
  await axiosInstance.post('/auth/logout');
};

export const getAccessToken = async (): Promise<ResponseToken> => {
  const refreshToken = await getEncryptedStorage('refreshToken');
  const {data} = await axiosInstance.get('/auth/refresh', {
    headers: {
      Authorization: `Bearer ${refreshToken}`,
    },
  });
  return data;
};

export const getProfile = async (): Promise<ResponseProfile> => {
  const accessToken = await getEncryptedStorage('accessToken');
  const {data} = await axiosInstance.get('/members', {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return data;
};
