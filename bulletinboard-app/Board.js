import React from 'react';
import { FlatList, View, Text, StyleSheet } from 'react-native';
import BulletinBoardItem from './BulletinBoardItem'; // Make sure the path is correct
import { bulletinBoardData } from './BulletinBoardData'; // Make sure the path is correct

const Board = () => {
  return (
    <FlatList
      data={bulletinBoardData}
      keyExtractor={item => item.id}
      renderItem={({ item }) => <BulletinBoardItem item={item} />}
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

export default Board;