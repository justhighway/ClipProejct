import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import BoardsScreen from '@/screens/community/BoardsScreen';
import ChatListScreen from '@/screens/chat/ChatListScreen';
import ProfileScreen from '@/screens/profile/ProfileScreen';
import HomeStackNavigator from '../stack/HomeStackNavigator';

const BottomTab = createBottomTabNavigator();

export default function MainTabNavigator() {
  return (
    <BottomTab.Navigator screenOptions={{headerShown: false}}>
      <BottomTab.Screen name="Home" component={HomeStackNavigator} />
      <BottomTab.Screen name="Community" component={BoardsScreen} />
      <BottomTab.Screen name="Chat" component={ChatListScreen} />
      <BottomTab.Screen name="Profile" component={ProfileScreen} />
    </BottomTab.Navigator>
  );
}
