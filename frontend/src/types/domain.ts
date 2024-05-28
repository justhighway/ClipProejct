export interface ImageUri {
  id?: number;
  uri: string;
}

export interface Profile {
  id: number;
  username: string; // TODO: userEmail로 수정
  password: null; //! password 뺄 것
  phone: string | null;
  profileImg: string | null; // TODO: Img -> Image로 수정
  nickname: string | null;
  userLevel: number;
  userEXP: number;

  // TODO: kakaoProfileImage: string | null; // TODO: 카카오 요청
  // TODO: loginType: 'email' | 'kakao' | 'apple';
}
