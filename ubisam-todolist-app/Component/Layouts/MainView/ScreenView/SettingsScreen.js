import React, { useEffect, useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native';
import UserContext, { useUserDispatch, useUserState } from '../../../../API/UseContext/userContext';

const SettingsScreen = ({ navigation }) => {
  const myData = useContext(UserContext);

  const OnLogout = async () => {
    try {
      // Clear both tokens from AsyncStorage
      await AsyncStorage.multiRemove(['accessToken', 'refreshToken']);

      //const data = {id : '', name : '', project : ''};
      //await myData.setValue(null);
      console.log("로그아웃 성공", "토큰이 성공적으로 삭제되었습니다.");
      Alert.alert("로그아웃 성공", "로그아웃이 완료되었습니다.");
      navigation.navigate('Login');
    } catch (error) {
      console.error("로그아웃 실패:", error);
      Alert.alert("로그아웃 실패", "로그아웃 중 문제가 발생했습니다.");
    }
  }

  return (
    <View style={styles.screenContainer}>
      <View>
        <Text>{myData ? myData.id : ''}</Text>
        <Text>{myData ? myData.name : ''}</Text>
      </View>
      <TouchableOpacity style={styles.logOut} onPress={OnLogout}>
           <Text >
             로그아웃
           </Text>
         </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
    screenContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    logOut: {
      margin: 5,
      padding:10,
      fontSize: 20,
      backgroundColor: '#eee',
    },
});

export default SettingsScreen;