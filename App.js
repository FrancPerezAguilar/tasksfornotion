import React, { useState } from 'react'
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ScrollView, FlatList, Dimensions, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';

import Task from './components/Task';

//const Stack = createNativeStackNavigator();

export default function App() {
  const [isChecked, setChecked] = useState(false);

  return (
    <NavigationContainer>
        <SafeAreaView style={styles.container}>
          <View style={styles.header}>
            <Text style={{ fontSize: 25 }}>Tasks for Notion</Text>
            <View style={styles.avatar}/>
          </View>
          <View style={styles.divider}></View>
          <View style={styles.controllers}>
            <Button title='New | +'/>
          </View>
          <ScrollView style={styles.scroll}>
            <Task/>
            <Task/>
            <Task/>
            <Task/>
            <Task/>
            <Task/>
            <Task/>
            <Task/>
            <Task/>
            <Task/>
            <Task/>
            <Task/>
            <Task/>
            <Task/>
          </ScrollView>
        </SafeAreaView>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: StatusBar.currentHeight,
  },
  scroll: {
    paddingHorizontal: 16,
    marginVertical: 16,
  },
  header: {
    paddingHorizontal: 16,
    marginBottom: 8,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
  },
  avatar: {
    backgroundColor: '#d0d0d0',
    height: 50,
    width: 50,
    borderRadius: 100,
  },
  divider: {
    height: 2,
    backgroundColor: '#3C3C3C',
    marginHorizontal: 16,
  },
  controllers: {
    marginTop: 16,
    paddingHorizontal: 16,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
});
