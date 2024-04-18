import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const SettingsScreen = () => {
  return (
    <View style={styles.screenContainer}>
      <Text>Settings Screen</Text>
    </View>
  );
};

const styles = StyleSheet.create({
    screenContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default SettingsScreen;