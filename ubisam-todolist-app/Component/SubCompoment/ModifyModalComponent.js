import React, { useDebugValue, useEffect, useState } from "react";
import { StyleSheet, View, Text, TextInput, TouchableOpacity, Modal, ScrollView } from "react-native";
import ChipComponent from "./ChipComponent";
import Icon from "react-native-vector-icons/MaterialIcons";
import { Picker } from '@react-native-picker/picker';
import UpdateTodoList from "../../API/UpdateTodoList";
import UpdateDate from "../../API/UpdateDate";
import AddSubEdit from "../../API/AddSubEdit";
import UpdateSubEdit from "../../API/UpdateSubEdit";

const ModifyModalComponent = ({ data, name, selectProject, visibleModify, onDismiss }) => {

  const currentDate = new Date();
  const formattedDate = `${currentDate.getFullYear()}/${(currentDate.getMonth() + 1).toString().padStart(2, '0')}/${currentDate.getDate().toString().padStart(2, '0')} - `;
  const setDate = `${currentDate.getFullYear()}-${(currentDate.getMonth() + 1).toString().padStart(2, '0')}-${currentDate.getDate().toString().padStart(2, '0')}`;

  const [dataValue, setDataValue] = useState(formattedDate);
  const periodOptions = ["1일", "2일", "3일", "4일", "5일", "6일", "7일", "8일", "9일", "10일", "11일", "12일", "13일", "14일", "15일"];
  const [isExpanded, setIsExpanded] = useState(false);

  const [title, setTitle] = useState("");
  const [period, setPeriod] = useState("1일");
  const [statusVal, setStatusVal] = useState("대기");
  const [oldStatusVal, setOldStatusVal] = useState("대기");
  const [subRows, setSubRows] = useState([]);

  const [events, setEvents] = useState([
    { id: 1, date: new Date(2024, 4, 7), color: "#CCFFCC", title: "Event 1", content: "2024/05/01 - 내용 12345678901234567890123456789121231233543534521312312321312312321012345678901234567890" },
    { id: 2, date: new Date(2024, 4, 7), color: "#CCCCFF", title: "Event 2", content: "2024/05/02 - 내용2" },
    { id: 3, date: new Date(2024, 4, 7), color: "#FFF67E", title: "Event 2", content: "2024/05/03 - 내용3" },
    { id: 4, date: new Date(2024, 4, 7), color: "#B7E9F7", title: "Event 2", content: "2024/05/04 - 내용4" },
    { id: 5, date: new Date(2024, 4, 8), color: "#FFC0CB", title: "Event 2", content: "2024/05/05 - 내용5" },
    { id: 6, date: new Date(2024, 4, 8), color: "#FFFFCC", title: "Event 3", content: "2024/05/06 - 내용6" },

  ]);

  const toggleNumberOfLines = () => {
    setIsExpanded(!isExpanded);
  };

  const handleAdd = async () => {
    let result = 0;
    //const cleanDropdown = statusVal.replace(/ /g, '');
    const item = {
      Key: data.key,
      title: title,
      setDate: setDate,
      status: statusVal,
      content: dataValue
    };
    console.log('handleAdd 24', item);

    if (item.setDate !== data.date) {
      let subNum = 0;

      const _ProjectName = selectProject.replace(/ /g, '_');
      const index = _ProjectName.indexOf('(');
      if (index !== -1) {
        project = _ProjectName.substring(0, index);
      }
      else project = _ProjectName; // '(' 기호가 없는 경우, 전체 텍스트 반환

      if (subRows.length > 0) { // sub 게시물이 추가되어 있고 날짜가 다르다면 새로운 sub게시물 추가
        if (subRows[subRows.length - 1].Data !== setDate) {
          subNum = subRows[subRows.length - 1].FieldSubNum + 1;
          console.log(`sub Add222 ${item}`);
          await AddSubEdit(item, name, selectProject, project, subNum);// - 추가 필요
        } else { // sub 게시물이 추가되어 있고 날짜가 같으면 해당 sub 업데이트
          console.log(`Edit Update ${item}`);
          await UpdateSubEdit(item, name, selectProject, project, subRows[subRows.length - 1]);// - 추가 필요
        }

      } else { // sub 게시물이 하나도 없다면 새로 추가
        subNum = 1;
        console.log(`sub Add111`, item);
        result = await AddSubEdit(item, name, selectProject, project, subNum);
      }

      //await UpdateDate(item, name, selectProject);
    } else {
      //내용 업데이트
      console.log('같은 날짜 업데이트', item);
      result = await UpdateTodoList(item, name, selectProject);
    }

    if (result !== 200) {
      alert('업데이트에 실패했습니다. 관리자에게 문의해보세요', result);
      return;
    };

    initTodoList();
    onDismiss();
  };

  const initTodoList = () => {
    setTitle("");
    setStatusVal("");
    setDataValue(formattedDate);
    setSubRows([]);
  }

  const handleCancel = () => {
    initTodoList();
    onDismiss();
  };

  useEffect(() => {
    const setInitData = async () => {
      //console.log('edit data', data);
      if (data?.details === undefined) {
        await setTitle(data.title);
        await setDataValue(data.content);
        await setPeriod(data.period);
        await setStatusVal(data.status);
        await setOldStatusVal(data.status);
        await setSubRows([]);
      } else {
        if (data?.details.length > 0) {
          const { Index, Key, ProjectName, date, changedate, Name, Title, content, Status, Period, Requester, details } = data;
          const parentRow = { Index, Key, ProjectName, date, changedate, Name, Title, content, Status, Period, Requester };
          
          setTitle(data?.details[data.details.length - 1].Title);
          if (data?.details[data.details.length - 1].Date === setDate) {
            setDataValue(data?.details[data.details.length - 1].Content);
          }
          setStatusVal(data?.details[data.details.length - 1].Status);
          setOldStatusVal(data?.details[data.details.length - 1].Status);
          const newSubRows = [parentRow, ...details];
          setSubRows(newSubRows);
          console.log('show ', newSubRows);
        }
      }
    };
    setInitData();
  }, [data]);

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visibleModify}
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
              style={styles.textInput} multiline={true} value={title}
              placeholder="제목을 적어주세요"
              onChangeText={setTitle}
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>상태 표시</Text>
            <View style={styles.dropdown}>
              {statusVal && <ChipComponent setStatusVal={setStatusVal} statusVal={statusVal} />}
            </View>
          </View>
          {subRows?.length > 0 && (
            <>
              <Text style={styles.label}>진행 내용</Text>
              <ScrollView style={styles.scrollView}>
                {subRows.map((event) => (
                  <View key={event.Index} style={styles.eventContainer}>
                    <View style={[styles.colorIndicator, { backgroundColor: event.color },]} />
                    {/* <Text style={styles.eventContent}>{event.content}</Text> */}
                    <Text style={styles.eventContent} numberOfLines={isExpanded ? 0 : 2}>
                      {event.Content}
                    </Text>
                    {event.Content?.length > 100 && (
                      <TouchableOpacity onPress={toggleNumberOfLines}>
                        <Text style={styles.moreButton}>{isExpanded ? "접기🔼" : "더 보기🔽"}</Text>
                      </TouchableOpacity>
                    )}
                  </View>
                ))}
              </ScrollView>
            </>
          )}

          <View style={styles.inputContainer}>
            <Text style={styles.label}>내용</Text>
            <TextInput
              style={styles.textArea}
              multiline={true} // 여러 줄 입력 가능하게 설정
              value={dataValue}
              onChangeText={setDataValue}
              placeholder="YYYY/MM/DD - " // 사용자를 위한 플레이스홀더 텍스트
              numberOfLines={5} // iOS에서 고정된 줄 수를 제안, Android에서는 스크롤 가능
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
    padding: 25,
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
    width: "100%",
  },
  inputContainer: {
    marginVertical: 4,
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
    padding: 2,
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
    flexDirection: 'column',
    alignItems: 'left',
    marginBottom: 1,
  },
  eventContent: {
    flex: 1,
    marginRight: 8,
  },
  moreButton: {
    fontWeight: 'bold',
    color: '#1E90FF',
  },

});

export default ModifyModalComponent;