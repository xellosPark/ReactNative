import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import UbisamSplashScreen from './Ubisam_Splash';

import LogInView from './Component/UnitLogin/LogInView';
import MainScreen from './Component/Layouts/MainView/MainScreen';


const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Splash">
        <Stack.Screen name="Splash" component={UbisamSplashScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Login" component={LogInView} options={{ headerShown: false }} />
        <Stack.Screen 
          name="Ubisam" 
          component={MainScreen} 
          options={{
            headerShown: false, // Do not show the header
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;

