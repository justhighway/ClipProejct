import React, {Fragment, useRef, useState} from 'react';
import {
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import MapView, {LatLng, Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import Ionicons from 'react-native-vector-icons/Ionicons';

import {colors, homeNavigations} from '@/constants';
import useUserLocation from '@/hooks/useUserLocation';
import usePermission from '@/hooks/usePermission';
import CustomMarker from '@/components/CustomMarker';
import {CompositeNavigationProp, useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {HomeStackParamList} from '@/navigations/stack/HomeStackNavigator';
import {BottomTabNavigationProp} from '@react-navigation/bottom-tabs';
import {MainTabParamList} from '@/navigations/bottomTab/MainTabNavigator';
import CustomButton from '@/components/CustomButton';

type Navigations = CompositeNavigationProp<
  StackNavigationProp<HomeStackParamList>,
  BottomTabNavigationProp<MainTabParamList>
>;

export default function MapScreen() {
  const navigaiton = useNavigation<Navigations>();
  const mapRef = useRef<MapView | null>(null);
  const {userLocation, isUserLocationError} = useUserLocation();
  const [location, setLocation] = useState<LatLng>(userLocation || {});
  usePermission('LOCATION');

  const usePressUserLocation = () => {
    if (isUserLocationError) {
      return;
    }
    mapRef.current?.animateToRegion({
      latitude: userLocation.latitude,
      longitude: userLocation.longitude,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    });
  };

  const handlePressButton = () => {
    navigaiton.navigate(homeNavigations.HOME_ADDITEM, {location});
  };

  return (
    <Fragment>
      <MapView
        ref={mapRef}
        style={styles.container}
        provider={PROVIDER_GOOGLE}
        showsUserLocation
        followsUserLocation
        showsMyLocationButton={true}
        initialRegion={{
          latitude: userLocation.latitude,
          longitude: userLocation.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        onRegionChange={region => {
          setLocation(region);
        }}
        onRegionChangeComplete={region => {
          setLocation(region);
        }}>
        <Marker coordinate={location} />
      </MapView>
      <View style={styles.buttonContainer}>
        <View style={styles.addressContainer}>
          <Text style={styles.text}>위도: {location.latitude}</Text>
          <Text style={styles.text}>경도: {location.longitude}</Text>
        </View>
        <CustomButton
          label="아이템 추가 화면으로 이동 "
          variant="filled"
          size="large"
          onPress={handlePressButton}
        />
      </View>
    </Fragment>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  buttonContainer: {
    flex: 0.2,
    padding: 20,
    backgroundColor: colors.WHITE,
  },
  addressContainer: {
    justifyContent: 'center',
    marginBottom: 10,
  },
  text: {
    fontSize: 16,
    fontWeight: '700',
  },
});
