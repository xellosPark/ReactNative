import React, { useEffect, useState, useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Button, SafeAreaView, RefreshControl, Alert } from 'react-native';
import { Provider } from "react-native-paper";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { decode as base64decode } from 'base-64';
import { TextDecoder } from 'text-encoding';

import MainBoard from '../../../DashBoard/MainBoard';
import MainBoardData from '../../../DashBoard/MainBoardData';
import BoardState from '../../../DashBoard/UbStates/BoardState';
import FloatingButton from '../FloatingButton/FloatingButton';
import ProjectDropdowm from '../ProjectDropdowm/ProjectDropdowm';
import ModalComponent from '../../../SubCompoment/ModalComponent';
import ModifyModalComponent from '../../../SubCompoment/ModifyModalComponent';
import FlowingText from '../../../DashBoard/UbStates/FlowingText';

import UserContext, { useUserDispatch, useUserState } from '../../../../API/UseContext/userContext';
import UserInfo from '../../../../API/UserInfo';
import ProjectInfoData from '../../../../API/ProjectInfoData';
import LoadMainBoardData from '../../../../API/LoadMainBoardData';
import LoadSubBoardData from '../../../../API/LoadSubBoardData';

const HomeScreen = ({ navigation }) => {
  const [userInfo, setUserInfo] = useState([]);
  const [board, setBoard] = useState([]);
  //const [subBoard, setSubBoard] = useState([]);
  const [selectProject, setSelectProject] = useState('');
  const [loading, setLoading] = useState(false);
  const [option, setOption] = useState([]);

  const [showModifyButton, setShowModifyButton] = useState(false); // State to track visibility
  const [visibleAdd, setVisibleAdd] = useState(false);
  const [visibleModify, setVisibleModify] = useState(false);
  const [oldClickData, setOldClickData] = useState([]);
  const [refreshing, setRefreshing] = useState(false); // 새로고침 상태 추가
  const [filterName, setFilterName] = useState('전체');

  const showAddDialog = () => setVisibleAdd(true);
  const hideAddDialog = () => {
    setVisibleAdd(false);
    handleLoadBoard();
  }

  const showModifyDialog = () => {
    //Alert.alert('안내','현재 web에서 사용하는 수정 기능 업데이트 전입니다. web을 이용해주세요');
    //return;
    setVisibleModify(true);
  }
  const hideModifyDialog = () => {
    setVisibleModify(false);
    handleLoadBoard();
  };

  const myData = useContext(UserContext);

  const handleLoadBoard = async () => {
    if (selectProject !== 'No Data' && selectProject !== '') {
      const data = await LoadMainBoardData(selectProject);
      const subData = await LoadSubBoardData(selectProject);
      const fullData = await parseData(data, subData);
      //console.log('fullData', fullData);
      await setBoard(fullData);
      //await setLoading(true); // Start loading (show splash screen)
    } else {
      console.log(" Select Project 'No Data'");
    }
  }

  const handleOption = (item) => {
    setSelectProject(item);
  }

  const handleLoadUserInfo = async () => {
    if (myData.id === null) {
      return;
    }
    if (myData.name === null) { //'' 이거는 소용 x
      return;
    }
    const data = await UserInfo(myData.id, myData.name);
    if (data === undefined) return;
    await setUserInfo(data);
    return data;
  }

  const loadProjectInfo = async () => {
    if (userInfo) {
      const data = await ProjectInfoData(userInfo.name);
      const prjName = data.map(item => item.text);
      setOption(prjName);
      if (userInfo.impProject) {
        setSelectProject(userInfo.impProject);
      } else {
        setSelectProject('No Data');
      }
    } else {

    }
  };

  function decodeJWT(token) {
    try {
      //console.log('token 11', token);
      const parts = token.split('.');
      if (parts.length !== 3) {
        throw new Error('Invalid token: The JWT must have three parts');
      }

      const header = JSON.parse(base64decode(parts[0].replace(/-/g, '+').replace(/_/g, '/')));
      //const payload = JSON.parse(base64decode(parts[1].replace(/-/g, '+').replace(/_/g, '/'))); //한글없이는 이렇게 사용가능
      const payloadEncoded = parts[1].replace(/-/g, '+').replace(/_/g, '/');
      const payloadDecoded = base64decode(payloadEncoded);

      const decoder = new TextDecoder('utf-8');
      const payloadUtf8 = decoder.decode(new Uint8Array(Array.from(payloadDecoded).map(char => char.charCodeAt(0))));
      const payload = JSON.parse(payloadUtf8);

      return { header, payload };
    } catch (error) {
      return null;
    }
  }

  const toggleModifyButton = (item) => {
    if (item.name !== myData.name) {
      setShowModifyButton(false);
      return;
    }
    if (item.key === oldClickData.key) {
      setShowModifyButton(!showModifyButton);// Toggle visibility
    } else {
      setShowModifyButton(true); // Toggle visibility
    }

    setOldClickData(item);
  };

  // 새로고침 함수 정의
  const onRefresh = async () => {
    setRefreshing(true);
    await handleLoadBoard(); // 게시판 데이터를 다시 불러옵니다.
    setRefreshing(false); // 새로고침 상태를 false로 설정합니다.
  };

  const parseData = async (data, subData) => {
    if (subData === undefined) {
      return await data;
    }
    await subData.forEach(detail => {
      // 해당 targetIndex를 가진 객체를 찾습니다.
      let item = data.find(item => item.Key === detail.FieldNum);
      if (item.Key === 364) {
      }
      if (item) {
          // details 속성이 없다면 초기화합니다.
          if (!item.details) {
              item.details = [JSON.parse(JSON.stringify(item))]; //status 업데이트를 위해 복사해서 초기화함
          }
          // details 배열에 상세 정보를 추가합니다. targetIndex는 제외합니다.
          item.details.push({
              Index: detail.Index,
              ProjectName: detail.ProjectName,
              Date: detail.Date,
              ChangeDate: detail.ChangeDate,
              Name: detail.Name,
              Title: detail.Title,
              Content: detail.Content,
              Status: detail.Status,
              FieldNum: detail.FieldNum,
              FieldSubNum: detail.FieldSubNum,
          });
          item.details[0].Status = item.details[item.details.length - 1].Status;
      }
  });
  return await data;
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      loadData();
    }, 500);
    const loadData = async () => {
      const access = await AsyncStorage.getItem('accessToken');
      const val = decodeJWT(access);
      if (!val.header) {
        return
      }
      if (!val.payload) {
        return
      }
      await myData.setValue(val.payload);
    }
    loadData();
    return () => clearTimeout(timer);
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      loadUserInfo();
    }, 500);
    const loadUserInfo = async () => {
      const userData = await handleLoadUserInfo();
    }
    loadUserInfo();
    return () => clearTimeout(timer);
  }, [myData.id, myData.name]);

  useEffect(() => {
    const projectInfo = async () => {
      await loadProjectInfo();
    }
    projectInfo();
  }, [userInfo])

  useEffect(() => {
    const loadBoard = async () => {
      await handleLoadBoard();
    }
    loadBoard();
  }, [selectProject])


  return (
    <Provider>
      <SafeAreaView style={styles.container}>
        <>
          <ProjectDropdowm selectProject={selectProject} userInfo={userInfo} option={option} handleOption={handleOption} />
          <BoardState board={board} setFilterName={setFilterName} />
          <FlowingText selectProject={selectProject} />
          <MainBoard board={board} toggleModifyButton={toggleModifyButton} filterName={filterName}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
          />
        </>
        <FloatingButton
          onPress={showAddDialog}
          icon="add-outline"
          style={styles.addButton}
        />
        <ModalComponent visibleAdd={visibleAdd} onDismiss={hideAddDialog} name={myData.name} selectProject={selectProject} />

        {/* Conditionally render the Edit button */}
        {showModifyButton && (
          <>
            <FloatingButton
              onPress={showModifyDialog}
              icon="create-outline"
              style={styles.editButton}
            />
            <ModifyModalComponent data={oldClickData} name={myData.name} selectProject={selectProject} visibleModify={visibleModify} onDismiss={hideModifyDialog} />
          </>
        )}
      </SafeAreaView>
    </Provider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
  },
  float: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 18,
  },
  addButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
  },
  editButton: {
    position: 'absolute',
    bottom: 80,  // Adjust positioning to be on top of the add button.
    right: 20,
  },
});

export default HomeScreen;
