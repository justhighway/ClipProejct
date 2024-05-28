import React from 'react';
import {SafeAreaView, StyleSheet, View} from 'react-native';
import {CompositeNavigationProp, useNavigation} from '@react-navigation/native';
import {HomeStackParamList} from '@/navigations/stack/HomeStackNavigator';
import {StackNavigationProp} from '@react-navigation/stack';
import {BottomTabNavigationProp} from '@react-navigation/bottom-tabs';
import {MainTabParamList} from '@/navigations/bottomTab/MainTabNavigator';
import {colors, homeNavigations} from '@/constants';
import CardSwiper from '@/components/Card';

// type Navigations = CompositeNavigationProp<
//   StackNavigationProp<HomeStackParamList>,
//   BottomTabNavigationProp<MainTabParamList>
// >;

export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <CardSwiper />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'cyan',
  },
  text: {
    fontSize: 20,
  },
});
