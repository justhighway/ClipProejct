import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {chatNavigations} from '@/constants';
import ChatListScreen from '@/screens/chat/ChatListScreen';
import ChatRoomScreen from '@/screens/chat/ChatRoomScreen';

export type chatStackParamList = {
  [chatNavigations.CHAT_LIST]: undefined;
  [chatNavigations.CHAT_ROOM]: undefined;
};

export default function ChatStackNavigator() {
  const Stack = createStackNavigator<chatStackParamList>();

  return (
    <Stack.Navigator>
      <Stack.Screen
        name={chatNavigations.CHAT_LIST}
        component={ChatListScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name={chatNavigations.CHAT_ROOM}
        component={ChatRoomScreen}
        options={{
          title: 'room',
        }}
      />
    </Stack.Navigator>
  );
}
