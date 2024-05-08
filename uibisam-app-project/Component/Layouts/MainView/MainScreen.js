
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from './ScreenView/HomeScreen';
import NextScreen from './ScreenView/NextScreen';
import SettingsScreen from './ScreenView/SettingsScreen';
import TabBar from '../TabBar/TabBar';

const Tab = createBottomTabNavigator();

const MainScreen = () => {
    return (
        <Tab.Navigator tabBar={(props) => <TabBar {...props} />}>
            <Tab.Screen name="Board" component={HomeScreen} />
            <Tab.Screen name="Next" component={NextScreen} />
            <Tab.Screen name="Settings" component={SettingsScreen} />
        </Tab.Navigator>
    );
};


export default MainScreen;