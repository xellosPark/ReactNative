// import React from 'react';
// import { StyleSheet, Text, View } from 'react-native';
// import { WebView } from 'react-native-webview';
// import { StatusBar } from 'expo-status-bar';

// const YOUTUBE = 'https://www.youtube.com/c/CodePalace/videos';
// const GOOGLE = 'https://www.google.com/';
// const Ubisam = 'http://ubisam.iptime.org:8877/'

// export default function App() {
//   return (
//     <View style={styles.container}>
//       <StatusBar style="auto" />
//       <View style={{ width: '100%', height: '100%' }}>
//         <WebView
//           source={{ uri: Ubisam }}
//           onLoad={() => console.log('Loaded!')}
//         />
//       </View>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });
import React from 'react';
import { StyleSheet, View, StatusBar } from 'react-native';
import { WebView } from 'react-native-webview';

const Ubisam = 'http://ubisam.iptime.org:8877/';

export default function App() {
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <WebView
        style={styles.webviewStyle}
        source={{ uri: Ubisam }}
        onLoad={() => console.log('Loaded!')}
        scalesPageToFit={true}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  webviewStyle: {
    width: '100%',
    height: '100%'
  },
});