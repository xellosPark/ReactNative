import React, { useEffect, useState, useContext, useCallback } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import SubFilterView from './SubFilterView';
import SubEventView from './SubEventView';

import GetUserBoard from '../../API/GetUserBoard';
import UserContext from '../../API/UseContext/userContext';
import LoadSubBoard from '../../API/LoadSubBoard';
import { useFocusEffect } from '@react-navigation/native';

const GoogleLikeCalendar = ({ cellWidth = "14.28%", cellHeight = 110 }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [dialogVisible, setDialogVisible] = useState(false);

  const [selectedDayEvents, setSelectedDayEvents] = useState([]); // 선택된 날짜의 이벤트들을 저장할 상태
  const [showEventModal, setShowEventModal] = useState(false); // 모달 보이기/숨기기를 제어할 상태
  //const [lastTap, setLastTap] = useState(null);
  const [selectedDay, setSelectedDay] = useState(null);
  const [lastClickedDay, setLastClickedDay] = useState(null); // 마지막 클릭된 날짜를 추적하기 위한 상태

  const myData = useContext(UserContext);
  const [loadData, setLoadData] = useState([]);
  const [eventsByDay, setEventsByDay] = useState({});

  const options = [
    { label: '전체', color: '#CCFFCC', icon: 'checkmark-circle-outline' },
    { label: '대기', color: '#CCCCFF', icon: 'time-outline' },
    { label: '전행중', color: '#FFF67E', icon: 'walk-outline' },
    { label: '완료', color: '#B7E9F7', icon: 'checkmark-done-outline' },
    { label: '이슈', color: '#FFC0CB', icon: 'alert-circle-outline' },
    { label: '알림', color: '#E64F5A', icon: 'alert-circle-outline' }
  ];

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
  // const getEventsForDay = (day) => {
  //   return loadData.filter(
  //     (event) => {
  //       const data = convertDatesInData(event.date);
  //       return data.getDate() === day && data.getMonth() === currentDate.getMonth()
  //     }

  //   );
  // };

  const getEventsForDay = (year, month, day) => {
    const yearMonthKey = `${year}-${month}`;
    const eventsInMonth = eventsByDay[yearMonthKey] || {};
    return eventsInMonth[day] || [];
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

  const getColorByDay = (day) => {
    const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
    const dayOfWeek = date.getDay();
    return dayOfWeek === 0 ? "red" : dayOfWeek === 6 ? "blue" : "black";
  };

  const handleConfirm = (selectedOptions) => {
    console.log('Selected Options:', selectedOptions);
    setDialogVisible(false); // Optionally close the dialog
  };

  // 더블 클릭 처리 함수
  const handleDoubleClick = (year, month, day) => {
    const dayEvents = getEventsForDay(year, month, day);  // 특정 날짜에 대한 이벤트를 가져옵니다.
    //console.log('여기확인', dayEvents);  // 해당 날짜의 이벤트를 콘솔에 로그합니다.

    // 이벤트가 있는지 확인합니다.
    if (dayEvents.length > 0) {
      setSelectedDayEvents(dayEvents); // 선택된 날의 이벤트를 상태로 설정합니다.
      setShowEventModal(true);         // 이벤트가 있을 경우에만 모달을 표시합니다.
    } else {
      console.log('이 날에는 이벤트가 없습니다.'); // 이벤트가 없을 때 로그를 출력할 수 있습니다.
    }
  };

  const handleDayClick = (year, month, day) => {
    // 이전에 클릭된 날짜와 현재 클릭된 날짜가 같은지 확인
    if (day === lastClickedDay) {
      // 같은 날짜를 연속해서 클릭하면 더블 클릭으로 간주
      handleDoubleClick(year, month, day);
    } else {
      // 마지막 클릭된 날짜 업데이트
      setLastClickedDay(day); // 마지막 클릭된 날짜 저장
      setSelectedDay(day);    // 현재 클릭된 날짜를 선택된 날짜로 설정
    }
  };

  const convertDatesInData = (data) => {
    const parts = data.split('-');  // 날짜를 '-'로 분리
    const year = parseInt(parts[0], 10);
    const month = parseInt(parts[1], 10) - 1; // 월은 0부터 시작하므로 1을 빼줍니다.
    const day = parseInt(parts[2], 10);
    return new Date(year, month, day);  // Date 객체로 변환
  }

  const uniqueProject = async (data) => {
    const uniqueProjects = new Set();

    const processedData = data.map(item => {
      // Extract the properties you need
      const { Name, project } = item;
      return { Name, project };
    }).filter(item => {
      // Filter out duplicates based on the 'project' property
      const isDuplicate = uniqueProjects.has(item.project);
      uniqueProjects.add(item.project);
      return !isDuplicate;
    });

    //    console.log('Unique Project Data', processedData);
    return processedData;

  };

  const subLoadBoard = async (subdata) => {
    // Check if subdata is an array and has items
    if (!Array.isArray(subdata) || subdata.length === 0) {
      console.log("No subdata provided or subdata is empty");
      return [];
    }
    const results = await LoadSubBoard(subdata);
    const _Name = subdata[0].Name;
    const filteredResults = results.filter(item => item.Name === _Name);

    // Check if there are any filtered results in the first array
    const dataRows = await filteredResults.map(item => ({
      title: item.Title,
      index: item.Index,
      project: item.ProjectName,
      date: item.Date,
      Name: item.Name,
      content: item.Content,
      category: item.Status,
      color: (item.Status === '대기' ? '#CCCCFF' : item.Status === '진행중' ? '#ADD8E6' : item.Status === '완료' ? '#FFD700' : item.Status === '이슈' ? '#FFC0CB' : '#fff'),
      textColor: '#333'
    }));
    return dataRows;
  };

  useFocusEffect(
    useCallback(() => {
      const LoadUserBoard = async (data) => {
        const name = data.name;
        const mainData = await GetUserBoard(name); // main 데이터

        const project = await uniqueProject(mainData);
        const subData = await subLoadBoard(project);
        const result = [...mainData, ...subData];
        setLoadData(result);
      }

      LoadUserBoard(myData);
    }, [myData.id, myData.name])
  );


  useEffect(() => {
    const groupedEvents = {};
    loadData.forEach(event => {
      const eventDate = convertDatesInData(event.date);
      const year = eventDate.getFullYear();
      const month = eventDate.getMonth() + 1;  // JS의 getMonth()는 0부터 시작하므로 1을 더해줌
      const day = eventDate.getDate();
      const yearMonthKey = `${year}-${month}`;

      if (!groupedEvents[yearMonthKey]) {
        groupedEvents[yearMonthKey] = {};
      }
      if (!groupedEvents[yearMonthKey][day]) {
        groupedEvents[yearMonthKey][day] = [];
      }
      groupedEvents[yearMonthKey][day].push(event);
    });

    setEventsByDay(groupedEvents);
  }, [loadData])

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
        {/* <TouchableOpacity onPress={() => setDialogVisible(true)}>
          <Icon name="options-outline" size={30} color="#e2e2e2" />
        </TouchableOpacity> */}
        {/* <SubFilterView
          visible={dialogVisible}
          onClose={() => setDialogVisible(false)}
          onConfirm={handleConfirm}
          options={options}
        /> */}
        <SubEventView
          visible={showEventModal}
          events={selectedDayEvents}
          onClose={() => setShowEventModal(false)}
        />

      </View>
      <View style={styles.calendarContainer}>
        <View style={styles.headerRow}>
          {["일", "월", "화", "수", "목", "금", "토"].map((day, index) => (
            <Text key={day} style={[styles.headerCell, { color: index === 0 ? "red" : index === 6 ? "blue" : "black", },]}>
              {day}
            </Text>
          ))}
        </View>
        <View style={styles.daysContainer} >
          {trailingDays.map((day, index) => (
            <View key={`prev-${day}`} style={[styles.dayCell, { width: cellWidth, height: cellHeight, opacity: 0.5 },]}>
              <Text style={[styles.dayNumber, { color: index === 0 ? "red" : index === 6 ? "blue" : "black", },]}>
                {day}
              </Text>
            </View>
          ))}
          {Array.from({ length: daysInMonth }, (_, i) => i + 1).map((day) => (
            //<View key={day} style={[styles.dayCell,{width: cellWidth,height: cellHeight,backgroundColor: isToday(day) ? "#FFF67E" : "transparent",},]}>
            <TouchableOpacity key={day} style={[styles.dayCell, {
              width: cellWidth, height: cellHeight, backgroundColor: isToday(day) ? "#FFF67E" : "transparent",
              borderColor: selectedDay === day ? 'blue' : 'lightgrey', borderWidth: selectedDay === day ? 1 : 1,
            },]}
              onPress={() => handleDayClick(currentDate.getFullYear(), currentDate.getMonth() + 1, day)}  // 다음 달의 날짜 클릭 처리
            >
              <Text style={[styles.dayNumber, { color: getColorByDay(day) }]}>
                {day}
              </Text>
              {getEventsForDay(currentDate.getFullYear(), currentDate.getMonth() + 1, day)
                .slice(0, 2)
                .map((event, index) => (
                  <View key={index} style={[styles.eventLabel, { backgroundColor: event.color },]}>
                    <Text style={styles.eventText}>{event.title.length > 15 ? event.title.slice(0, 15) + "..." : event.title}</Text>
                  </View>
                ))}
              {getEventsForDay(currentDate.getFullYear(), currentDate.getMonth() + 1, day).length > 2 && (
                <Text style={styles.moreEventsText}> + {getEventsForDay(currentDate.getFullYear(), currentDate.getMonth() + 1, day).length - 2} more </Text>
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

    justifyContent: 'center',
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
    fontSize: 9
  },
  moreEventsText: {
    color: 'grey',
    fontSize: 12,
    marginTop: 4
  }
});

export default GoogleLikeCalendar;