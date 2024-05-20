import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, ScrollView, TouchableOpacity } from 'react-native';
  
  const colorStep = ['#ccccff', '#ADD8E6', '#FFD700', '#ffccff', '#E64F5A', ];

const BoardState = ({board, setFilterName}) => {
  const [tabStep, setTabStep] = useState([]);
  const [tabData, setTabData] = useState([]);

  const loadStep = async (board) => {
    // board가 undefined인 경우를 처리:
    if (!board) {
      console.error('Board 데이터가 정의되지 않았습니다.');
      await setTabStep([]);  // 선택적으로 빈 상태 또는 기본 상태 설정
      return;  // 함수의 추가 실행을 방지하기 위해 조기에 함수 종료
    }

    const total = {
      title: '전체',
      value: board.length,
      color: '#ccffcc'
    }

    //****reduce 함수를 사용하면 배열의 각 요소를 순회하며 누적 계산을 실행
    const counts = board.reduce((acc, item) => { 
      // Status 값이 null 또는 undefined일 경우를 대비하여 기본값을 설정
      // details가 존재하고, 그 안에 요소가 있을 경우 details의 마지막 요소의 Status를 사용
    const statusFromDetails = item.details && item.details.length > 0
    ? item.details[item.details.length - 1].Status : null;

    const statusKey = (statusFromDetails || item.Status || '').toLowerCase();
      acc.total += 1; // 전체 개수
      if (statusKey) { // statusKey가 빈 문자열이 아닐 경우에만 개수 증가
        acc[statusKey] = (acc[statusKey] || 0) + 1;
      }
      return acc;
    }, { 대기: 0, 진행중: 0, 완료: 0, 이슈: 0, 알림: 0 });

    // 상태별 개수를 기반으로 newTable 생성
    const title = ['대기', '진행중', '완료', '이슈', '알림'];
    const newTable = title.map((status, index) => ({
      title: status,
      key: index,
      // statusKey가 빈 문자열인 경우(예: Status가 null) 0을 기본값으로 사용
      value: counts[status.toLowerCase()] || 0,
      color: colorStep[index],
    }));

    const resultData = [total, ...newTable];
    await setTabStep(resultData);
  };

  const loadTap = async (board) => {
    
    // 중복 제거하여 탭 생성 및 'To Day'를 제외한 나머지 탭의 데이터 처리
    const tabData = board.reduce((acc, { Name }, index) => {
      // 탭이 이미 존재하면 해당 탭의 아이템 개수를 증가, 아니면 탭 추가
      if (!acc.find(tab => tab.originalName === Name)) {
        acc.push({
          key: index,
          originalName: Name,  // 원본 Name 저장
          title: Name.length >= 4 ? `${Name.slice(0, 2)}...` : Name,
          //pm: pm === Name ? true : false,
          value: board.filter(item => item.Name === Name).length,
          color: '#A7CCCB', // 모든 탭에 대해 동일한 색상 사용
        });
      }
      return acc;
    }, []); // 'To Day' 카드를 초기값으로 설정

    const resultData = [...tabData];
    await setTabData(resultData);
  };

  const handlePress = (item) => {
    setFilterName(item.title);
  }

  useEffect(() => {
    setTabStep([]);
    setTabData([]);
    
    loadStep(board);
    loadTap(board);
  }, [board]);

  return (
    <View style={styles.container}>
      <ScrollView horizontal style={styles.auxScroll} contentContainerStyle={styles.centerContent}>
        {tabStep.map((item) => (
          <TouchableOpacity key={item.key} onPress={() => handlePress(item)}>
          <View
            key={item.key}
            style={[styles.itemContainer, { backgroundColor: item.color }]}
          >
            <Text style={styles.auxTitle}>{item.title}</Text>
            <Text style={styles.auxValue}>{item.value}</Text>
          </View>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <ScrollView horizontal style={[styles.auxScroll, styles.auxRow2]} contentContainerStyle={styles.leftContent}>
          {tabData.map(item => (
            <View key={item.key} style={[styles.itemContainer, { backgroundColor: '#A7CCCB' }]}>
              <Text style={styles.auxTitle}>{item.title}</Text>
              <Text style={styles.auxValue}>{item.value}</Text>
            </View>
            
          ))}
       </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
     justifyContent: 'center', // 세로 중앙 정렬
      alignItems: 'center', // 가로 중앙 정렬
      marginLeft: 13, // 주변 마진 추가
      marginRight: 13,
      marginBottom: 5,
      borderWidth: 2, // 테두리 두께
      borderColor: '#E2E2E2', // 테두리 색상
      borderRadius: 10, // 테두리 둥글게
      padding: 5, // 내부 여백
      backgroundColor: '#F0F4FD', // 배경 색
      //backgroundColor: '#FDF4A8', // 배경 색
      
    },
    auxScroll: {
    },
    centerContent: {
        flexGrow: 1,
        justifyContent: 'flex-start',  // Centers items within the scroll view.
    },
    leftContent: {
      flexGrow: 1,
      justifyContent: 'flex-start',  // Centers items within the scroll view.
  },
    itemContainer: {
      margin: 1, // Ensures 1mm spacing between items.
      borderRadius: 10,
      borderWidth: 1,
      borderColor: '#ccc',
      minWidth: 60,
      padding: 10,
      justifyContent: 'center',  // Centers content vertically.
      alignItems: 'center',       // Centers content horizontally.
    },
    auxTitle: {
      fontWeight: 'bold',
      fontSize: 13,
    },
    auxDivider: {
      fontSize: 12,
      color: '#555',
    },
    auxValue: {
      fontSize: 11,
    },
    auxRow2: {
        marginTop: 0, // Ensures no spacing between rows.
        
    },
  });

  export default BoardState