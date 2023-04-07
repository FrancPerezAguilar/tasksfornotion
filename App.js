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
//import { checkConnection } from './apis/notion';

const Stack = createNativeStackNavigator();

export default function App() {
  const [auth, setAuth] = useState(false);

  useEffect(()=>{
   //checkConnection().then( (res) => setAuth(res));
  },[]);

  return (
    <NavigationContainer>
      {
        !auth ?
        <>
        <StatusBar backgroundColor="#ffffff" barStyle={'dark-content'}/>
        <Stack.Navigator>
          <Stack.Screen name='Onboard' options={{ title: 'Tasks for Notion' }} component={Onboard} />
          <Stack.Screen name='Select database' options={{ title: 'Select database' }} component={Auth} />
        </Stack.Navigator>
        </>
        :
        <>
        <StatusBar backgroundColor="#ffffff" barStyle={'dark-content'}/>
        <TasksState>
          <Stack.Navigator>
            <Stack.Group>
              <Stack.Screen name="Main" options={{ title: 'Tasks for Notion' }} component={Main} />
            </Stack.Group>
          </Stack.Navigator>
        </TasksState>
        </>
      }
    </NavigationContainer>
  );
}

