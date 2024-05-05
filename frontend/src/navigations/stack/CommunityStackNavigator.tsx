import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {communityNavigations} from '@/constants';
import BoardsScreen from '@/screens/community/BoardsScreen';
import PostsScreen from '@/screens/community/PostsScreen';
import PostDetailScreen from '@/screens/community/PostDetailScreen';

export type communityStackParamList = {
  [communityNavigations.COMMUNITY_BOARDS]: undefined;
  [communityNavigations.COMMUNITY_POSTS]: undefined;
  [communityNavigations.COMMUNITY_DETAIL]: undefined;
};

export default function CommunityStackNavigator() {
  const Stack = createStackNavigator<communityStackParamList>();

  return (
    <Stack.Navigator>
      <Stack.Screen
        name={communityNavigations.COMMUNITY_BOARDS}
        component={BoardsScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name={communityNavigations.COMMUNITY_POSTS}
        component={PostsScreen}
        options={{
          title: 'posts',
        }}
      />
      <Stack.Screen
        name={communityNavigations.COMMUNITY_DETAIL}
        component={PostDetailScreen}
        options={{
          title: 'detail',
        }}
      />
    </Stack.Navigator>
  );
}
