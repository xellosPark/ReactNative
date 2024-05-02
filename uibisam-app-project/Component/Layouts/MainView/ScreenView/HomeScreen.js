import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import MainBoard from '../../../DashBoard/MainBoard';
import MainBoardData from '../../../DashBoard/MainBoardData';
import FloatingButton from '../FloatingButton/FloatingButton';


const HomeScreen = () => {

  const [board, setBoard] = useState([]);
  const handleLoadBoard = async () => {
    const data = await MainBoardData();
      setBoard(data);
      //console.log("13",{board});
  }

  useEffect(() =>{
    handleLoadBoard();
    
  }, [])

  const handleAddPress = () => {
    alert("Add button pressed!");
  };
  const handlePageChange = (newPage) => setCurrentPage(newPage);

  return (
    <View style={styles.container}>

    <MainBoard board={board} />
    <FloatingButton
        onPress={handleAddPress}
        icon="add-outline"
        style={styles.addButton}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  text: {
    fontSize: 18,
  },
  addButton: {
    position: 'absolute',
    bottom: 10,
    right: 20,
    zIndex:1,
  },
  editButton: {
    position: 'absolute',
    bottom: 80,  // Adjust positioning to be on top of the add button.
    right: 20,
  },
});

export default HomeScreen;
