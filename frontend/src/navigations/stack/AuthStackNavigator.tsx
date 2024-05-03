import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import {authNavigations} from '@/constants';
import AuthHomeScreen from '@/screens/auth/AuthScreen';
import SignInScreen from '@/screens/auth/SignInScreen';
import SignUpScreen from '@/screens/auth/SignUpScreen';

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
          title: ' ',
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
