import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {homeNavigations} from '@/constants';
import MapScreen from '@/screens/maps/MapScreen';
import HomeScreen from '@/screens/home/HomeScreen';
import {LatLng} from 'react-native-maps';
import AddItemScreen from '@/screens/home/AddItemScreen';
import {getFocusedRouteNameFromRoute} from '@react-navigation/native';

export type HomeStackParamList = {
  [homeNavigations.HOME_HOME]: undefined;
  [homeNavigations.HOME_ADDITEM]: {location: LatLng};
  [homeNavigations.HOME_MAP]: undefined;
};

const Stack = createStackNavigator<HomeStackParamList>();

export default function HomeStackNavigator({navigation, route}) {
  React.useLayoutEffect(() => {
    const routeName = getFocusedRouteNameFromRoute(route);
    if (routeName !== homeNavigations.HOME_HOME) {
      navigation.setOptions({tabBarStyle: {display: 'none'}});
    } else {
      navigation.setOptions({tabBarStyle: {display: undefined}});
    }
  }, [navigation, route]);

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
        options={{
          headerTitle: '물건 업로드',
        }}
      />
      <Stack.Screen
        name={homeNavigations.HOME_MAP}
        component={MapScreen}
        options={{
          headerTitle: '지도에서 위치 확인',
        }}
      />
    </Stack.Navigator>
  );
}
