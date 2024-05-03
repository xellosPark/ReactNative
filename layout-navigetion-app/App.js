import * as React from 'react';
import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import MainScreen from './Layouts/MainView/MainScreen';


export default function App() {
  return (
    <NavigationContainer>
       {/* <MyTabs />  */}
       <MainScreen/>
      
    </NavigationContainer>
  );
}

