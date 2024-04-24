import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/FontAwesome';

const UbisamSplashScreen = ({ navigation }) => {
    useEffect(() => {
        const timer = setTimeout(() => {
          checkToken();
        }, 1000);  // Wait for 2 seconds before executing checkToken
    
        return () => clearTimeout(timer);  // Clear the timer if the component unmounts
      }, []);

  const checkToken = async () => {
    try {
    const token = await AsyncStorage.getItem("userToken");
    if (token) {
      navigation.replace("Login");
    } else {
      navigation.replace("Ubisam"); 
    }
    } catch (error) {
    console.log("Error checking token:", error);
    } finally {
      SplashScreen.hide(); 
    }
  };

  return (
    <View style={styles.container}>
        <View style={styles.logoStack}>
            <Text style={styles.logoU}>U</Text>
            <Text style={styles.logoBi}>bi</Text>
            <Text style={styles.logoS}>S</Text>
            <Text style={styles.logoAm}>am</Text>
            <Icon name="rss" style={styles.rssIcon} />
        </View>
        <Text>Loading...</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ADD8E6', // 연한 파스텔 블루 배경색
    justifyContent: "center",
    alignItems: "center",
    padding: 20, // 모든 방향에 20의 패딩 적용
  },
  logoStack: {
    flexDirection: 'row',
    alignItems: 'center', // Adjust as per your vertical alignment needs
    justifyContent: 'center',
    marginTop: 20, // Space above the logo
    marginBottom: 50, // Space below the logo before the form starts
  },
   logoU: {
        fontSize: 50,
        fontWeight: 'bold',
        color: '#3F4257', // Assuming U is blue, replace with the exact color code
      },
      logoBi: {
        fontSize: 40,
        fontWeight: 'bold',
        marginTop: 8,
        color: '#3F4257', // Replace with the exact color code
      },
      logoS: {
        fontSize: 50,
        fontWeight: 'bold',
        color: '#2F97F8', // Assuming S is also blue, replace with the exact color code
      },
      logoAm: {
        fontSize: 40,
        fontWeight: 'bold',
        marginTop: 8,
        color: '#2F97F8', // Replace with the exact color code
      },
      rssIcon: {
        fontSize: 30, // Adjust the size as needed
        backgroundColor: '#2F97F8',
        color: '#f2f2f2', // Replace with the color code for the icon
        fontWeight: 'bold',
        padding: 2,
        marginLeft: 5, // Space between the text and icon
        marginBottom: 20,
      },
});

export default UbisamSplashScreen;