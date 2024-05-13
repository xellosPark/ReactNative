import React, { useEffect, useRef, useState } from 'react';
import { Animated, Text, View, StyleSheet, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons'; // MaterialIcons 아이콘 라이브러리를 사용합니다.

const screenWidth = Dimensions.get('window').width; // 화면의 전체 너비를 구합니다.

const FlowingText = () => {
  const translateX = useRef(new Animated.Value(screenWidth)).current; // 애니메이션 시작 위치를 화면 너비로 설정합니다.
  const [iconColor, setIconColor] = useState("#E97777"); // 아이콘의 초기 색상을 설정합니다.

  useEffect(() => {
    const startAnimation = () => {
      translateX.setValue(screenWidth); // 애니메이션 시작 전 위치를 초기화합니다.
      Animated.timing(translateX, {
        toValue: -screenWidth * 2,
        duration: 15000, // 애니메이션 지속 시간을 15초로 설정합니다.
        useNativeDriver: true,
      }).start(() => startAnimation()); // 애니메이션이 끝나면 다시 시작합니다.
    };

    startAnimation(); // 컴포넌트 마운트 시 애니메이션을 시작합니다.

    const colorInterval = setInterval(() => {
      setIconColor(prevColor => prevColor === "#E97777" ? "#FFD700" : "#E97777"); // 색상을 주기적으로 토글합니다.
    }, 1000); // 1초마다 색상을 토글합니다.

    return () => {
      translateX.stopAnimation(); // 컴포넌트 언마운트 시 애니메이션을 중지합니다.
      clearInterval(colorInterval); // 인터벌을 정리합니다.
    };
  }, [translateX]);

  return (
    <View style={styles.container}>
      <Animated.View style={{ flexDirection: 'row', alignItems: 'center', transform: [{ translateX }] }}>
        <Icon name="notifications" size={24} color={iconColor} style={styles.icon} />
        <Text style={styles.textissue}>이슈 발생</Text>
        
        <Text style={styles.text}>1.이슈가 있습니다</Text>
        <Text style={styles.text}>2.이슈가 있습니다</Text>

        
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
  },
  textissue: {
    fontSize: 15,
    fontWeight: 'bold',
    backgroundColor: '#DDCCFF', // 텍스트의 배경색을 연분홍색으로 설정합니다.
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 10, // 텍스트 배경의 모서리를 둥글게 처리합니다.
  },
  icon: {
    marginLeft: 10, // 아이콘과 텍스트 사이의 간격을 조정합니다.
  }
});

export default FlowingText;