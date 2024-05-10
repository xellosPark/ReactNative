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
    { label: "알  림", value: "알  림"},
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
    flexDirection: "row",
    flexWrap: "nowrap",
    gap: 2,
  },
  chip: {
    backgroundColor: "#C7C8CC",
    paddingHorizontal: 1,
    borderWidth: 1,
    borderColor: "#D3D3D3",
    borderRadius: 24,
  },
  selectedChip: {
    backgroundColor: "#4793AF",
    borderWidth: 1,
    borderColor: "#D3D3D3",
    borderRadius: 24,
  },
  chipText: {
    color: "#4793AF",
    fontWeight: 'bold'
  },
  selectedChipText: {
    color: "white",
    fontWeight: 'bold'
  },
});

export default ChipComponent;