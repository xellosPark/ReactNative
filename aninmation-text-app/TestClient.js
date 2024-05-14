import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';

const TestClient = () => {
  const [message, setMessage] = useState('Loading...');

  // 서버에서 데이터를 가져오는 함수
  const fetchData = async () => {
    try {
      // 서버로 HTTP GET 요청을 보냄
      let response = await fetch('http://192.168.0.140:8877/');
      let text = await response.text();
      setMessage(text);  // 응답을 상태에 저장
    } catch (error) {
      console.error('Error fetching data: ', error);
      setMessage('Failed to load data');  // 오류 발생 시 메시지 업데이트
    }
  };

  useEffect(() => {
    fetchData();  // 컴포넌트 마운트 시 데이터 가져오기
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>{message}</Text>
      <Button title="Refresh" onPress={fetchData} />  // 버튼 클릭 시 fetchData 함수 호출
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  text: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
});

export default TestClient;