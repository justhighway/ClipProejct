import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {myPageNavigations} from '@/constants';
import MyPageScreen from '@/screens/profile/MyPageScreen';

export type myPageStackParamList = {
  [myPageNavigations.MYPAGE_HOME]: undefined;
};

export default function MyPageStackNavigator() {
  const Stack = createStackNavigator<myPageStackParamList>();

  return (
    <Stack.Navigator>
      <Stack.Screen
        name={myPageNavigations.MYPAGE_HOME}
        component={MyPageScreen}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
}
