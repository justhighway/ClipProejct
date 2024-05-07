import React from 'react';
import {QueryClientProvider} from '@tanstack/react-query';
import {
  DarkTheme,
  DefaultTheme,
  NavigationContainer,
} from '@react-navigation/native';

import RootNavigator from './src/navigations/root/RootNavigator';
import queryClient from './src/api/queryClient';
import {useColorScheme} from 'react-native';

// react-query는 data fetching을 위한 useQuery,
// data update를 위한 useMutation을 제공한다.
export default function App(): React.JSX.Element {
  const colorScheme = useColorScheme();
  const theme = colorScheme === 'dark' ? DarkTheme : DefaultTheme;

  return (
    <QueryClientProvider client={queryClient}>
      <NavigationContainer theme={theme}>
        <RootNavigator />
      </NavigationContainer>
    </QueryClientProvider>
  );
}
