import React from 'react';
import useAuth from '@/hooks/queries/useAuth';
import MainTabNavigator from '../bottomTab/MainTabNavigator';
import AuthStackNavigator from '../stack/AuthStackNavigator';

export default function RootNavigator() {
  const {isSignIn} = useAuth();
  return <>{isSignIn ? <MainTabNavigator /> : <AuthStackNavigator />}</>;
}
