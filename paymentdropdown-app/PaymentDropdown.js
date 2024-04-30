import React, { useState } from "react";
import { StyleSheet, View, Text } from "react-native";
import { Picker } from "@react-native-picker/picker";

const PaymentDropdown = () => {
  const [selectedOption, setSelectedOption] = useState("");

  return (
    <View style={styles.container}>
      <Text style={styles.label}>프로젝트 선택</Text>
      <Picker
        selectedValue={selectedOption}
        style={styles.picker}
        onValueChange={(itemValue) => setSelectedOption(itemValue)}
      >
        <Picker.Item label="프로젝트 선택1" value="프로젝트 선택1" />
        <Picker.Item label="프로젝트 선택2" value="프로젝트 선택2" />
        <Picker.Item label="프로젝트 선택3" value="프로젝트 선택3" />
        <Picker.Item label="프로젝트 선택4" value="프로젝트 선택4" />
      </Picker>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  label: {
    fontSize: 18,
    marginBottom: 8,
  },
  picker: {
    height: 50,
    width: 250,
  },
});

export default PaymentDropdown;