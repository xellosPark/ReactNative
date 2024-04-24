import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput } from 'react-native';
import styles from './LogInViewStyles'; 
import Icon from 'react-native-vector-icons/FontAwesome';
import axios from 'axios';
import { Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '../../API/api';

const LogInView = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    if (email && password) {
      try {
        const response = await axios.post("http://192.168.0.140:8877/login", {
          email,
          password,
        });
        const { accessToken, refreshToken } = response.data; // Assuming these are the names used by your server

        //console.log("받은 토큰:", accessToken, refreshToken); // 로그에 토큰 출력
        // Store both tokens in AsyncStorage
        try {
          await AsyncStorage.multiSet([
            ["accessToken", accessToken],
            ["refreshToken", refreshToken],
          ]);

          console.log("토큰 저장 성공");
        } catch (storageError) {
          console.error("토큰 저장 실패:", storageError);
          Alert.alert("로그인 실패", "토큰 저장 중 문제가 발생했습니다.");
        }
      } catch (error) {
        console.error("로그인 실패:", error);
        Alert.alert("로그인 실패", "서버 연결에 문제가 있습니다.");
      }
    } else {
      Alert.alert("입력 오류", "이메일과 비밀번호를 모두 입력해주세요.");
    }
  };

  const handleLogout = async () => {
    try {
      // Clear both tokens from AsyncStorage
      await AsyncStorage.multiRemove(['accessToken', 'refreshToken']);
      console.log("로그아웃 성공", "토큰이 성공적으로 삭제되었습니다.");
      Alert.alert("로그아웃 성공", "로그아웃이 완료되었습니다.");
    } catch (error) {
      console.error("로그아웃 실패:", error);
      Alert.alert("로그아웃 실패", "로그아웃 중 문제가 발생했습니다.");
    }
  };

  const handleTest = async () => {
    try {
      console.log("handleTest start 57");
      const data = await fetchData(); // Call fetchData and handle the data
      console.log('Use the fetched data here:', data);
      // Further code to use the fetched data in your application...
    } catch (error) {
      console.error('Error during data handling in the app:', error);
      // Handle errors, e.g., show error message to the user, retry, etc.
    }
  };

  const fetchData = async () => {
    try {
      console.log("Attempting to fetch data from protected route...");
      const response = await api.get('/aaa'); // Make a GET request using the configured Axios instance
      console.log('Data received:', response.data); // Log the received data
      return response.data; // Return the data for further processing or UI rendering
    } catch (error) {
      console.error('Failed to fetch data:', error); // Log the error if the request fails
      if (error.response && error.response.status === 403) {
        console.error('Access Denied. Token may be expired or invalid.');
      }
      throw error; // Rethrow the error for further handling if necessary
    }
  }
  

  return (
    <>
      <View style={styles.container}>
        <View style={styles.titleContainer}>
          <Text style={[styles.title, styles.titleTo]}>To</Text>
          <Text style={[styles.title, styles.titleDo]}> Do</Text>
          <Text style={[styles.title, styles.titleList]}> List</Text>
          <Text style={styles.LoginText}>📝</Text>
        </View>      
        
        <TextInput
          value={email}
          onChangeText={setEmail}
          placeholder="Email"
          style={styles.input}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <TextInput
          value={password}
          onChangeText={setPassword}
          placeholder="Password"
          style={styles.input}
          secureTextEntry
        />
        <TouchableOpacity
          style={styles.loginButton}
          onPress={handleLogin}
          >
          <Text style={styles.loginButtonText}>LOG IN</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.logoutButton}
          onPress={handleLogout}
        >
          <Text style={styles.logoutButtonText}>LOG OUT</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.logoutButton}
          onPress={handleTest}
        >
          <Text style={styles.logoutButtonText}>Test Button</Text>
        </TouchableOpacity>
        
        <Text style={styles.forgotPasswordText}>Forgotten Password?</Text>
      </View>
    </>
  );
};
export default LogInView;