import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import {authNavigations} from '@/constants';
import AuthHomeScreen from '@/screens/auth/AuthScreen';
import SignInScreen from '@/screens/auth/SignInScreen';
import SignUpScreen from '@/screens/auth/SignUpScreen';

// AuthStack에는 다음과 같이 정의한 screen 이름과 params 타입만 전달될 수 있다
// AuthStack에는 params는 필요 없으므로 모두 undefined로 처리
export type AuthStackParamList = {
  [authNavigations.AUTH_HOME]: undefined;
  [authNavigations.AUTH_SIGNIN]: undefined;
  [authNavigations.AUTH_SIGNUP]: undefined;
};

export default function AuthStackNavigator() {
  const Stack = createStackNavigator<AuthStackParamList>();

  return (
    <Stack.Navigator
      screenOptions={{
        cardStyle: {
          backgroundColor: 'white',
        },
        headerStyle: {
          backgroundColor: 'white',
          shadowColor: 'white',
        },
        headerTitleStyle: {
          fontSize: 20,
        },
        headerTintColor: 'purple',
      }}>
      <Stack.Screen
        name={authNavigations.AUTH_HOME}
        component={AuthHomeScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name={authNavigations.AUTH_SIGNIN}
        component={SignInScreen}
        options={{
          title: ' ',
        }}
      />
      <Stack.Screen
        name={authNavigations.AUTH_SIGNUP}
        component={SignUpScreen}
        options={{
          title: ' ',
        }}
      />
    </Stack.Navigator>
  );
}
