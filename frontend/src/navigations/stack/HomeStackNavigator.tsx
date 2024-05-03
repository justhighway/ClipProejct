import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {homeNavigations} from '@/constants';
import MapScreen from '@/screens/maps/MapScreen';
import HomeScreen from '@/screens/home/HomeScreen';

export type homeStackParamList = {
  [homeNavigations.HOME_HOME]: undefined;
  [homeNavigations.HOME_MAP]: undefined;
};

export default function HomeStackNavigator() {
  const Stack = createStackNavigator<homeStackParamList>();

  return (
    <Stack.Navigator>
      <Stack.Screen
        name={homeNavigations.HOME_HOME}
        component={HomeScreen}
        options={{
          title: ' ',
        }}
      />
      <Stack.Screen
        name={homeNavigations.HOME_MAP}
        component={MapScreen}
        options={{
          title: ' ',
        }}
      />
    </Stack.Navigator>
  );
}
