import {Category, Profile} from '@/types/domain';
import {getEncryptedStorage} from '@/utils';
import {axiosInstance} from '@/api/axios';

// axiosInstance: axios.create로 생성한 axios 인스턴스
// baseURL: 'http://localhost:3030', withCredentials: true

type RequestUser = {
  email: string;
  password: string;
};
const postSignUp = async ({email, password}: RequestUser): Promise<void> => {
  const {data} = await axiosInstance.post('/auth/signup', {
    email,
    password,
  });
  return data;
};

type ResponseToken = {
  accessToken: string;
  refreshToken: string;
};

const postSignIn = async ({
  email,
  password,
}: RequestUser): Promise<ResponseToken> => {
  const {data} = await axiosInstance.post('/auth/signin', {
    email,
    password,
  });
  return data;
};

type ResponseProfile = Profile & Category;
const getProfile = async (): Promise<ResponseProfile> => {
  const {data} = await axiosInstance.get('/auth/me');
  return data;
};

const getAccessToken = async (): Promise<ResponseToken> => {
  const refreshToken = await getEncryptedStorage('refreshToken');
  const {data} = await axiosInstance.get('/auth/refresh', {
    headers: {
      Authorization: `Bearer ${refreshToken}`,
    },
  });
  return data;
};

const signOut = async (): Promise<void> => {
  await axiosInstance.post('/auth/logout');
};

export {postSignUp, postSignIn, getProfile, getAccessToken, signOut};
export type {RequestUser, ResponseToken, ResponseProfile};
