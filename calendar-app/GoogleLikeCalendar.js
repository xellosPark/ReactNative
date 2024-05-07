import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const GoogleLikeCalendar = ({ cellWidth = '14.28%', cellHeight = 100 }) => {
  const [currentDate, setCurrentDate] = useState(new Date());

  // 해당 월의 일수를 반환하는 함수
  const getDaysInMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  // 해당 월의 시작 요일을 반환하는 함수
  const getFirstDayOfMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  // 이전 또는 다음 달로 이동하는 함수
  const changeMonth = (n) => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + n));
  };

  // 전달 날짜를 계산하는 함수
  const calculateTrailingDays = () => {
    const firstDayOfMonth = getFirstDayOfMonth(currentDate);
    const daysInLastMonth = getDaysInMonth(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
    return Array.from({ length: firstDayOfMonth }, (_, i) => daysInLastMonth - i).reverse();
  };

  // 다음달 날짜를 계산하는 함수
  const calculateLeadingDays = (daysInMonth, firstDayOfMonth) => {
    const totalDisplayedDays = firstDayOfMonth + daysInMonth;
    return Array.from({ length: (7 - totalDisplayedDays % 7) % 7 }, (_, i) => i + 1);
  };

  const daysInMonth = getDaysInMonth(currentDate);
  const firstDayOfMonth = getFirstDayOfMonth(currentDate);
  const trailingDays = calculateTrailingDays();
  const leadingDays = calculateLeadingDays(daysInMonth, firstDayOfMonth);

  const today = new Date();
  const isToday = (day) => {
    return currentDate.getMonth() === today.getMonth() &&
           currentDate.getFullYear() === today.getFullYear() &&
           day === today.getDate();
  };

  // 요일에 따라 텍스트 색상을 결정하는 함수
  const getColorByDay = (date) => {
    const dayOfWeek = new Date(currentDate.getFullYear(), currentDate.getMonth(), date).getDay();
    if (dayOfWeek === 0) { // 일요일
      return 'red';
    } else if (dayOfWeek === 6) { // 토요일
      return 'blue';
    }
    return 'black'; // 평일
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
      </View>
      <View style={styles.calendarContainer}>
        <View style={styles.headerRow}>
          {['일', '월', '화', '수', '목', '금', '토'].map(day => (
            <Text key={day} style={styles.headerCell}>{day}</Text>
          ))}
        </View>
        <View style={styles.daysContainer}>
          {trailingDays.map(day => (
            <View key={`prev-${day}`} style={[styles.dayCell, { width: cellWidth, height: cellHeight, opacity: 0.5 }]}>
              <Text style={[styles.dayNumber, { color: getColorByDay(day - trailingDays.length + 1) }]}>{day}</Text>
            </View>
          ))}
          {Array.from({ length: daysInMonth }, (_, i) => i + 1).map(day => (
            <View key={day} style={[styles.dayCell, { width: cellWidth, height: cellHeight, backgroundColor: isToday(day) ? '#FFF67E' : 'transparent' }]}>
              <Text style={[styles.dayNumber, { color: getColorByDay(day) }]}>{day}</Text>
            </View>
          ))}
          {leadingDays.map(day => (
            <View key={`next-${day}`} style={[styles.dayCell, { width: cellWidth, height: cellHeight, opacity: 0.5 }]}>
              <Text style={[styles.dayNumber, { color: getColorByDay(day) }]}>{day}</Text>
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
    borderColor: 'lightgrey'
  },
  dayNumber: {
    padding: 2,
    fontWeight: 'bold',
    fontSize: 16,
  }
});

export default GoogleLikeCalendar;