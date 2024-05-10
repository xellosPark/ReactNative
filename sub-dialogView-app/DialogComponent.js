import React, { useState } from "react";
import { StyleSheet, Text, TextInput, View, Modal, TouchableOpacity } from "react-native";
import ChipComponent from "./ChipComponent";
import Icon from "react-native-vector-icons/MaterialIcons";

const ModalComponent = ({ visible, onDismiss }) => {

  const currentDate = new Date();
  const formattedDate = `${currentDate.getFullYear()}/${(currentDate.getMonth() + 1).toString().padStart(2, '0')}/${currentDate.getDate().toString().padStart(2, '0')} - `;

  // Use state to hold and manage the input value
  const [dateValue, setDateValue] = useState(formattedDate);

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onDismiss} // This is used to handle the hardware back press on Android.
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={styles.title}>
            To Do List
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
    backgroundColor: "white",
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
    borderColor: "#ccc",
    borderWidth: 1,
    padding: 8,
    borderRadius: 4,
  },
  dropdown: {
    borderColor: "#ccc",
    borderWidth: 1,
    padding: 8,
    borderRadius: 4,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  textArea: {
    borderColor: "#ccc",
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
    fontWeight: 'bold',
  },
});

export default ModalComponent;