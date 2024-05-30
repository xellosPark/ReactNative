import React, { useEffect, useRef, useState } from 'react';
import { Animated, Text, View, StyleSheet, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons'; // MaterialIcons 아이콘 라이브러리를 사용합니다.
import GetKanBanList from '../../../API/GetKanBanList';

const screenWidth = Dimensions.get('window').width; // 화면의 전체 너비를 구합니다.

const FlowingText = ({selectProject}) => {
  const translateX = useRef(new Animated.Value(screenWidth)).current; // 애니메이션 시작 위치를 화면 너비로 설정합니다.
  const [iconColor, setIconColor] = useState("#E97777"); // 아이콘의 초기 색상을 설정합니다.
  const [list, setList] = useState([]);

  useEffect(() => {
    if (list.length <= 0) return;

    const startAnimation = () => {
      // 애니메이션을 시작하기 전에 translateX 값을 screenWidth로 부드럽게 리셋
      translateX.setValue(screenWidth);
      const animationDistance = screenWidth * (list.length + 1); // 리스트의 길이에 맞게 애니메이션 거리 설정

      Animated.timing(translateX, {
        toValue: -screenWidth * 4, // 부드러운 전환을 위해 충분한 거리를 설정
        duration: 15000,
        useNativeDriver: true,
      }).start(() => startAnimation());  // 애니메이션 반복
    };

    startAnimation();

    const colorInterval = setInterval(() => {
      setIconColor(prevColor => prevColor === "#E97777" ? "#FFD700" : "#E97777");
    }, 2000); // 매 2초마다 색상 전환

    return () => {
      translateX.stopAnimation();
      clearInterval(colorInterval);
    };
  }, [list]); // list 또는 start가 변경될 때마다 애니메이션을 다시 시작

  useEffect(() => {
    const loadKanbanList = async () => {
      const loadData = await GetKanBanList(selectProject);
      const data = loadData.map((item , index) => ({
        id: index,
        title: item.Content
      }));
      setList(data);
    };
    loadKanbanList();
  },[selectProject]);

  return (
    <View style={styles.container}>
      {
      list?.length > 0 && (
      <Animated.View style={{ flexDirection: 'row', alignItems: 'center', transform: [{ translateX }] }}>
        <Icon name="notifications" size={24} color={iconColor} style={styles.icon} />
        <Text style={styles.textissue}>이슈 발생</Text>
        
        {list.map((event) => (
          <Text key={event.id} style={styles.text}>
            {event.title}
          </Text>
        ))}
        <Text style={styles.textissue}>관리자는 빨리 조치 해주세요!</Text>
      </Animated.View>
      )}
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