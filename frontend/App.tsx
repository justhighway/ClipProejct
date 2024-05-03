import React from 'react';
import {QueryClientProvider} from '@tanstack/react-query';
import {NavigationContainer} from '@react-navigation/native';

import RootNavigator from './src/navigations/root/RootNavigator';
import queryClient from './src/api/queryClient';

// react-query는 data fetching을 위한 useQuery,
// data update를 위한 useMutation을 제공한다.
export default function App(): React.JSX.Element {
  return (
    <QueryClientProvider client={queryClient}>
      <NavigationContainer>
        <RootNavigator />
      </NavigationContainer>
    </QueryClientProvider>
  );
}
