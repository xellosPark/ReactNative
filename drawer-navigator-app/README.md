expo 설치
npm install -g expo-cli

reactnative 설치 
npx create-expo-app 제목

가상 핸들폰에 실행
npx expo start

npm install react-native-webview

먼저 종속성과 함께 @react-navigation/native 패키지를 설치해야 합니다.
npm install @react-navigation/native

React Navigation에는 또한 직접 설치해야 하는 몇 가지 피어 종속성이 필요합니다
npm install react-native-screens react-native-safe-area-context

네이티브 스택 탐색기를 사용하는 경우 @react-navigation/native-stack을 설치해야 합니다.
npm install @react-navigation/native-stack

하단 탭 탐색기를 사용하려면 @react-navigation/bottom-tabs를 설치해야 합니다.
npm install @react-navigation/bottom-tabs

여기설치
npm install @react-navigation/stack
npm install @react-navigation/native-stack

npm install react-native-gesture-handler react-native-reanimated

npm install @react-navigation/bottom-tabs

npm install @react-navigation/native
npm install @react-navigation/stack
expo install react-native-screens react-native-safe-area-context

# Expo를 사용하는 경우
expo install react-native-gesture-handler

# Expo를 사용하지 않는 경우
npm uninstall react-native-gesture-handler
npm install react-native-gesture-handler
# 또는
yarn remove react-native-gesture-handler
yarn add react-native-gesture-handler