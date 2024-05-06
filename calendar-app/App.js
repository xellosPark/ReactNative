import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import { Calendar } from 'react-native-calendars';

const App = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Calendar
        // 초기에 보이는 달. 기본값 = 현재
        current={'2024-05-01'}
        // 선택 가능한 최소 날짜, minDate 이전의 날짜들은 회색으로 표시됩니다. 기본값 = undefined
        minDate={'2022-01-01'}
        // 선택 가능한 최대 날짜, maxDate 이후의 날짜들은 회색으로 표시됩니다. 기본값 = undefined
        maxDate={'2024-12-31'}
        // 날짜를 선택했을 때 실행되는 함수. 기본값 = undefined
        onDayPress={(day) => {
          console.log('선택된 날짜', day);
        }}
        // 달력 제목에 표시되는 달의 형식. 형식 지정 값: http://arshaw.com/xdate/#Formatting
        monthFormat={'yyyy MM'}
        // 달을 넘기는 화살표를 표시하지 않습니다
        hideArrows={false}
        // 추가 날짜를 표시하지 않습니다
        hideExtraDays={true}
        // 지정된 날짜에 표시 표시기 점을 표시합니다
        markedDates={{
          '2024-05-16': {selected: true, marked: true},
          '2024-05-17': {marked: true},
          '2024-05-18': {disabled: true}
        }}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
});

export default App;