import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const BulletinBoardItem = ({ item }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleNumberOfLines = () => {
    setIsExpanded(!isExpanded); // Toggle the state to expand or collapse the text
  };

  return (
    <View style={styles.item}>
      {/* <Text style={styles.id}>{item.id}</Text> */}
      <View style={styles.header}>
        <Text style={styles.order}>{item.order}</Text>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.status}>진행중</Text>
      </View>
      <Text style={styles.date}>{item.date}</Text>
      <Text style={styles.content} numberOfLines={isExpanded ? 0 : 2} >
        {item.content}
      </Text>
      {item.content.length > 100 && ( 
        <TouchableOpacity onPress={toggleNumberOfLines}>
          <Text style={styles.moreButton}>
            {isExpanded ? '접기' : '더 보기'} 
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

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
    order: {
      fontSize: 16,
      fontWeight: 'bold',
      color: '#333',
    },
    title: {
      fontSize: 16,
      fontWeight: 'bold',
      flex: 1,
      textAlign: 'center', // Align text to the right
      marginLeft: 10, // Add some space between the order and title
    },
    status: {
      fontWeight: 'bold',
      color: 'green', // Change the color as needed
    },
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

export default BulletinBoardItem;