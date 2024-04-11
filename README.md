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
