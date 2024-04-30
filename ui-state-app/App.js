import React from 'react';
import { View, Text, StyleSheet, FlatList, ScrollView } from 'react-native';
import ChipComponent from './ChipComponent';

const data = [
  { id: "1", title: "School Recommendation", date: "1 month ago", status: "진행중" },
  { id: "2", title: "Community Garden Update", date: "2 months ago", status: "진행중" },
  { id: "3", title: "New Mural Downtown", date: "2 months ago", status: "진행중" },
  { id: "4", title: "Book Fair Announcement", date: "3 months ago", status: "진행중" },
  { id: "5", title: "Beach Cleanup Initiative", date: "3 months ago", status: "진행중" },
  { id: "6", title: "Football Finals Party", date: "4 months ago", status: "진행중" },
  { id: "7", title: "Smoothie Bar Opening", date: "5 months ago", status: "진행중" },
];

const data1 = [
  { id: "1", title: "전체", value: "25", color: "#ccffcc" },
  { id: "2", title: "대기", value: "5", color: "#ccccff" },
  { id: "3", title: "진행중", value: "4", color: "#ADD8E6" },
  { id: "4", title: "완료", value: "16", color: "#FFD700" },
  { id: "5", title: "이슈", value: "0", color: "#ffccff" },
];

const renderMainItem = ({ item }) => (
  <View style={styles.itemContainerBoard}>
    <Text style={styles.title}>{item.title}</Text>
    <Text style={styles.date}>{item.date}</Text>
    <Text style={styles.status}>{item.status}</Text>
  </View>
);

const renderAuxiliaryItem = ({ item }) => (
  <View style={[styles.itemContainer, { backgroundColor: item.color }]}>
    <Text style={styles.auxTitle}>{item.title}</Text>
    <Text style={styles.auxDivider}>------</Text>
    <Text style={styles.auxValue}>{item.value}</Text>
  </View>
);

const App = () => {
  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        renderItem={renderMainItem}
        keyExtractor={(item) => item.id}
        numColumns={2}
        style={styles.mainList}
      />

      {/* Auxiliary content */}
      <View style={styles.auxContent}>
        <ScrollView horizontal style={styles.auxScroll}>
          {data1.map(item => (
            <View key={item.id} style={[styles.itemContainer, { backgroundColor: item.color }]}>
              <Text style={styles.auxTitle}>{item.title}</Text>
              <Text style={styles.auxDivider}>------</Text>
              <Text style={styles.auxValue}>{item.value}</Text>
            </View>
          ))}
        </ScrollView>

        {/* Second auxiliary row */}
        <ScrollView horizontal style={[styles.auxScroll, styles.auxRow2]}>
          {data1.map(item => (
            <View key={item.id} style={[styles.itemContainer, { backgroundColor: '#A7CCCB' }]}>
              <Text style={styles.auxTitle}>{item.title}</Text>
              <Text style={styles.auxDivider}>------</Text>
              <Text style={styles.auxValue}>{item.value}</Text>
            </View>
          ))}
        </ScrollView>
      </View>

      <ChipComponent/>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  itemContainerBoard: {
    backgroundColor: '#f9f9f9',
    margin: 10,
    padding: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    width: 120,
    height: 120,
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
  mainList: {
    flex: 1,
  },
  auxList: {
    flex: 1,
  },
  title: {
    fontWeight: 'bold',
  },
  date: {
    color: 'gray',
  },
  status: {
    color: 'green',
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
  auxScroll: {
    height: 65,
    backgroundColor: '#F0F8FF', // Bright background color.
  },
  auxRow2: {
    marginTop: 0, // Ensures no spacing between rows.
  },
});

export default App;