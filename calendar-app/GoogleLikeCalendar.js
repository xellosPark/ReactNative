import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import SubFilterView from './SubFilterView'; 
import SubEventView from './SubEventView';

const GoogleLikeCalendar = ({ cellWidth = "14.28%", cellHeight = 90 }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [dialogVisible, setDialogVisible] = useState(false);

  const [selectedDayEvents, setSelectedDayEvents] = useState([]); // 선택된 날짜의 이벤트들을 저장할 상태
  const [showEventModal, setShowEventModal] = useState(false); // 모달 보이기/숨기기를 제어할 상태
  
  // Enhanced event structure
  const [events, setEvents] = useState([
    { date: new Date(2024, 4, 7), color: "#CCFFCC", title: "Event 1" },
    { date: new Date(2024, 4, 7), color: "#CCCCFF", title: "Event 2" },
    { date: new Date(2024, 4, 7), color: "#CCCCFF", title: "Event 2" },
    { date: new Date(2024, 4, 7), color: "#CCCCFF", title: "Event 2" },
    { date: new Date(2024, 4, 8), color: "#CCCCFF", title: "Event 2" },
    { date: new Date(2024, 4, 8), color: "#FFFFCC", title: "Event 3" },
    // Add more events as needed
  ]);

  // 현재 달의 일수와 첫 번째 요일을 계산합니다.
  const daysInMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() + 1,
    0
  ).getDate();
  const firstDayOfMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    1
  ).getDay();

  // 다음 또는 이전 달로 넘어가는 함수입니다.
  const changeMonth = (n) => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() + n)
    );
  };

  // 이전 달의 마지막 일부 날짜를 계산합니다.
  const calculateTrailingDays = () => {
    const daysInLastMonth = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      0
    ).getDate();
    return Array.from(
      { length: firstDayOfMonth },
      (_, i) => daysInLastMonth - i
    ).reverse();
  };
  const trailingDays = calculateTrailingDays();

  // 다음 달의 시작 일부 날짜를 계산합니다.
  const calculateLeadingDays = () => {
    const totalDisplayedDays = firstDayOfMonth + daysInMonth;
    return Array.from(
      { length: (7 - (totalDisplayedDays % 7)) % 7 },
      (_, i) => i + 1
    );
  };
  const leadingDays = calculateLeadingDays();

  // 특정 날짜의 이벤트를 검색합니다.
  const getEventsForDay = (day) => {
    return events.filter(
      (event) =>
        event.date.getDate() === day &&
        event.date.getMonth() === currentDate.getMonth()
    );
  };

  // 오늘 날짜인지 확인합니다.
  const isToday = (day) => {
    const today = new Date();
    return (
      today.getDate() === day &&
      today.getMonth() === currentDate.getMonth() &&
      today.getFullYear() === currentDate.getFullYear()
    );
  };

  // 요일에 따라 색상을 결정합니다. 일요일은 빨간색, 토요일은 파란색으로 표시합니다.
  const getColorByDay = (day) => {
    const date = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      day
    );
    const dayOfWeek = date.getDay();

    if (dayOfWeek === 0) {
      return "red"; // 일요일
    } else if (dayOfWeek === 6) {
      return "blue"; // 토요일
    }
    return "black"; // 평일
  };


  const options = [
    { label: '전체', color: '#CCFFCC', icon: 'checkmark-circle-outline'},
    { label: '대기', color: '#CCCCFF', icon: 'time-outline'},
    { label: '전행중', color: '#FFF67E',icon: 'walk-outline'},
    { label: '완료', color: '#B7E9F7',icon: 'checkmark-done-outline'},
    { label: '이슈', color: '#FFC0CB',  icon: 'alert-circle-outline'},
    { label: '알림', color: '#E64F5A', icon: 'alert-circle-outline'}
  ];

  const handleConfirm = (selectedOptions) => {
    console.log('Selected Options:', selectedOptions);
    setDialogVisible(false); // Optionally close the dialog
  };

  const handleDayClick = (day) => {
    const dayEvents = getEventsForDay(day);  // 특정 날짜에 대한 이벤트를 가져옵니다.
    console.log('여기확인', dayEvents);  // 해당 날짜의 이벤트를 콘솔에 로그합니다.
  
    // 이벤트가 있는지 확인합니다.
    if (dayEvents.length > 0) {
      
      setSelectedDayEvents(dayEvents); // 선택된 날의 이벤트를 상태로 설정합니다.
      setShowEventModal(true);         // 이벤트가 있을 경우에만 모달을 표시합니다.
    } else {
      console.log('이 날에는 이벤트가 없습니다.'); // 이벤트가 없을 때 로그를 출력할 수 있습니다.
    }
  };
  return (
    <ScrollView contentContainerStyle={styles.scrollViewContent}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => changeMonth(-1)}>
          <Icon name="chevron-back" size={30} color="#e2e2e2" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>
          {`${currentDate.getFullYear()}년 ${currentDate.getMonth() + 1}월`}
        </Text>
        <TouchableOpacity onPress={() => changeMonth(1)}>
          <Icon name="chevron-forward" size={30} color="#e2e2e2" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setCurrentDate(new Date())}>
          <Text style={styles.headerToday}>Today</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setDialogVisible(true)}>
          <Icon name="options-outline" size={30} color="#e2e2e2" />
        </TouchableOpacity>
        <SubFilterView
          visible={dialogVisible}
          onClose={() => setDialogVisible(false)}
          onConfirm={handleConfirm} 
          options={options}
        />
        <SubEventView
          visible={showEventModal}
          events={selectedDayEvents}
          onClose={() => setShowEventModal(false)}
        />
                
      </View>
      <View style={styles.calendarContainer}>
        <View style={styles.headerRow}>
          {["일", "월", "화", "수", "목", "금", "토"].map((day, index) => (
            <Text key={day} style={[styles.headerCell,{color: index === 0 ? "red" : index === 6 ? "blue" : "black",},]}>
              {day}
            </Text>
          ))}
        </View>
        <View style={styles.daysContainer} >
          {trailingDays.map((day, index) => (
            <View key={`prev-${day}`} style={[ styles.dayCell,{ width: cellWidth, height: cellHeight, opacity: 0.5 },]}>
              <Text style={[ styles.dayNumber,{color: index === 0 ? "red" : index === 6 ? "blue" : "black",},]}>
                {day}
              </Text>
            </View>
          ))}
          {Array.from({ length: daysInMonth }, (_, i) => i + 1).map((day) => (
            //<View key={day} style={[styles.dayCell,{width: cellWidth,height: cellHeight,backgroundColor: isToday(day) ? "#FFF67E" : "transparent",},]}>
            
            <TouchableOpacity key={day} style={[styles.dayCell,{width: cellWidth,height: cellHeight,backgroundColor: isToday(day) ? "#FFF67E" : "transparent",},]}
              onPress={() => handleDayClick(day)}  // 다음 달의 날짜 클릭 처리
            >
              <Text style={[styles.dayNumber, { color: getColorByDay(day) }]}>
                {day}
              </Text>
                {getEventsForDay(day)
                .slice(0, 2)
                .map((event, index) => (
                  <View key={index} style={[ styles.eventLabel, { backgroundColor: event.color },]}>
                    <Text style={styles.eventText}>{event.title}</Text>
                  </View>
                ))}
                {getEventsForDay(day).length > 2 && (
                <Text style={styles.moreEventsText}> + {getEventsForDay(day).length - 2} more </Text>
              )}
            </TouchableOpacity>
          ))}
          {leadingDays.map((day, index) => (
            <View
              key={`next-${day}`}
              style={[
                styles.dayCell,
                { width: cellWidth, height: cellHeight, opacity: 0.5 },
              ]}
            >
              <Text
                style={[
                  styles.dayNumber,
                  {
                    color: index === leadingDays.length - 1 ? "blue" : "black",
                  },
                ]}
              >
              {day}
              </Text>
            </View>
          ))}
        </View>
      </View>
      
    </ScrollView>
  );
};

const styles = StyleSheet.create({

  scrollViewContent: {
    flexGrow: 1,
    justifyContent: 'center'
  },
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
    marginTop: 1,
    paddingVertical: 1,
    paddingHorizontal: 6,
    borderRadius: 5,
    marginBottom: 1
  },
  eventText: {
    color: 'black',
    fontSize: 11
  },
  moreEventsText: {
    color: 'grey',
    fontSize: 12,
    marginTop: 4
  }
});

export default GoogleLikeCalendar;