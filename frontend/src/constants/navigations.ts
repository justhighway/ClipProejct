const authNavigations = {
  AUTH_HOME: 'AuthHome',
  AUTH_SIGNIN: 'SignIn',
  AUTH_SIGNUP: 'SignUp',
} as const;

const homeNavigations = {
  HOME_HOME: 'HomeHome',
  HOME_MAP: 'Map',
} as const;

export {authNavigations, homeNavigations};
