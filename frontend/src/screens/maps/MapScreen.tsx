import React, {useRef, useState} from 'react';
import {
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import MapView, {LatLng, PROVIDER_GOOGLE} from 'react-native-maps';
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
    <>
      <MapView
        ref={mapRef}
        style={styles.container}
        provider={PROVIDER_GOOGLE}
        showsUserLocation
        followsUserLocation
        showsMyLocationButton={false}
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
        }}
      />
      <View style={styles.marker}>
        <CustomMarker />
      </View>
      <View style={styles.buttonContainer}>
        <Pressable style={styles.locationButton} onPress={usePressUserLocation}>
          <Ionicons name="location" size={30} color={colors.WHITE} />
        </Pressable>
      </View>
      <View>
        <Text>{location.latitude}</Text>
        <Text>{location.longitude}</Text>
      </View>
      <View>
        <TouchableOpacity onPress={handlePressButton}>
          <Text>맵으로 이동</Text>
        </TouchableOpacity>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 15,
    right: 15,
  },
  locationButton: {
    backgroundColor: colors.PURPLE400,
    marginVertical: 10,
    height: 60,
    width: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
    shadowColor: colors.BLACK,
    shadowOffset: {
      width: 1,
      height: 2,
    },
    shadowOpacity: 0.5,
    elevation: 2,
  },
  marker: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: [{translateX: -20}, {translateY: -65}],
  },
});
