import React, { useState } from "react";
import { StyleSheet, View, Text, TextInput, TouchableOpacity, Modal, ScrollView } from "react-native";
import ChipComponent from "./ChipComponent";
import Icon from "react-native-vector-icons/MaterialIcons";
import { Picker } from '@react-native-picker/picker';


const ModalComponent = ({ visible, onDismiss }) => {

  const currentDate = new Date();
  const formattedDate = `${currentDate.getFullYear()}/${(currentDate.getMonth() + 1).toString().padStart(2, '0')}/${currentDate.getDate().toString().padStart(2, '0')} - `;
  
  const [dateValue, setDateValue] = useState(formattedDate);
  const [isExpanded, setIsExpanded] = useState(false);
  
  const [events, setEvents] = useState([
    { id: 1, date: new Date(2024, 4, 7), color: "#CCFFCC", title: "Event 1",content: "2024/05/01 - 내용 12345678901234567890123456789121231233543534521312312321312312321012345678901234567890"},
    { id: 2, date: new Date(2024, 4, 7), color: "#CCCCFF", title: "Event 2",content: "2024/05/02 - 내용2"},
    { id: 3, date: new Date(2024, 4, 7), color: "#FFF67E", title: "Event 2",content: "2024/05/03 - 내용3"},
    { id: 4, date: new Date(2024, 4, 7), color: "#B7E9F7", title: "Event 2",content: "2024/05/04 - 내용4"},
    { id: 5, date: new Date(2024, 4, 8), color: "#FFC0CB", title: "Event 2",content: "2024/05/05 - 내용5"},
    { id: 6, date: new Date(2024, 4, 8), color: "#FFFFCC", title: "Event 3",content: "2024/05/06 - 내용6"},
    
  ]);
 
  const toggleNumberOfLines = () => {
    setIsExpanded(!isExpanded); 
  };

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
                <View style={[ styles.colorIndicator,{ backgroundColor: event.color },]}/>
                {/* <Text style={styles.eventContent}>{event.content}</Text> */}
                <Text style={styles.eventContent}numberOfLines={isExpanded ? 0 : 2}>
                  {event.content}
                </Text>
                {event.content.length > 60 && (
                  <TouchableOpacity onPress={toggleNumberOfLines}>
                    <Text style={styles.moreButton}>{isExpanded ? "접기🔼" : "더 보기🔽"}</Text>
                  </TouchableOpacity>
                )}
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
    height: 150,
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
    maxHeight: 150,
  },
  colorIndicator: {
    width: 15,
    height: 15,
    borderRadius: 20,
    marginRight: 8,
  },
  eventContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  eventContent: {
    flex: 1, 
    marginRight: 8, 
  },
  moreButton: {
    fontWeight: 'bold',
    color: '#1E90FF',
    marginTop: 5,
  },

});

export default ModalComponent;