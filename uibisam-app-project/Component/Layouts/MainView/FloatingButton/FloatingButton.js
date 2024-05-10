import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const FloatingButton = ({ onPress, icon = "add-outline", iconSize = 30, iconColor = "#fff", style = {} }) => {
  return (
    <TouchableOpacity style={[styles.button, style]} onPress={onPress}>
      <Icon name={icon} size={iconSize} color={iconColor} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#F1A3A3',
    borderRadius: 50,
    padding: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
});

export default FloatingButton;