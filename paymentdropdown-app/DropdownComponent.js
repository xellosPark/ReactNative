import React, { useState } from "react";
import { StyleSheet, View, Text, TouchableOpacity, FlatList } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";

const DropdownComponent = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");

  const options = [
    { label: "프로젝트 선택1", value: "프로젝트 선택1" },
    { label: "프로젝트 선택2", value: "프로젝트 선택2" },
    { label: "프로젝트 선택3", value: "프로젝트 선택3" },
    { label: "프로젝트 선택4", value: "프로젝트 선택4" },
  ];

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.dropdownButton}
        onPress={() => setShowDropdown(!showDropdown)}
      >
        <Text style={styles.buttonText}>
          {selectedOption || "프로젝트 선택"}
        </Text>
        <Icon name={showDropdown ? "expand-less" : "expand-more"} size={20} />
      </TouchableOpacity>

      {showDropdown && (
        <FlatList
          data={options}
          keyExtractor={(item) => item.value}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.option}
              onPress={() => {
                setSelectedOption(item.label);
                setShowDropdown(false);
              }}
            >
              <Text style={styles.optionText}>{item.label}</Text>
            </TouchableOpacity>
          )}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  dropdownButton: {
    borderColor: "#aaa",
    borderWidth: 1,
    padding: 10,
    borderRadius: 4,
    backgroundColor: "#fff",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  buttonText: {
    fontSize: 16,
  },
  option: {
    borderColor: "#ccc",
    borderWidth: 1,
    padding: 10,
    backgroundColor: "#f8f8f8",
  },
  optionText: {
    fontSize: 16,
  },
});

export default DropdownComponent;