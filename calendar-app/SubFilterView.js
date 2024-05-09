import React, { useState, useEffect } from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const SubFilterView = ({ visible, onClose, onConfirm, options }) => {
  const [selectedOptions, setSelectedOptions] = useState([]);

  useEffect(() => {
    // "전체"가 선택되면 다른 모든 선택을 해제합니다.
    if (selectedOptions.includes("전체") && selectedOptions.length > 1) {
      setSelectedOptions(["전체"]);
    }
  }, [selectedOptions]);

  const toggleOption = (option) => {
    if (option.label === "전체") {
      setSelectedOptions(["전체"]);
    } else {
      // 다른 옵션 선택 시 "전체" 선택 해제
      const newSelectedOptions = selectedOptions.filter(opt => opt !== "전체");
      if (selectedOptions.includes(option.label)) {
        setSelectedOptions(newSelectedOptions.filter(opt => opt !== option.label));
      } else {
        setSelectedOptions([...newSelectedOptions, option.label]);
      }
    }
  };

  const handleConfirm = () => {
    console.log("값",selectedOptions);
    onConfirm(selectedOptions); // 선택된 옵션을 부모 컴포넌트로 전달
    onClose(); // 모달을 닫습니다.
  };

  return (
    <Modal
      transparent={true}
      animationType="slide"
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
        <Text style={styles.titleText}>필터</Text> 
          {options.map((option, index) => (
            <TouchableOpacity
              key={index}
              style={[styles.optionButton, { backgroundColor: option.color }]}
              onPress={() => toggleOption(option)}
            >
              <Icon
                name={selectedOptions.includes(option.label) ? "checkbox-marked-circle" : "checkbox-blank-circle-outline"}
                size={24} color="black"
              />
              <Text style={styles.optionText}>{option.label}</Text>
            </TouchableOpacity>
          ))}
          <View style={styles.buttonRow}>
            <TouchableOpacity style={[styles.button, styles.okButton]} onPress={handleConfirm}>
              <Text style={styles.buttonText}>OK</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.button, styles.closeButton]} onPress={onClose}>
              <Text style={styles.buttonText}>Close</Text>
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
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)'
  },
  modalView: {
    margin: 20,
    backgroundColor: '#E6EDE3',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  titleText: { 
    marginBottom: 15,
    fontSize: 20,
    fontWeight: 'bold',
    color: '#222'
  },
  optionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    marginBottom: 10,
    borderRadius: 20,
    width: 250
  },
  optionText: {
    marginLeft: 10,
    color: '#222',
    fontSize: 16
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%'
  },
  button: {
    flex: 1,
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    margin: 5
  },
  button: {
    flex: 1, // Each button will take half the row
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    margin: 5
  },
  okButton: {
    backgroundColor: '#0299E2', // Green
  },
  closeButton: {
    backgroundColor: '#386667', // 
  },
  buttonText: {
    color: '#222',
    fontWeight: 'bold',
    textAlign: 'center'
  }
});

export default SubFilterView;