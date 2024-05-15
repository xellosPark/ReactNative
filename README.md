expo 설치
npm install -g expo-cli

reactnative 설치 
npx create-expo-app 제목

reactnative eas 사용한다 설치 
npm install -g eas-cli

명령어 통해 login 
eas login

설정
eas build:configure

npx create-expo-app --template


eae. json 설정 변경

  "build": {
    "preview": {
      "android": {
        "buildType": "apk"
      }
    },
    "preview2": {
      "android": {
        "gradleCommand": ":app:assembleRelease"
      }
    },
    "preview3": {
      "developmentClient": true
    },
    "preview4": {
      "distribution": "internal"
    },
    "production": {}
  }

실행 방법
eas build -p android --profile preview


expo-auth-session : 웹 브라우저를 사용해 사용자인증 관리하고, 토큰 반환받는데에 필요한 redirection, 상태 관리 로직처리해줌
expo-crypto : 데이터 해싱
expo-web-browser : 사용자에게 웹 브라우저 제공하여 외부 웹 페이지나 URL를 열 수 있게 해줌
react-native-web : RN코드를 웹에서 실행할 수 있게 도와주는 라이브러리. 하나의 코드베이스로 iOS, Android, Web 앱을 개발할 수 있게 된다.
react-dom : React 애플리케이션을 웹 페이지에 렌더링하는데 필요한 라이브러리
@expo/webpack-config : Expo 프로젝트에서 Webpack구성을 사용자화하거나 확장할 때 사용되는 유틸리티
@react-native-async-storage/async-storage : 로컬 디바이스에 데이터를 비동기적으로 저장하고 접근하는데 사용되는 라이브러리. 보통 세션 또는 간단한 데이터를 저장하는데 사용됨

npm install axios

npm install @react-native-async-storage/async-storage

Error: The required package `expo-asset` cannot be found 오류시
npm install expo-asset

Android Bundling failed 오류시
npm install expo-constants