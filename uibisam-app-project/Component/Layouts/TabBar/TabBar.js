import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';

const TabBar = ({ state, descriptors, navigation }) => {
    return (
        <View style={styles.tabBar}>
            {state.routes.map((route, index) => {
                const { options } = descriptors[route.key];
                const label = route.name;
                const isFocused = state.index === index;

                console.log(`Route name: ${label}, Index: ${index}`);

                // Log the options for the current route        
                console.log(`Options for ${label}:`, options);

                // Log focus status of the current route
                console.log(`Is ${label} focused?`, isFocused);

                const onPress = () => {
                    const event = navigation.emit({
                        type: 'tabPress',
                        target: route.key,
                        canPreventDefault: true,
                    });
                    if (!isFocused && !event.defaultPrevented) {
                        navigation.navigate(route.name);
                    }
                };

                return (
                    <TouchableOpacity
                        key={label}
                        onPress={onPress}
                        style={styles.tabButton}
                    >
                        <Text style={{ color: isFocused ? '#007AFF' : '#222' }}>
                            {label}
                        </Text>
                    </TouchableOpacity>
                );
            })}
        </View>
    );
};

const styles = StyleSheet.create({
    tabBar: {
        flexDirection: 'row',
        height: 60,
        backgroundColor: '#FFF',
        borderTopWidth: 1,
        borderTopColor: '#EFEFEF',
        justifyContent: 'space-around',
        alignItems: 'center',
        paddingBottom: 10, // adjust for iPhone X and similar models
    },
    tabButton: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
    },
});

export default TabBar;