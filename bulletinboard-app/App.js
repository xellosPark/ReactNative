import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import BulletinBoard from './BulletinBoard';
import Board from './Board';
import MyComponent from './pageComponent/MyComponent';

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      {/* <BulletinBoard /> */}
      <Board />
      {/* <MyComponent/> */}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});