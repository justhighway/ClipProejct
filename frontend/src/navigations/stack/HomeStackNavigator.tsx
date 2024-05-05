import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {homeNavigations} from '@/constants';
import MapScreen from '@/screens/maps/MapScreen';
import HomeScreen from '@/screens/home/HomeScreen';
import {LatLng} from 'react-native-maps';
import AddItemScreen from '@/screens/home/AddItemScreen';

export type HomeStackParamList = {
  [homeNavigations.HOME_HOME]: undefined;
  [homeNavigations.HOME_ADDITEM]: {location: LatLng};
  [homeNavigations.HOME_MAP]: undefined;
};

export default function HomeStackNavigator() {
  const Stack = createStackNavigator<HomeStackParamList>();

  return (
    <Stack.Navigator>
      <Stack.Screen
        name={homeNavigations.HOME_HOME}
        component={HomeScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name={homeNavigations.HOME_ADDITEM}
        component={AddItemScreen}
      />
      <Stack.Screen name={homeNavigations.HOME_MAP} component={MapScreen} />
    </Stack.Navigator>
  );
}
