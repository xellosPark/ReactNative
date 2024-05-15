import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/FontAwesome';
import { ENV_MODE, API_URL  } from '@env';
import axios from 'axios';

const UbisamSplashScreen = ({ navigation }) => {
  
  // SplashScreen.hide를 안전하게 호출하기 위한 함수입니다.
  const hideSplashScreen = () => {
    if (SplashScreen && SplashScreen.hide) {
      SplashScreen.hide();
    }
  };

  // 사용자 토큰을 체크하는 함수입니다.
  const checkToken = async () => {
    // 로그로 환경 모드의 문자열 값을 출력합니다.
    console.log("Environment Mode (string):", ENV_MODE);
    console.log("APP_URL :: ", API_URL);
    // 문자열 값을 불리언으로 변환합니다.
    const isEnvMode = ENV_MODE === true;

    // 불리언 값으로 로그를 출력합니다.
    console.log("Environment Mode (boolean):", isEnvMode); // true 또는 false 불리언 값으로 출력

    const refreshToken = await AsyncStorage.getItem("refreshToken");
    console.log("accessToken refresh response: 30", refreshToken);
    let accessToken = null;

    
    if (refreshToken) {
      try {
        //const ip = `http://localhost:3000`;
        //const ip = `http://192.168.0.136:8877`;
        //const ip = `http://192.168.0.140:8877`;
        const ip = `http://192.168.45.171:8877`;
        const response = await axios.post(`${ip}/refresh`, { refreshToken });
        accessToken = response.data.accessToken;
        console.log("accessToken refresh response: 36", accessToken);
      } catch (error) {
         if (error.response && error.response.status === 403) {
          console.log("Received a 403 server -> not refresh token.");
          accessToken = null;
        } else {
          throw error; // Re-throw the error if it's not a 403
        }
      }
    }

    try {
      if (!accessToken) {
        navigation.replace("Login");
      } else {
        navigation.replace("Ubisam");
      }
    } catch (error) {
      // 오류가 발생하면 로그에 오류를 출력합니다.
      console.log("Error checking token:", error);
    } finally {
      // SplashScreen을 숨깁니다.
      hideSplashScreen();
    }
  };

  useEffect(() => {
    let isComponentMounted = true; // 컴포넌트 마운트 상태를 추적합니다.

    const timer = setTimeout(() => {
      if (isComponentMounted) {
        checkToken().catch(error => {
          // 프로미스가 거부되었을 때 여기서 처리합니다.
          console.error('Promise was rejected:', error);
        });
      }
    }, 500); // 1초 후 checkToken 함수를 실행합니다.

    // 컴포넌트 언마운트 시 타이머를 정리하고 isComponentMounted 상태를 업데이트합니다.
    return () => {
      isComponentMounted = false;
      clearTimeout(timer);
    };
  }, [navigation]); // 의존성 배열에 navigation 추가
  return (
    <View style={styles.container}>
        <View style={styles.logoStack}>
            <Text style={styles.logoU}>U</Text>
            <Text style={styles.logoBi}>bi</Text>
            <Text style={styles.logoS}>S</Text>
            <Text style={styles.logoAm}>am</Text>
            <Icon name="rss" style={styles.rssIcon} />
        </View>
        <Text>FACTORY AUTOMATION SOLUTIONS</Text>
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