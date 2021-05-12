import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StackNavigationOptions } from '@react-navigation/stack';
import AppLoading from 'expo-app-loading';

import {
  useFonts, VarelaRound_400Regular
} from '@expo-google-fonts/varela-round';


import Main from './src/screens/main';
import About from './src/screens/main';

const Stack = createStackNavigator();

const screenOptions: StackNavigationOptions = {
  // headerTransparent: true,
  headerTitleStyle: {
    fontSize: 35,
    marginHorizontal: 15,
    textAlign: 'center',
    fontFamily: 'VarelaRound_400Regular',
    fontWeight: 'bold'
  },
  headerStyle: {
    elevation: 0,
    height: 100,
  },
}

export default function App() {
  let [fontsLoaded] = useFonts({
    VarelaRound_400Regular,
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }
  else {
    return (
      <NavigationContainer>
        <StatusBar style="auto" />
        <Stack.Navigator initialRouteName="Main">
          <Stack.Screen name="E P O C H" component={Main} options={screenOptions} />
          <Stack.Screen name="About" component={About} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
