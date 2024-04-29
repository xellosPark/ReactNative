import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import MainBoard from '../../../DashBoard/MainBoard';
import MainBoardData from '../../../DashBoard/MainBoardData';

const HomeScreen = () => {

  const [board, setBoard] = useState([]);
  const handleLoadBoard = async () => {
    const data = await MainBoardData();
      console.log("11",{data});
      setBoard(data);
      //console.log("13",{board});

    
  }

  useEffect(() =>{
    handleLoadBoard();
    
  }, [])

  return (
    <View style={styles.screenContainer}>
      <TouchableOpacity
          onPress={handleLoadBoard}
          >
          <Text>Load</Text>
        </TouchableOpacity>
      <MainBoard board={board} />
    </View>
  );
};

const styles = StyleSheet.create({
    screenContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default HomeScreen;
