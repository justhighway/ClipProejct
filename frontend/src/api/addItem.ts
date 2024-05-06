import {AddItem, ImageUri, Post} from '@/types/domain';
import axiosInstance from './axios';

type ResponsePost = Post & {images: ImageUri[]};
type RequestPost = Omit<Post, 'id'> & {images: ImageUri[]};
type RequestAddItem = Omit<AddItem, 'itemLocation'> & {
  itemUploaderUuid: string;
};
type ResponseAddItem = AddItem & {Images: ImageUri[]};

const addItem = async (body: RequestAddItem): Promise<ResponseAddItem> => {
  const {data} = await axiosInstance.post('/posts', body);
  return data;
};

export {addItem};
export type {ResponseAddItem, RequestAddItem};
