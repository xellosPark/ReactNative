import React from 'react';
import { View, Text, StyleSheet, FlatList, ScrollView } from 'react-native';

const data1 = [
    { id: "1", title: "전체", value: "25", color: "#ccffcc" },
    { id: "2", title: "대기", value: "5", color: "#ccccff" },
    { id: "3", title: "진행중", value: "4", color: "#ADD8E6" },
    { id: "4", title: "완료", value: "16", color: "#FFD700" },
    { id: "5", title: "이슈", value: "0", color: "#ffccff" },
    { id: "6", title: "알림", value: "2", color: "#E64F5A" },
  ];
  

const BoardState = () => {
  return (
    <View style={styles.container}>
      <ScrollView horizontal style={styles.auxScroll} contentContainerStyle={styles.centerContent}>
        {data1.map((item) => (
          <View
            key={item.id}
            style={[styles.itemContainer, { backgroundColor: item.color }]}
          >
            <Text style={styles.auxTitle}>{item.title}</Text>
            <Text style={styles.auxDivider}>------</Text>
            <Text style={styles.auxValue}>{item.value}</Text>
          </View>
        ))}
      </ScrollView>

      <ScrollView horizontal style={[styles.auxScroll, styles.auxRow2]} contentContainerStyle={styles.centerContent}>
          {data1.map(item => (
            <View key={item.id} style={[styles.itemContainer, { backgroundColor: '#A7CCCB' }]}>
              <Text style={styles.auxTitle}>{item.title}</Text>
              <Text style={styles.auxDivider}>------</Text>
              <Text style={styles.auxValue}>{item.value}</Text>
            </View>
          ))}
       </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
     height: 140,
     justifyContent: 'center', // 세로 중앙 정렬
      alignItems: 'center', // 가로 중앙 정렬
      margin: 10, // 주변 마진 추가
      borderWidth: 2, // 테두리 두께
      borderColor: '#E2E2E2', // 테두리 색상
      borderRadius: 10, // 테두리 둥글게
      padding: 5, // 내부 여백
      backgroundColor: '#F0F4FD', // 배경 색
      //backgroundColor: '#FDF4A8', // 배경 색
      
    },
    auxScroll: {
      width: '100%',
      height: 65,
    },
    centerContent: {
        flexGrow: 1,
        justifyContent: 'center',  // Centers items within the scroll view.
    },
    itemContainer: {
      margin: 1, // Ensures 1mm spacing between items.
      padding: 10,
      borderRadius: 10,
      borderWidth: 1,
      borderColor: '#ccc',
      width: 60,
      height: 60,
      justifyContent: 'center',  // Centers content vertically.
      alignItems: 'center',       // Centers content horizontally.
    },
    auxTitle: {
      fontWeight: 'bold',
      fontSize: 13,
    },
    auxDivider: {
      fontSize: 10,
      color: '#555',
    },
    auxValue: {
      fontSize: 13,
    },
    auxRow2: {
        marginTop: 0, // Ensures no spacing between rows.
    },
  });

  export default BoardState