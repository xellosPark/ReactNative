import React, { useState, useEffect } from 'react';
import { StyleSheet, SafeAreaView } from 'react-native';
import { Calendar, LocaleConfig } from 'react-native-calendars';

LocaleConfig.locales['kr'] = {
  monthNames: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
  monthNamesShort: ['1.', '2.', '3.', '4.', '5.', '6.', '7.', '8.', '9.', '10.', '11.', '12.'],
  dayNames: ['일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일'],
  dayNamesShort: ['일', '월', '화', '수', '목', '금', '토']
};
LocaleConfig.defaultLocale = 'kr';

const DayCalendar = () => {
  const [markedDates, setMarkedDates] = useState({});

  const getDaysInMonth = async (month, year) => {
    let pivot = new Date(year, month, 1); // 시작 날짜를 해당 월의 첫째 날로 설정합니다.
    const days = {};
    const specialDate = '2024-05-07'; // 특별한 날짜를 문자열로 지정합니다.

    while (pivot.getMonth() === month) {
        const date = pivot.getDate();
        const day = pivot.getDay();
        const dateString = pivot.toISOString().split("T")[0]; // 날짜를 문자열로 변환합니다.

        // 일반적인 날과 특별한 날에 적용할 스타일을 초기화합니다.
        days[dateString] = {
            customStyles: {
                container: {},
                text: {}
            }
        };

        if (day === 0) { // 일요일인 경우
            days[dateString].customStyles.text.color = '#E64F5A'; // 일요일은 빨간색으로 표시합니다.
            console.log("일요일 적용:", dateString);
        }
        if (day === 6) { // 토요일인 경우
            days[dateString].customStyles.text.color = 'blue'; // 토요일은 파란색으로 표시합니다.
            console.log("토요일 적용:", dateString);
        }

        // 특별한 날에 대한 스타일을 적용합니다.
        if (dateString === specialDate) {
            days[dateString].customStyles.container.backgroundColor = '#ccccff'; // 민트색 배경
            days[dateString].customStyles.text.color = 'white'; // 검정색 텍스트
            console.log("특별 날짜 스타일 적용:", dateString); // 로그를 찍어 확인합니다.
        }

        pivot.setDate(date + 1); // 다음 날로 날짜를 증가시킵니다.
    }
    return days;
};
  useEffect(() => {
    const loadDates = async () => {
      const today = new Date();
      const days = await getDaysInMonth(today.getMonth(), today.getFullYear());
      setMarkedDates(days);
    };
    loadDates();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Calendar
        current={'2024-05-01'}
        minDate={'2022-01-01'}
        maxDate={'2035-12-31'}
        onMonthChange={async (month) => {
          const days = await getDaysInMonth(month.month - 1, month.year);
          setMarkedDates(days);
        }}
        markingType={'custom'}
        markedDates={markedDates}
      />
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

export default DayCalendar;