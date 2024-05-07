import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const GoogleLikeCalendar = ({ cellWidth = '14.28%', cellHeight = 100 }) => {
  const [currentDate, setCurrentDate] = useState(new Date());

  const [events, setEvents] = useState([
    { date: new Date(currentDate.getFullYear(), currentDate.getMonth(), 7), color: '#CCFFCC', title: 'Event 1' },
    { date: new Date(currentDate.getFullYear(), currentDate.getMonth(), 7), color: '#CCCCFF', title: 'Event 2' },
    { date: new Date(currentDate.getFullYear(), currentDate.getMonth(), 7), color: '#CCCCFF', title: 'Event 2' },
    { date: new Date(currentDate.getFullYear(), currentDate.getMonth(), 7), color: '#CCCCFF', title: 'Event 2' },
    { date: new Date(currentDate.getFullYear(), currentDate.getMonth(), 7), color: '#CCCCFF', title: 'Event 2' },
    { date: new Date(currentDate.getFullYear(), currentDate.getMonth(), 8), color: '#FFFFCC', title: 'Event 3' },
    // Add more events as needed
  ]);

  // Compute days and the first day of the month directly in the component body
  const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay();

  // Change month
  const changeMonth = (n) => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + n));
  };

  // Calculate trailing and leading days
  const calculateTrailingDays = () => {
    const daysInLastMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 0).getDate();
    return Array.from({ length: firstDayOfMonth }, (_, i) => daysInLastMonth - i).reverse();
  };
  const trailingDays = calculateTrailingDays();
  const calculateLeadingDays = () => {
    const totalDisplayedDays = firstDayOfMonth + daysInMonth;
    return Array.from({ length: (7 - totalDisplayedDays % 7) % 7 }, (_, i) => i + 1);
  };
  const leadingDays = calculateLeadingDays();

  // Retrieve events for a specific day
  const getEventsForDay = (day) => {
    return events.filter(event => event.date.getDate() === day && event.date.getMonth() === currentDate.getMonth());
  };

  // Check if a given day is today
  const isToday = (day) => {
    const today = new Date();
    return today.getDate() === day && today.getMonth() === currentDate.getMonth() && today.getFullYear() === currentDate.getFullYear();
  };

  return (
    <ScrollView>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => changeMonth(-1)}>
          <Icon name="chevron-back" size={30} color="#e2e2e2" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{`${currentDate.getFullYear()}년 ${currentDate.getMonth() + 1}월`}</Text>
        <TouchableOpacity onPress={() => changeMonth(1)}>
          <Icon name="chevron-forward" size={30} color="#e2e2e2" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setCurrentDate(new Date())}>
          <Text style={styles.headerToday}>Today</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.calendarContainer}>
        <View style={styles.headerRow}>
          {['일', '월', '화', '수', '목', '금', '토'].map((day, index) => (
            <Text key={day} style={[styles.headerCell, { color: index === 0 ? 'red' : index === 6 ? 'blue' : 'black' }]}>{day}</Text>
          ))}
        </View>
        <View style={styles.daysContainer}>
          {trailingDays.map(day => (
            <View key={`prev-${day}`} style={[styles.dayCell, { width: cellWidth, height: cellHeight, opacity: 0.5 }]}>
              <Text style={[styles.dayNumber, { color: 'black' }]}>{day}</Text>
            </View>
          ))}
          {Array.from({ length: daysInMonth }, (_, i) => i + 1).map(day => (
            <View key={day} style={[styles.dayCell, { width: cellWidth, height: cellHeight, backgroundColor: isToday(day) ? '#FFF67E' : 'transparent' }]}>
              <Text style={[styles.dayNumber, { color: 'black' }]}>{day}</Text>
              {getEventsForDay(day).slice(0, 2).map((event, index) => (
                <View key={index} style={[styles.eventLabel, { backgroundColor: event.color }]}>
                  <Text style={styles.eventText}>{event.title}</Text>
                </View>
              ))}
              {getEventsForDay(day).length > 2 && (
                <Text style={styles.moreEventsText}>+ {getEventsForDay(day).length - 2} more</Text>
              )}
            </View>
          ))}
          {leadingDays.map(day => (
            <View key={`next-${day}`} style={[styles.dayCell, { width: cellWidth, height: cellHeight, opacity: 0.5 }]}>
              <Text style={[styles.dayNumber, { color: 'black' }]}>{day}</Text>
            </View>
          ))}
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#4A90E2'
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white'
  },
  headerToday: {
    fontSize: 14,
    fontWeight: 'bold',
    color: 'white'
  },
  calendarContainer: {
    backgroundColor: '#FFF'
  },
  headerRow: {
    flexDirection: 'row',
    backgroundColor: '#E5EDFF',
    justifyContent: 'space-between'
  },
  headerCell: {
    flex: 1,
    textAlign: 'center',
    fontWeight: 'bold'
  },
  daysContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  dayCell: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: 5,
    borderRightWidth: 1,
    borderBottomWidth: 1,
    borderColor: 'lightgrey',
    height: 100, // fixed height for consistency
    overflow: 'hidden' // keeps the cell size constant
  },
  dayNumber: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 5
  },
  eventLabel: {
    marginTop: 2,
    paddingVertical: 2,
    paddingHorizontal: 4,
    borderRadius: 4,
    marginBottom: 2
  },
  eventText: {
    color: 'black',
    fontSize: 12
  },
  moreEventsText: {
    color: 'grey',
    fontSize: 12,
    marginTop: 4
  }
});

export default GoogleLikeCalendar;