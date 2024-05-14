
import React, { useEffect, useState } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, Text } from 'react-native';
//import HomeScreen from './ScreenView/HomeScreen';
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
        <View>
            <Text style={{textAlign:'center'}}>main</Text>
        </View>
        
        // <UserProvider value={values}>
        // <Tab.Navigator tabBar={(props) => <TabBar {...props} />}>
        //     <Tab.Screen name="대시보드" component={HomeScreen} />
        //     <Tab.Screen name="유저보드" component={NextScreen} />
        //     <Tab.Screen name="Settings" component={SettingsScreen} />
        // </Tab.Navigator>
        // </UserProvider>
    );
};


export default MainScreen;