import React, { useEffect, useState } from 'react';
import { FlatList, View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Pagination from './Page/Pagination';

const ITEMS_PER_PAGE = 5;

const MainBoardItem = ({ bordData }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [expandedItems, setExpandedItems] = useState([]);
  const [board, setBoard] = useState([]);

  const indexOfLastItem = currentPage * ITEMS_PER_PAGE;
  const indexOfFirstItem = indexOfLastItem - ITEMS_PER_PAGE;
  const currentItems = board.slice(indexOfFirstItem, indexOfLastItem);

  const toggleExpand = (id) => setExpandedItems((prev) => prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]);

  const handlePageChange = (newPage) => setCurrentPage(newPage);

  useEffect(() => {
    setBoard(bordData);
  }, [bordData])

  return (
    <View>
      <FlatList
        data={currentItems}
        keyExtractor={(item) => `${item.id}`} // Ensures a unique key
        renderItem={({ item }) => (
          <View style={styles.row}>
            <View style={styles.contentColumn}>
              <Text style={styles.title}>{item.Title}</Text>
              <Text numberOfLines={expandedItems.includes(item.id) ? null : 3}>
                {item.content}
              </Text>
              {item.content.length > 100 && (
                <TouchableOpacity onPress={() => toggleExpand(item.id)}>
                  <Text style={styles.moreButton}>
                    {expandedItems.includes(item.id) ? '접기' : '더 보기'}
                  </Text>
                </TouchableOpacity>
              )}
            </View>
            <View style={styles.todoColumn}>
              <Text style={styles.todo}>{item.ToDoList}</Text>
              <Text style={styles.status}>{item.상태}</Text>
            </View>
          </View>
        )}
      />
      <Pagination
        totalItems={board.length}
        itemsPerPage={ITEMS_PER_PAGE}
        onPageChange={handlePageChange}
      />
    </View>
  );
};

function getStatusColor(status) {
  switch (status) {
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
  subcontainer: {
    flexDirection: 'row', // 자식 요소들을 수평으로 배열
    justifyContent: 'space-between', // 요소들을 양쪽 끝에 정렬
    alignItems: 'center', // 요소들을 세로 방향으로 중앙에 정렬
  },
  order: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginLeft: 5,
    marginRight: 5,
  },
  title: {
    fontSize: 13,
    fontWeight: 'bold',
    flex: 1,
    textAlign: 'left', // Align text to the right
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
    marginBottom: 6,
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