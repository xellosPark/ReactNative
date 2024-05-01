import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import Pagination from './Pagination'; // Ensure this import works

// Sample data
const data = Array.from({ length: 30 }, (_, i) => (
  {
    id: i + 1,
    content: `In the morning, I was recommended a school that driving students no longer attend. Your favorite snack is on the menu today.`,
    등록날짜: new Date(2024, 3, 21 + i).toISOString().split('T')[0],
    변경날짜: new Date(2024, 3, 23 + i).toISOString().split('T')[0],
    이름: `Name ${i + 1}`,
    Title: `Title ${i + 1} - Placeholder text.`,
    ToDoList: `${new Date(2024, 3, 22 + i).toISOString().split('T')[0]} - Test ${i + 1}`,
    상태: i % 2 == 0 ? '진행중' : '완료', // Sample status based on even/odd
  }
));

const ITEMS_PER_PAGE = 5;

const MyComponent = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [expandedItems, setExpandedItems] = useState([]);

  const indexOfLastItem = currentPage * ITEMS_PER_PAGE;
  const indexOfFirstItem = indexOfLastItem - ITEMS_PER_PAGE;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

  const toggleExpand = (id) => setExpandedItems((prev) => prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]);

  const handlePageChange = (newPage) => setCurrentPage(newPage);

  return (
    <View>
      <FlatList
        data={currentItems}
        keyExtractor={(item) => `${item.id}`} // Ensures a unique key
        renderItem={({ item }) => (
          <View style={styles.row}>
            <View style={styles.contentColumn}>
              <Text style={styles.title}>{item.Title}</Text>
              <Text numberOfLines={expandedItems.includes(item.id) ? null : 1}>
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
        totalItems={data.length}
        itemsPerPage={ITEMS_PER_PAGE}
        onPageChange={handlePageChange}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: 'grey',
    padding: 10,
  },
  contentColumn: {
    flex: 3,
  },
  todoColumn: {
    flex: 2,
    alignItems: 'flex-end',
  },
  title: {
    fontWeight: 'bold',
  },
  moreButton: {
    color: 'blue',
  },
  todo: {
    fontSize: 12,
  },
  status: {
    fontSize: 12,
    color: 'green',
  },
});

export default MyComponent;