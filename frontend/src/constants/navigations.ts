const mainNavigations = {
  HOME: 'Home',
  COMMUNITY: 'Community',
  CHAT: 'Chat',
  MYPAGE: 'MyPage',
  ADDITEM: 'AddItem',
} as const;

const authNavigations = {
  AUTH_HOME: 'AuthHome',
  AUTH_SIGNIN: 'SignIn',
  AUTH_SIGNUP: 'SignUp',
} as const;

const homeNavigations = {
  HOME_HOME: 'HomeHome',
  HOME_ADDITEM: 'AddItem',
  HOME_MAP: 'Map',
} as const;

const communityNavigations = {
  COMMUNITY_BOARDS: 'Boards',
  COMMUNITY_POSTS: 'Posts',
  COMMUNITY_DETAIL: 'PostDetail',
} as const;

const chatNavigations = {
  CHAT_LIST: 'ChatList',
  CHAT_ROOM: 'ChatRoom',
} as const;

const myPageNavigations = {
  MYPAGE_HOME: 'MyPageHome',
  MYPAGE_PROFILE: 'Profile',
} as const;

const mapNavigations = {
  MAP_HOME: 'MapHome',
} as const;

export {
  authNavigations,
  homeNavigations,
  communityNavigations,
  chatNavigations,
  myPageNavigations,
  mainNavigations,
  mapNavigations,
};
