import React from 'react';
import { StyleSheet, SafeAreaView } from 'react-native';
import DayCalendar from './DayCalendar'; // Import the DayCalendar component
import GoogleLikeCalendar from './GoogleLikeCalendar';
import ToCalendar from './ToCalendar';

const App = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      {/* <DayCalendar/> */}
      <ToCalendar/>
      <GoogleLikeCalendar/>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
});

export default App;