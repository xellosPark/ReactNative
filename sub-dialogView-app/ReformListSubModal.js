import React, { useState } from "react";
import { StyleSheet, View, Text, TextInput, TouchableOpacity, Modal, ScrollView } from "react-native";
import ChipComponent from "./ChipComponent";
import Icon from "react-native-vector-icons/MaterialIcons";
import { Picker } from '@react-native-picker/picker';


const ModalComponent = ({ visible, onDismiss }) => {

  const currentDate = new Date();
  const formattedDate = `${currentDate.getFullYear()}/${(currentDate.getMonth() + 1).toString().padStart(2, '0')}/${currentDate.getDate().toString().padStart(2, '0')} - `;
  
  const [dateValue, setDateValue] = useState(formattedDate);
  const periodOptions = ["1일", "2일", "3일", "4일", "5일", "6일", "7일", "8일", "9일", "10일","11일","12일","13일","14일","15일"]; 
  const [requester, setRequester] = useState("");
  const [period, setPeriod] = useState("1일");

  
  const [events, setEvents] = useState([
    { id: 1, date: new Date(2024, 4, 7), color: "#CCFFCC", title: "Event 1",content: "2024/05/01 - 내용1"},
    { id: 2, date: new Date(2024, 4, 7), color: "#CCCCFF", title: "Event 2",content: "2024/05/02 - 내용2"},
    { id: 3, date: new Date(2024, 4, 7), color: "#FFF67E", title: "Event 2",content: "2024/05/03 - 내용3"},
    { id: 4, date: new Date(2024, 4, 7), color: "#B7E9F7", title: "Event 2",content: "2024/05/04 - 내용4"},
    { id: 5, date: new Date(2024, 4, 8), color: "#FFC0CB", title: "Event 2",content: "2024/05/05 - 내용5"},
    { id: 6, date: new Date(2024, 4, 8), color: "#FFFFCC", title: "Event 3",content: "2024/05/06 - 내용6"},
    
  ]);

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onDismiss}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={styles.title}>
            ToDo Edit
            <Icon name="favorite" color="#FF69B4" size={16} />
          </Text>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>제목</Text>
            <TextInput
              style={styles.textInput}
              placeholder="제목을 적어주세요"
            />
          </View>
          
          <View style={styles.inputContainer}>
            <Text style={styles.label}>상태 표시</Text>
            <View style={styles.dropdown}>
              <ChipComponent />
            </View>
          </View>
          <Text style={styles.label}>진행 내용</Text>
          <ScrollView style={styles.scrollView}>
          {events.map((event) => (
              <View key={event.id} style={styles.eventContainer}>
                <Text style={styles.eventContent}>{event.content}</Text>
                  <View style={styles.underline}></View>
              </View>
            ))}
          </ScrollView>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>내용</Text>
            <TextInput
              style={styles.textArea}
              multiline={true} // 여러 줄 입력 가능하게 설정
              value={dateValue}
              onChangeText={setDateValue}
              placeholder="YYYY/MM/DD - " // 사용자를 위한 플레이스홀더 텍스트
              numberOfLines={5} // iOS에서 고정된 줄 수를 제안, Android에서는 스크롤 가능
            />
          </View>
          <View style={styles.buttonContainer}>
            <TouchableOpacity onPress={onDismiss} style={styles.addButton}>
              <Text style={styles.buttonText}>Add</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={onDismiss} style={styles.cancelButton}>
              <Text style={styles.buttonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
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
  modalView: {
    margin: 20,
    backgroundColor: "#EEEE",
    borderRadius: 20,
    padding: 35,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
  },
  dialog: {
    width: "90%",
  },
  inputContainer: {
    marginVertical: 8,
  },
  label: {
    fontSize: 14,
    marginBottom: 4,
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
    height: 100,
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
  },
  scrollView: {
    borderWidth: 1,
    padding: 8,
    borderRadius: 4,
    maxHeight: 100,
  },
  underline: {
    height: 1,
    backgroundColor: "#000",  // Black underline
    marginBottom: 10,
  },
});

export default ModalComponent;