import React, { useState } from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Main from './pages/Main';
import Auth from './pages/Auth';
import Onboard from './pages/Onboard';

const Stack = createNativeStackNavigator();

export default function App() {
  const [token, setToken] = useState(null);

  return (
    <NavigationContainer>
      {
        token !== null ?
        <Stack.Navigator>
          <Stack.Screen name='Onboard' component={Onboard} />
          <Stack.Screen name="Auth" component={Auth} />
        </Stack.Navigator>
        :
        <Stack.Navigator>
          <Stack.Screen name="Tasks for Notion" component={Main} />
        </Stack.Navigator>
      }
    </NavigationContainer>
  );
}