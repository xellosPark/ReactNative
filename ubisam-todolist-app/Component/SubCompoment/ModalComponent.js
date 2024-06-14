import React, { useEffect, useRef, useState } from "react";
import { StyleSheet, Text, TextInput, View, Modal, TouchableOpacity, KeyboardAvoidingView, Platform, ScrollView } from "react-native";
import ChipComponent from "./ChipComponent";
import Icon from "react-native-vector-icons/MaterialIcons";
import { Picker } from '@react-native-picker/picker';
import AddToDoList from "../../API/AddToDoList";


const ModalComponent = ({ visibleAdd, onDismiss, name, selectProject }) => {

  const currentDate = new Date();
  const formattedDate = `${currentDate.getFullYear()}/${(currentDate.getMonth() + 1).toString().padStart(2, '0')}/${(currentDate.getDate()).toString().padStart(2, '0')} - `;
  const setDate = `${currentDate.getFullYear()}-${(currentDate.getMonth() + 1).toString().padStart(2, '0')}-${(currentDate.getDate()).toString().padStart(2, '0')}`;

  const [dataValue, setDataValue] = useState(formattedDate);
  const periodOptions = ["1일", "2일", "3일", "4일", "5일", "6일", "7일", "8일", "9일", "10일", "11일", "12일", "13일", "14일", "15일"];
  const [title, setTitle] = useState("");
  const [requester, setRequester] = useState("");
  const [period, setPeriod] = useState("1일");
  const [statusVal, setStatusVal] = useState("대기");
  const [reqManager, setReqManager] = useState("");

  const handleAdd = async () => {

    if (title === "") {
      alert('제목을 입력해주세요');
      return;
    }

    if (statusVal === "") {
      alert('상태를 선택해주세요');
      return;
    }

    if (dataValue === formattedDate) {
      alert('내용을 입력해주세요');
      return;
    }

    //const cleanDropdown = dropdown.replace(/ /g, '');
    const item = {
      title: title,
      requester: requester,
      reqManager: reqManager,
      setDate: setDate,
      period: period,
      status: statusVal,
      content: dataValue
    };
    //console.log('handleAdd 24', item);
    const result = await AddToDoList(item, name, selectProject);
    //console.log('result', result);
    if (result !== 200) {
      alert('저장에 실패했습니다. 관리자에게 문의해보세요', result);
      return;

    }

    initTodoList();
    onDismiss();

  };

  const handleCancel = () => {
    onDismiss();
  }

  const initTodoList = () => {
    setTitle("");
    setRequester("");
    setReqManager("");
    setStatusVal("대기");
    setDataValue(formattedDate);
  }

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visibleAdd}
      onRequestClose={onDismiss}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.centeredView}
      >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.modalView}>
          <Text style={styles.title}>
            To Do List
            <Icon name="favorite" color="#FF69B4" size={16} />
          </Text>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>제목</Text>
            <TextInput
              style={styles.textInput} multiline={true} value={title}
              placeholder="제목을 적어주세요"
              onChangeText={setTitle}
            />
          </View>
          <View style={styles.inputGroup}>
            <View style={styles.inputContainer}>
              <Text style={styles.label}>완료 목표 요일</Text>
              <Picker
                selectedValue={period}
                style={styles.picker}
                onValueChange={(itemValue, itemIndex) => setPeriod(itemValue)}
              >
                {periodOptions.map((option) => (
                  <Picker.Item key={option} label={option} value={option} />
                ))}
              </Picker>
            </View>
            <View style={styles.inputContainer}>
              <Text style={styles.label}>요청자</Text>
              <TextInput
                style={styles.input}
                onChangeText={setRequester}
                value={requester}
                placeholder="이름작성 해주세요!!"
              />
            </View>
            <View style={[styles.inputContainer, { marginLeft: 5 }]}>
              <Text style={styles.label}>요청 담당자</Text>
              <TextInput
                style={styles.input}
                onChangeText={setReqManager}
                value={reqManager}
                placeholder="이름작성 해주세요!!"
              />
            </View>
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>상태 표시</Text>
            <View style={styles.dropdown}>
              <ChipComponent setStatusVal={setStatusVal} statusVal={''} />
            </View>
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>내용</Text>
            <TextInput
              style={styles.textArea}
              multiline={true} // 여러 줄 입력 가능하게 설정
              value={dataValue}
              onChangeText={setDataValue}
              placeholder="YYYY/MM/DD - " // 사용자를 위한 플레이스홀더 텍스트
              numberOfLines={15} // iOS에서 고정된 줄 수를 제안, Android에서는 스크롤 가능
            />
          </View>
          <View style={styles.buttonContainer}>
            <TouchableOpacity onPress={handleAdd} style={styles.addButton}>
              <Text style={styles.buttonText}>Add</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleCancel} style={styles.cancelButton}>
              <Text style={styles.buttonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.4)", // Semi-transparent background
  },
  scrollContainer: {
    width: '95%',
    marginTop: 3,
  },
  modalView: {
    backgroundColor: "#EEEE",
    borderRadius: 20,
    padding: 15,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    minWidth: '100%',
    maxWidth: '100%',
  },
  inputContainer: {
    marginVertical: 8,
  },
  label: {
    fontSize: 14,
    marginBottom: 8,
  },
  textInput: {
    borderColor: "#222",
    borderWidth: 1,
    padding: 8,
    borderRadius: 4,
  },
  dropdown: {
    borderColor: "#222",
    borderWidth: 1,
    padding: 8,
    borderRadius: 4,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  textArea: {
    borderColor: "#222",
    borderWidth: 1,
    padding: 8,
    borderRadius: 4,
    height: 300,
    textAlign: 'left',
    textAlignVertical: 'top',
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    gap: 10,
  },
  addButton: {
    backgroundColor: "#66A593",
    padding: 8,
    borderRadius: 4,
  },
  cancelButton: {
    backgroundColor: "#CF8083",
    padding: 8,
    borderRadius: 4,
  },
  buttonText: {
    color: "white",
  },
  title: {
    fontSize: 25,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  inputGroup: {
    flexDirection: 'row', // 요소들을 가로로 나열
  },
  picker: {
    width: 115,
  },
  input: {
    width: 120,
    borderWidth: 1,
    borderColor: '#222',
    padding: 8,
    borderRadius: 4,
  }
});

export default ModalComponent;