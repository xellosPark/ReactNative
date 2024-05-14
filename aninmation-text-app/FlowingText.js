import React, { useEffect, useRef, useState } from 'react';
import { Animated, Text, View, StyleSheet, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons'; // MaterialIcons 아이콘 라이브러리를 사용합니다.

const screenWidth = Dimensions.get('window').width; // 화면의 전체 너비를 구합니다.

const FlowingText = () => {
  const translateX = useRef(new Animated.Value(screenWidth)).current; // 애니메이션 시작 위치를 화면 너비로 설정합니다.
  const [iconColor, setIconColor] = useState("#E97777"); // 아이콘의 초기 색상을 설정합니다.

    const [events, setEvents] = useState([
    { id: 1, title: "1.진행 이슈가 있습니다" },
    { id: 2, title: "2.디버그 이슈가 있습니다" },
    { id: 3, title: "3.행어 이슈가 있습니다" },
  ]);
  useEffect(() => {
    const startAnimation = () => {
      // Smoothly reset the translateX value to screenWidth before starting the animation
      translateX.setValue(screenWidth);
      Animated.timing(translateX, {
        toValue: -screenWidth * 2, // Ensure this value provides enough distance for a smooth transition
        duration: 15000,
        useNativeDriver: true,
      }).start(() => startAnimation());  // Loop the animation
    };

    startAnimation();

    const colorInterval = setInterval(() => {
      setIconColor(prevColor => prevColor === "#E97777" ? "#FFD700" : "#E97777");
    }, 1000); // Toggle the color every second

    return () => {
      translateX.stopAnimation();
      clearInterval(colorInterval);
    };
  }, []);

  return (
    <View style={styles.container}>
      <Animated.View style={{ flexDirection: 'row', alignItems: 'center', transform: [{ translateX }] }}>
        <Icon name="notifications" size={24} color={iconColor} style={styles.icon} />
        <Text style={styles.textissue}>이슈 발생</Text>
        
        {events.map((event) => (
          <Text key={event.id} style={styles.text}>
            {event.title}
          </Text>
        ))}

        <Text style={styles.textissue}>관리자는 빨리 조치 해주세요!</Text>
        
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#eeee', // 컨테이너의 배경색을 설정합니다.
    padding: 10,
    overflow: 'hidden', // 컨테이너 경계를 넘어가는 요소를 숨깁니다.
    width: '100%', // 컨테이너의 너비를 화면 너비와 동일하게 설정합니다.
  },
  text: {
    fontSize: 15,
    fontWeight: 'bold',
    backgroundColor: '#F8D7DA', // 텍스트의 배경색을 연분홍색으로 설정합니다.
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 10, // 텍스트 배경의 모서리를 둥글게 처리합니다.
    marginRight: 10,
  },
  textissue: {
    fontSize: 15,
    fontWeight: 'bold',
    backgroundColor: '#D37676', // 텍스트의 배경색을 연분홍색으로 설정합니다.
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 5, // 텍스트 배경의 모서리를 둥글게 처리합니다.
    marginRight: 10,
  },
  icon: {
    marginLeft: 10, // 아이콘과 텍스트 사이의 간격을 조정합니다.
  }
});

export default FlowingText;