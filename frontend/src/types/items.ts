import {categories} from '@/constants';

export type Depth1Category = keyof typeof categories;
export type Depth2Category = string;

// export interface Item {
//   itemId: number;
//   itemName: string;
//   itemPrice: string;
//   itemCategory: Depth2Category;
//   itemCondition: number;
//   itemDescription: string | null;
//   itemLocation?: string;
// }

export interface Item {
  id: number;
  itemName: string;
  itemPrice: string | number;
  userLevel: string;
  itemCondition: string | number;
  userLocation: string;
  userPicture: string;
  userNickname: string;
  itemCategory: Depth2Category;
  itemDescription: string | null;
}
