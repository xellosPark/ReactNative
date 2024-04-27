import React, { useState } from 'react';
import { View, FlatList, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5'; // Make sure to install this package

const BulletinBoard = () => {
  const [posts, setPosts] = useState([
    { id: '1', title: 'EVENT) 좋은 질문을 콕 집어 알려주는 방법!', date: '3분 전', admin: true, comments: 7 },
    { id: '2', title: '자유 게시판 이용 안내', date: '1시간 전', admin: true, comments: 54 },
    // ... more posts
  ]);

  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.item}>
      <View style={styles.itemLeft}>
        {/* {item.admin && (
          <Icon name="crown" solid size={14} color="#ffcc00" style={styles.icon} />
        )} */}
        <Text style={styles.title} numberOfLines={1}>{item.id}</Text>
        <Text style={styles.title} numberOfLines={1}>{item.title}</Text>
      </View>
      <View style={styles.itemRight}>
        <Text style={styles.date}>{item.date}</Text>
        <View style={styles.commentContainer}>
          <Icon name="comments" size={14} color="#555" />
          <Text style={styles.comments}>{item.comments}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <FlatList
      data={posts}
      renderItem={renderItem}
      keyExtractor={item => item.id}
      style={styles.list}
    />
  );
};

const styles = StyleSheet.create({
  list: {
    width: '100%',
  },
  item: {
    flexDirection: 'row',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  itemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flexShrink: 1,
  },
  icon: {
    marginRight: 6,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 16,
    flexShrink: 1,
  },
  itemRight: {
    alignItems: 'flex-end',
  },
  date: {
    fontSize: 12,
    color: '#777',
  },
  commentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  comments: {
    fontSize: 12,
    marginLeft: 4,
  },
});

export default BulletinBoard;