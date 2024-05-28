import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {colors, mainNavigations} from '@/constants';
import HomeStackNavigator, {
  HomeStackParamList,
} from '../stack/HomeStackNavigator';
import CommunityStackNavigator, {
  communityStackParamList,
} from '../stack/CommunityStackNavigator';
import ChatStackNavigator, {
  chatStackParamList,
} from '../stack/ChatStackNavigator';
import MyPageStackNavigator, {
  myPageStackParamList,
} from '../stack/MyPageStackNavigator';
import {
  NavigatorScreenParams,
  RouteProp,
  useNavigation,
} from '@react-navigation/native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import TabBarButton from '@/components/TabBarButton';
import AddItemScreen from '@/screens/home/AddItemScreen';

export type MainTabParamList = {
  [mainNavigations.HOME]: NavigatorScreenParams<HomeStackParamList>;
  [mainNavigations.COMMUNITY]: NavigatorScreenParams<communityStackParamList>;
  [mainNavigations.CHAT]: NavigatorScreenParams<chatStackParamList>;
  [mainNavigations.MYPAGE]: NavigatorScreenParams<myPageStackParamList>;
  [mainNavigations.ADDITEM]: undefined;
};

const BottomTab = createBottomTabNavigator<MainTabParamList>();

const BottomTabIcons = (
  route: RouteProp<MainTabParamList>,
  focused: boolean,
) => {
  let iconName = '';
  switch (route.name) {
    case mainNavigations.HOME:
      iconName = 'home';
      break;
    case mainNavigations.COMMUNITY:
      iconName = 'people';
      break;
    case mainNavigations.CHAT:
      iconName = 'chat';
      break;
    case mainNavigations.MYPAGE:
      iconName = 'person';
      break;
  }
  return (
    <MaterialIcons
      name={iconName}
      size={30}
      color={focused ? colors.PURPLE300 : colors.GREY200}
    />
  );
};

export default function MainTabNavigator() {
  const navigation = useNavigation();
  const handlePressButton = () => {
    navigation.navigate(mainNavigations.ADDITEM);
  };
  return (
    <>
      <BottomTab.Navigator
        screenOptions={({route}) => ({
          headerShown: false,
          tabBarIcon: ({focused}) => BottomTabIcons(route, focused),
          tabBarLabel: () => null,
        })}>
        <BottomTab.Screen
          name={mainNavigations.HOME}
          component={HomeStackNavigator}
        />
        <BottomTab.Screen
          name={mainNavigations.COMMUNITY}
          component={CommunityStackNavigator}
        />
        <BottomTab.Screen
          name={mainNavigations.CHAT}
          component={ChatStackNavigator}
        />
        <BottomTab.Screen
          name={mainNavigations.MYPAGE}
          component={MyPageStackNavigator}
        />
      </BottomTab.Navigator>
      <TabBarButton onPress={handlePressButton} />
    </>
  );
}
