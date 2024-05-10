import React, { useState } from "react";
import { StyleSheet, View, Button, SafeAreaView } from "react-native";
import DialogComponent from "./DialogComponent"; // Ensure the path is correct

const App = () => {
  const [visible, setVisible] = useState(false);

  const showDialog = () => setVisible(true);
  const hideDialog = () => setVisible(false);

  return (
    <SafeAreaView style={styles.container}>
      <Button title="Show Dialog" onPress={showDialog} />
      <DialogComponent visible={visible} onDismiss={hideDialog} />
    </SafeAreaView>
    
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default App;