import React, { useState } from "react";
import { StyleSheet, View, Button, SafeAreaView } from "react-native";
import { Provider } from "react-native-paper";
import DialogComponent from "./DialogComponent"; // Ensure the path is correct

const App = () => {
  const [visible, setVisible] = useState(false);

  const showDialog = () => setVisible(true);
  const hideDialog = () => setVisible(false);

  return (
    <Provider>
      <SafeAreaView style={styles.container}>
        <Button title="Show Dialog" onPress={showDialog} />

        <DialogComponent visible={visible} onDismiss={hideDialog} />
      </SafeAreaView>
    </Provider>
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