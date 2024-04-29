import React, { useEffect, useState } from 'react';
import { FlatList, View, Text, StyleSheet } from 'react-native';
import MainBoardItem from './MainBoardItem'; // Make sure the path is correct
import { MainBoardData } from './MainBoardData'; // Make sure the path is correct

const MainBoard = ({board}) => {
    const [data, setData] = useState([]);
    console.log("Received 7 :", board);
    const boardArray = Array.isArray(board) ? [board] : []; // board를 배열로 감싸 전달
    console.log("9 배열", boardArray);
    // const renderItem = ({item}) => {
    //     console.log('12 data :', item);
    //     if (!item.length) {
    //         console.log('12 데이터가 없습니다');
    //         return <Text>데이터가 없습니다</Text>; // 데이터가 없는 경우
    //       }
    //       console.log('17 data :', item);
    //       console.log("진행");
    //     return <MainBoardItem item={item} />
    // }
    
    useEffect(() => {
        console.log('MainBoard 진입');
        setData(board);
        console.log('23 data :', board);
        console.log('24 data :', data);
    },[board])
  
 ///renderItem={({ item }) => <MainBoardItem board={item} />}
  return (
    <FlatList
    data={board} // boardArray를 data로 전달
    keyExtractor={(item) => String(item.Index)}
    renderItem={({ item }) => <MainBoardItem item={item} />} // 각 항목을 `MainBoardItem`에 전달
    style={styles.list}
  />
  );
};

const styles = StyleSheet.create({
  list: {
    width: '100%',
  },
  // Add other styles if needed
});

export default MainBoard;