import React, { useState } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import FloatingButton from './FloatingButton';

const App = () => {
  const [showEditButton, setShowEditButton] = useState(false); // State to track visibility

  const handleAddPress = () => {
    alert("Add button pressed!");
  };

  const handleEditPress = () => {
    alert("Edit button pressed!");
  };

  const toggleEditButton = () => {
    setShowEditButton(!showEditButton); // Toggle visibility
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Main Content</Text>

      {/* Test button as a toggle */}
      <Button 
        title="Toggle Edit Button" 
        onPress={toggleEditButton} 
      />

      {/* Add button */}
      <FloatingButton 
        onPress={handleAddPress}
        icon="add-outline"
        style={styles.addButton}
      />

      {/* Conditionally render the Edit button */}
      {showEditButton && (
        <FloatingButton 
          onPress={handleEditPress}
          icon="create-outline"
          style={styles.editButton}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 18,
  },
  addButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
  },
  editButton: {
    position: 'absolute',
    bottom: 80,  // Adjust positioning to be on top of the add button.
    right: 20,
  },
});

export default App;