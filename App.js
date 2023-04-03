import React, { useState, useEffect, useContext } from 'react'
import { StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as SecureStore from 'expo-secure-store';

import Main from './pages/Main';
import Auth from './pages/Auth';
import Onboard from './pages/Onboard';
import NewTask from './pages/NewTask';

import TasksState from './contexts/TasksState';
import { checkConnection } from './apis/notion';

const Stack = createNativeStackNavigator();

export default function App() {
  const [auth, setAuth] = useState(false);

  useEffect(()=>{
   checkConnection().then( (res) => setAuth(res));
  },[]);

  useEffect(()=>{}, [auth]);

  return (
    <NavigationContainer>
      {
        auth ?
        <>
        <StatusBar backgroundColor="#ffffff" barStyle={'dark-content'}/>
        <Stack.Navigator>
          <Stack.Screen name='Tasks for Notion' component={Onboard} />
          <Stack.Screen name='Select database' component={Auth} state={auth} authorise={setAuth} />
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

