type MarkerColor = 'RED' | 'YELLOW' | 'GREEN' | 'BLUE' | 'PURPLE';

type Category = {
  [key in MarkerColor]: string;
};

interface ImageUri {
  id?: number;
  uri: string;
}

interface Marker {
  id: number;
  latitude: number;
  longitude: number;
  color: MarkerColor;
  score: number;
}

//! item에 맞게 바꿀 것!!
interface Post extends Marker {
  title: string;
  address: string;
  date: Date | string;
  description: string;
}

interface AddItem {
  itemName: string;
  itemPrice: string;
  itemCondition: number;
  itemDescription: string;
  itemLocation: string;
}

interface Profile {
  id: number;
  email: string;
  nickname: string | null;
  imageUri: string | null;
  kakaoImageUri: string | null;
  loginType: 'email' | 'kakao' | 'apple';
}

export type {MarkerColor, Category, ImageUri, Marker, Post, Profile, AddItem};
