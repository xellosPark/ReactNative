import React, { useState } from "react";
import { StyleSheet, View, Text } from "react-native";
import { Chip } from "react-native-paper";

const ChipComponent = () => {
  const [selectedChip, setSelectedChip] = useState("전 체");

  const chipOptions = [
    { label: "전 체", value: "전 체" },
    { label: "홍길동", value: "홍길동" },
    { label: "길동이", value: "길동이" },
    { label: "김철수", value: "김철수" },
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
    padding: 12,
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
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