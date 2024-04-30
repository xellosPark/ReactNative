import React from "react";
import { SafeAreaView } from "react-native";
import PaymentDropdown from "./PaymentDropdown"; // Ensure to point to the correct file path
import DropdownComponent from "./DropdownComponent";

const App = () => (
  <SafeAreaView>
    <PaymentDropdown /> 
    <DropdownComponent />
  </SafeAreaView>
);

export default App;