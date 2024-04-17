import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import LogInView from './LogInView';
import StatsCard from './pageUI/StatsCard';

export default function App() {
  return (
    <>
      {/* <LogInView/> */}
      <StatsCard/>
    </>
  );
}

