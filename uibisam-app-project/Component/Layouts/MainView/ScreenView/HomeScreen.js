import React, { useEffect, useState, useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Button, SafeAreaView } from 'react-native';
import { Provider } from "react-native-paper";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { decode as base64decode } from 'base-64';
import { TextDecoder } from 'text-encoding';

import MainBoard from '../../../DashBoard/MainBoard';
import MainBoardData from '../../../DashBoard/MainBoardData';
import BoardState from '../../../DashBoard/UbStates/BoardState';
import FloatingButton from '../FloatingButton/FloatingButton';
import ProjectDropdowm from '../ProjectDropdowm/ProjectDropdowm';
import UserInfo from '../../../../API/UserInfo';

import UserContext, { useUserDispatch, useUserState } from '../../../../API/UseContext/userContext';
import ProjectInfoData from '../../../../API/ProjectInfoData';
import DialogComponent from '../../../SubCompoment/DialogComponent';

const HomeScreen = ({ navigation }) => {
  const [userInfo, setUserInfo] = useState([]);
  const [board, setBoard] = useState([]);
  const [selectProject, setSelectProject] = useState('');
  const [loading, setLoading] = useState(false);
  const [option, setOption] = useState([]);

  const [showEditButton, setShowEditButton] = useState(false); // State to track visibility
  const [visibleAdd, setVisibleAdd] = useState(false);
  const [visibleEdit, setVisibleEdit] = useState(false);

  const showAddDialog = () => setVisibleAdd(true);
  const hideAddDialog = () => setVisibleAdd(false);

  const showEditDialog = () => setVisibleEdit(true);
  const hideEditDialog = () => setVisibleEdit(false);

  const myData = useContext(UserContext);

  const handleLoadBoard = async () => {
    if (selectProject !== 'No Data') {
      const data = await MainBoardData(selectProject);
      await setBoard(data);
      await setLoading(true); // Start loading (show splash screen)

    } else {
      console.log(" Select Project 'No Data'");
    }

  }

  const handleOption = (item) => {
    setSelectProject(item);
  }

  const handleLoadUserInfo = async () => {
    if (myData.id === '') {
      return;
    }
    if (myData.name === '') {
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
      //console.error("Failed to decode JWT:", error);
      return null;
    }
  }

  const handleAddPress = () => {
    //alert("Add button pressed!");
    showAddDialog();
    console.log('진행? 110', visibleAdd);

    console.log('진행? 112', visibleAdd);
  };

  const handleEditPress = () => {
    alert("Edit button pressed!");
  };

  const toggleEditButton = (item) => {

    if (item.name !== myData.name) {
      setShowEditButton(false);
      return;
    }
    //alert(`번호 ${item.id} title ${item.title} content ${item.content}`)
    setShowEditButton(!showEditButton); // Toggle visibility
  };

  useEffect(() => {
    const loadData = async () => {
      const access = await AsyncStorage.getItem('accessToken');
      const val = decodeJWT(access);
      await myData.setValue(val.payload);
    }
    loadData();
  }, []);

  useEffect(() => {
    const loadUserInfo = async () => {
      const userData = await handleLoadUserInfo();

    }
    loadUserInfo();
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

  const handlePageChange = (newPage) => setCurrentPage(newPage);

  return (
    <Provider>
      <SafeAreaView style={styles.container}>
        {loading && (
          <>
            <ProjectDropdowm selectProject={selectProject} userInfo={userInfo} option={option} handleOption={handleOption} />
            <BoardState board={board} />
            <MainBoard board={board} toggleEditButton={toggleEditButton} />
          </>
        )}
        <FloatingButton
          onPress={showAddDialog}
          icon="add-outline"
          style={styles.addButton}
        />
        <DialogComponent visibleAdd={visibleAdd} onDismiss={hideAddDialog} name={myData.name} selectProject={selectProject} />

        {/* Conditionally render the Edit button */}
        {showEditButton && (
          <FloatingButton
            onPress={handleEditPress}
            icon="create-outline"
            style={styles.editButton}
          />
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
