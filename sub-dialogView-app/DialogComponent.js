import React from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import { Dialog, Portal, Button as PaperButton } from "react-native-paper";

const DialogComponent = ({ visible, onDismiss }) => {
  return (
    <Portal>
      <Dialog visible={visible} onDismiss={onDismiss} style={styles.dialog}>
        <Dialog.Title>To Do List</Dialog.Title>
        <Dialog.Content>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>제목</Text>
            <TextInput style={styles.textInput} placeholder="제목을 적어주세요" />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>상태 표시</Text>
            <View style={styles.dropdown}>
              {/* Implement a custom dropdown UI here */}
              <Text>대기</Text>
            </View>
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>내용</Text>
            <TextInput style={styles.textArea} multiline />
          </View>
        </Dialog.Content>
        <Dialog.Actions>
          <View style={styles.buttonContainer}>
            <PaperButton onPress={onDismiss} style={styles.addButton}>
              <Text style={styles.buttonText}>Add</Text>
            </PaperButton>
            <PaperButton onPress={onDismiss} style={styles.cancelButton}>
              <Text style={styles.buttonText}>Cancel</Text>
            </PaperButton>
          </View>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
};

const styles = StyleSheet.create({
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
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    gap: 10,
  },
  addButton: {
    backgroundColor: "#66A593",
    color: "white",
    padding: 1,
    borderRadius: 4,
  },
  cancelButton: {
    backgroundColor: "#CF8083",
    color: "white",
    padding: 1,
    borderRadius: 4,
  },
  buttonText: {
    color: "white",
  },
});

export default DialogComponent;