import * as React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';

function ProjectScreen({ route }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>{route.params.name}</Text>
    </View>
  );
}

const Drawer = createDrawerNavigator();

function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="Project1">
        <Drawer.Screen 
          name="Project1" 
          component={ProjectScreen} 
          initialParams={{ name: '프로젝트 1' }} 
        />
        <Drawer.Screen 
          name="Project2" 
          component={ProjectScreen} 
          initialParams={{ name: '프로젝트 2' }} 
        />
        <Drawer.Screen 
          name="Project3" 
          component={ProjectScreen} 
          initialParams={{ name: '프로젝트 3' }} 
        />
        <Drawer.Screen 
          name="Project4" 
          component={ProjectScreen} 
          initialParams={{ name: '프로젝트 4' }} 
        />
        <Drawer.Screen 
          name="Project5" 
          component={ProjectScreen} 
          initialParams={{ name: '프로젝트 5' }} 
        />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

export default App;