import React, { useState } from "react";
import { StyleSheet, View, Text } from "react-native";
import { Chip } from "react-native-paper";

const ChipComponent = () => {
  const [selectedChip, setSelectedChip] = useState("대 기");

  const chipOptions = [
    { label: "대  기", value: "대  기"},
    { label: "진행중", value: "진행중"},
    { label: "완  료", value: "완  료"},
    { label: "이  슈", value: "이  슈"},
  ];

  return (
    <View style={styles.container}>
      {chipOptions.map((chip) => (
        <Chip
          key={chip.value}
          onPress={() => setSelectedChip(chip.value)}
          style={selectedChip === chip.value ? styles.selectedChip : styles.chip}
        >
          <Text style={selectedChip === chip.value ? styles.selectedChipText : styles.chipText}>
            {chip.label}
          </Text>
        </Chip>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 5,
  },
  chip: {
    
    backgroundColor: "#375A7F",
    color: "white",
  },
  selectedChip: {
    backgroundColor: "#3498DB",
    color: "#3498DB",
  },
  chipText: {
    color: "white",
    fontWeight: 'bold'
  },
  selectedChipText: {
    color: "white",
    fontWeight: 'bold'
  },
});

export default ChipComponent;