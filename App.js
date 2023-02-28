import React, { useState, useEffect } from 'react'
import { StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Main from './pages/Main';
import Auth from './pages/Auth';
import Onboard from './pages/Onboard';
import NewTask from './pages/NewTask';

//import { getContentDatabase } from "./apis/notion";
import TasksState from './contexts/TasksState';

const Stack = createNativeStackNavigator();

export default function App() {
  const [token, setToken] = useState(null);

  return (
    <NavigationContainer>
      {
        token !== null ?
        <>
        <StatusBar backgroundColor="#ffffff" barStyle={'dark-content'}/>
        <Stack.Navigator>
          <Stack.Screen name='Onboard' component={Onboard} />
          <Stack.Screen name="Auth" component={Auth} />
        </Stack.Navigator>
        </>
        :
        <>
        <StatusBar backgroundColor="#ffffff" barStyle={'dark-content'}/>
        <TasksState>
          <Stack.Navigator>
            <Stack.Group>
              <Stack.Screen name="Tasks for Notion" component={Main} />
            </Stack.Group>
            <Stack.Group screenOptions={{ presentation: 'modal' }}>
              <Stack.Screen name="New task" component={NewTask} />
            </Stack.Group>
          </Stack.Navigator>
        </TasksState>
        </>
      }
    </NavigationContainer>
  );
}