import React from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import {CompositeNavigationProp, useNavigation} from '@react-navigation/native';
import {HomeStackParamList} from '@/navigations/stack/HomeStackNavigator';
import {StackNavigationProp} from '@react-navigation/stack';
import {BottomTabNavigationProp} from '@react-navigation/bottom-tabs';
import {MainTabParamList} from '@/navigations/bottomTab/MainTabNavigator';
import {homeNavigations} from '@/constants';

type Navigations = CompositeNavigationProp<
  StackNavigationProp<HomeStackParamList>,
  BottomTabNavigationProp<MainTabParamList>
>;

export default function HomeScreen() {
  const navigation = useNavigation<Navigations>();
  return (
    <View style={styles.container}>
      <Pressable
        onPress={() => navigation.navigate(homeNavigations.HOME_ADDITEM)}>
        <Text style={styles.text}>AddItem으로 이동</Text>
      </Pressable>
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
