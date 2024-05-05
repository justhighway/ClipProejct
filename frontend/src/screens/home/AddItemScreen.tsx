import React, {useCallback, useState} from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  useFocusEffect,
} from 'react-native';
import {useNavigation, CompositeNavigationProp} from '@react-navigation/native';
import {StackNavigationProp, StackScreenProps} from '@react-navigation/stack';
import {BottomTabNavigationProp} from '@react-navigation/bottom-tabs';

import {HomeStackParamList} from '@/navigations/stack/HomeStackNavigator';
import {MainTabParamList} from '@/navigations/bottomTab/MainTabNavigator';
import {homeNavigations} from '@/constants';

type AddItemScreenProps = StackScreenProps<
  HomeStackParamList,
  typeof homeNavigations.HOME_ADDITEM
>;

type Navigations = CompositeNavigationProp<
  StackNavigationProp<HomeStackParamList>,
  BottomTabNavigationProp<MainTabParamList>
>;

export default function AddItemScreen({route}: AddItemScreenProps) {
  const navigation = useNavigation<Navigations>();
  // `route.params`에서 `location` 정보를 받습니다.
  const {location} = route.params || {};
  const [activeLocation, setActiveLocation] = useState(
    location || defaultLocation,
  );

  // `location` 정보가 없는 경우 기본값을 설정합니다.
  const defaultLocation = {
    latitude: 35,
    longitude: 125,
  };

  useFocusEffect(
    useCallback(() => {
      if (route.params?.location) {
        setActiveLocation(route.params.location);
      }
      return () => {
        console.log('AddItemScreen: unmount');
      };
    }, [route]),
  );

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => navigation.navigate(homeNavigations.HOME_MAP)}>
        <Text style={styles.text}>맵으로 이동</Text>
      </TouchableOpacity>

      {/* `location`이 없으면 기본값을 사용합니다. */}
      <Text style={styles.text}>Latitude: {activeLocation.latitude}</Text>
      <Text style={styles.text}>Longitude: {activeLocation.longitude}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 20,
  },
});
