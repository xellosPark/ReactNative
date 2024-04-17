import React from 'react';
import { View, Text, StyleSheet, SafeAreaView } from 'react-native';

const MenuItem = ({ color, title, number }) => {
  return (
    <View style={[styles.menuItem, { backgroundColor: color }]}>
      <Text style={styles.itemTitle}>{title}</Text>
      <View style={styles.separator} />
      <Text style={styles.itemNumber}>{number}</Text>
    </View>
  );
};


const StatsCard = () => {
    return (
        <SafeAreaView style={styles.menu}>
            <MenuItem color="#90EE90" title="첫째" number="1" />
            <MenuItem color="#90EE90" title="둘째" number="2" />
            <MenuItem color="#90EE90" title="셋째" number="3" />
            <MenuItem color="#90EE90" title="넷째" number="4" />
            <MenuItem color="#90EE90" title="다섯째" number="5" />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#F5FCFF',
    },
    menu: {
      
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
    },
    menuItem: {
      marginTop: 50,
      width: '15%', // Adjust the width as necessary
      marginHorizontal: 5,
      paddingVertical: 10,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 15,
      elevation: 2, // for Android shadow
      shadowOpacity: 0.3, // for iOS shadow
      shadowRadius: 4,
      shadowOffset: { height: 2, width: 0 },
    },
    itemTitle: {
      fontSize: 13,
      fontWeight: 'bold',
    },
    separator: {
      height: 2,
      width: '80%',
      backgroundColor: 'grey',
      marginVertical: 5,
    },
    itemNumber: {
      fontSize: 15,
      fontWeight: 'bold',
    },
  });

export default StatsCard;