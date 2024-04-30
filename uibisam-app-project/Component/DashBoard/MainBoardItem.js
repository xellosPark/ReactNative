import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const MainBoardItem = ({ item }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [data, setData] = useState([]);
//   setData(board);

//   console.log('MainBoardItem 진입 10');
  const toggleNumberOfLines = () => {
    console.log('MainBoardItem 10');
    setData(item);
    console.log('MainBoardItem 12');
    setIsExpanded(!isExpanded); // Toggle the state to expand or collapse the text
  };

  const truncateText = (text, maxLength = 20) => {
    if (text.length > maxLength) {
      return text.slice(0, maxLength) + '...'; // 최대 글자 수까지 자르고 '...' 추가
    }
    return text; // 글자 수 제한 내라면 그대로 반환
  };

  useEffect(() => {
    console.log("Load Board 14", item); // 올바르게 출력되는지 확인
    if (!item) {
        console.log('데이터 없음');
        return;
      }
    setData(item);
  }, [item])
  
  console.log("26 Current data:", data); // 현재 data 확인

  return (
     <View style={styles.item}>
       {/* <Text style={styles.id}>{item.id}</Text> */}
       <View style={styles.header}>
         <Text style={styles.order}>{item.Index}</Text>
         <Text style={styles.title}>{truncateText(item.Title)}</Text>
         <Text style={styles.status(item.Status)}>{data.Status}</Text>
       </View>
       <View style={styles.container}>
         <Text style={styles.date}>{item.Name}</Text>
         <Text style={styles.date}>{item.Date}</Text>
       </View>
       <Text 
         style={styles.content} 
         numberOfLines={isExpanded ? 0 : 2} // Show all lines if expanded, else show 2
       >
         {item.Content}
       </Text>
       {/* "더 보기" (read more) button */}
       
         <TouchableOpacity onPress={toggleNumberOfLines}>
           <Text style={styles.moreButton}>
             {isExpanded ? '접기' : '더 보기'} {/* "더 보기" for more, "접기" for less */}
           </Text>
         </TouchableOpacity>
     </View>
  );
};

function getStatusColor(status) {
    switch(status) {
      case '대기':
        return '#CCCCFF'; // 대기 상태일 때 파란색
      case '진행중':
        return '#ADD8E6'; // 진행중 상태일 때 주황색
      case '완료':
        return '#FFD700'; // 완료 상태일 때 녹색
      case '이슈':
        return '#FFC0CB'; // 이슈가 있을 때 빨간색
      default:
        return '#CCCCFF'; // 기본 색상
    }
  }

const styles = StyleSheet.create({
    item: {
      backgroundColor: '#fff',
      padding: 20,
      borderBottomWidth: 1,
      borderBottomColor: '#eee',
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 4,
    },
    container: {
        flexDirection: 'row', // 자식 요소들을 수평으로 배열
    justifyContent: 'space-between', // 요소들을 양쪽 끝에 정렬
    alignItems: 'center', // 요소들을 세로 방향으로 중앙에 정렬
      },
    order: {
      fontSize: 16,
      fontWeight: 'bold',
      color: '#333',
    },
    title: {
      fontSize: 13,
      fontWeight: 'bold',
      flex: 1,
      textAlign: 'center', // Align text to the right
      marginLeft: 10, // Add some space between the order and title
    },
    status: (status) => ({
            fontWeight: 'bold',
            backgroundColor: getStatusColor(status), // 동적 색상 할당
            color: '#222',
            padding: 8,
            borderRadius: 10,
        })
    ,
    date: {
      fontSize: 12,
      color: '#666',
      marginBottom: 8,
    },
    content: {
      fontSize: 14,
    },
    collapsedContent: {
      overflow: 'hidden',
    },
    expandedContent: {
      overflow: 'visible',
    },
    moreButton: {
      fontWeight: 'bold',
      color: '#1E90FF',
      marginTop: 5,
    },
  });

export default MainBoardItem;