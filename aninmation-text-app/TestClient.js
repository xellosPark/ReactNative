import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';

const TestClient = () => {
  const [message, setMessage] = useState('Loading...');

  const fetchData = async () => {
    try {
      let response = await fetch('http://your-server-address:port/');
      let text = await response.text();
      setMessage(text);
    } catch (error) {
      console.error('Error fetching data: ', error);
      setMessage('Failed to load data');
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>{message}</Text>
      <Button title="Refresh" onPress={fetchData} />
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