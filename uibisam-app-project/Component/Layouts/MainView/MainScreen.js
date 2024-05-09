
import React, { useEffect, useState } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from './ScreenView/HomeScreen';
import NextScreen from './ScreenView/NextScreen';
import SettingsScreen from './ScreenView/SettingsScreen';
import TabBar from '../TabBar/TabBar';
import { UserProvider } from '../../../API/UseContext/userContext';
const Tab = createBottomTabNavigator();

const MainScreen = () => {
    const [id, setId] = useState('');
    const [name, setName] = useState('');

    const setValue = (val) => {
        setId(val.id);
        setName(val.name);
    }

    const values = {
        id,
        name,
        setValue,
    };

    return (
        <UserProvider value={values}>
        <Tab.Navigator tabBar={(props) => <TabBar {...props} />}>
            <Tab.Screen name="Board" component={HomeScreen} />
            <Tab.Screen name="Next" component={NextScreen} />
            <Tab.Screen name="Settings" component={SettingsScreen} />
        </Tab.Navigator>
        </UserProvider>
    );
};


export default MainScreen;