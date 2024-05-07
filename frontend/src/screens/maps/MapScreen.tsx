import React, {useRef, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import MapView, {LatLng, Marker, PROVIDER_GOOGLE} from 'react-native-maps';

import {colors, homeNavigations} from '@/constants';
import useUserLocation from '@/hooks/useUserLocation';
import usePermission from '@/hooks/usePermission';
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

  const handlePressButton = () => {
    navigaiton.navigate(homeNavigations.HOME_ADDITEM, {location});
  };

  return (
    <>
      <MapView
        ref={mapRef}
        style={styles.mapContainer}
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
      <View style={styles.locationContainer}>
        <View style={styles.addressContainer}>
          <Text style={styles.text}>위도: {location.latitude}</Text>
          <Text style={styles.text}>경도: {location.longitude}</Text>
        </View>
        <CustomButton
          label="이 위치로 주소 설정"
          variant="filled"
          size="large"
          onPress={handlePressButton}
        />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  mapContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  locationContainer: {
    flex: 0.2,
    padding: 20,
    backgroundColor: colors.WHITE,
    borderTopWidth: 1,
    borderTopColor: colors.GREY500,
  },
  addressContainer: {
    justifyContent: 'center',
    marginBottom: 10,
  },
  text: {
    fontSize: 16,
    fontWeight: '600',
  },
});
