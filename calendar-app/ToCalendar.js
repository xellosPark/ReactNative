import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Calendar } from 'react-native-calendars';

const FinanceCalendar = () => {
  const markedDates = {
    '2024-04-05': { marked: true, dotColor: 'red', activeOpacity: 0 },
    '2024-04-06': { marked: true, dotColor: 'green', activeOpacity: 0 },
    '2024-04-13': { marked: true, dotColor: 'red', activeOpacity: 0 },
    '2024-04-20': { marked: true, dotColor: 'green', activeOpacity: 0 }
  };

  return (
    <View style={styles.container}>
      <Calendar
        // Other calendar props
        markingType={'multi-dot'}
        markedDates={markedDates}
        theme={{
          calendarBackground: '#ffffff',
          textSectionTitleColor: '#b6c1cd',
          selectedDayBackgroundColor: '#00adf5',
          selectedDayTextColor: '#ffffff',
          todayTextColor: '#ff0000',
          dayTextColor: '#2d4150',
          textDisabledColor: '#d9e1e8',
          dotColor: '#00adf5',
          selectedDotColor: '#ffffff',
          arrowColor: 'orange',
          monthTextColor: 'blue',
          textDayFontWeight: '300',
          textMonthFontWeight: 'bold',
          textDayHeaderFontWeight: '300',
          textDayFontSize: 16,
          textMonthFontSize: 16,
          textDayHeaderFontSize: 16
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 50,
    backgroundColor: '#fff'
  }
});

export default FinanceCalendar;