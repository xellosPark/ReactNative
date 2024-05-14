import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import GoogleLikeCalendar from '../../../UserBoard/GoogleLikeCalendar'

const UserBoard = () => {
  return (
    <View style={styles.screenContainer}>
      <GoogleLikeCalendar />
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

export default UserBoard;