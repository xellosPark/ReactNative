import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ADD8E6', // 연한 파스텔 블루 배경색
        alignItems: 'center', // 모든 자식들 가운데 정렬
        justifyContent: 'center', // 세로 방향으로 가운데 정렬
        padding: 20, // 모든 방향에 20의 패딩 적용
      },
      input: {
        backgroundColor: '#FFFFFF', // 입력 필드의 배경색은 흰색
        borderRadius: 20, // 입력 필드의 모서리는 둥글게
        width: '80%', // 입력 필드의 너비는 전체의 80%
        padding: 15, // 입력 필드 내부 패딩
        marginVertical: 10, // 수직 방향 마진
        fontSize: 16, // 텍스트 크기
        color: '#A9A9A9', // 텍스트 색상은 회색
      },
      loginButton: {
        backgroundColor: '#FFE5A4', // 로그인 버튼의 배경색은 연한 분홍색
        borderRadius: 20, // 버튼의 모서리는 둥글게
        width: '80%', // 버튼의 너비는 전체의 80%
        padding: 15, // 버튼 내부 패딩
        marginVertical: 10, // 수직 방향 마진
        alignItems: 'center', // 텍스트 가운데 정렬
      },
      loginButtonText: {
        fontSize: 16, // 로그인 텍스트 크기
        color: '#696969', // 로그인 텍스트 색상은 진한 회색
      },
      forgotPasswordText: {
        color: '#778899', // '비밀번호를 잊으셨나요?' 텍스트 색상은 회색
        fontSize: 14, // 텍스트 크기
        marginTop: 15, // 위쪽 마진
      },
      logoStack: {
        flexDirection: 'row',
        alignItems: 'center', // Adjust as per your vertical alignment needs
        justifyContent: 'center',
        marginTop: 20, // Space above the logo
        marginBottom: 50, // Space below the logo before the form starts
      },
      logoU: {
        fontSize: 50,
        fontWeight: 'bold',
        color: '#3F4257', // Assuming U is blue, replace with the exact color code
      },
      logoBi: {
        fontSize: 40,
        fontWeight: 'bold',
        marginTop: 8,
        color: '#3F4257', // Replace with the exact color code
      },
      logoS: {
        fontSize: 50,
        fontWeight: 'bold',
        color: '#2F97F8', // Assuming S is also blue, replace with the exact color code
      },
      logoAm: {
        fontSize: 40,
        fontWeight: 'bold',
        marginTop: 8,
        color: '#2F97F8', // Replace with the exact color code
      },
      rssIcon: {
        fontSize: 30, // Adjust the size as needed
        backgroundColor: '#2F97F8',
        color: '#f2f2f2', // Replace with the color code for the icon
        fontWeight: 'bold',
        padding: 2,
        marginLeft: 5, // Space between the text and icon
        marginBottom: 20,
      },
      titleContainer: {
        flexDirection: 'row', // To align title parts in one line
        marginTop: 20,
      },
      title: {
        fontSize: 50,
        fontWeight: 'bold',
      },
      titleTo: {
        color: '#F678BA', // Bright red
      },
      titleDo: {
        color: '#3F4257', // Bright green
      },
      titleList: {
        color: '#3F4257', // Bright blue
      },
      logoutButton: {
        backgroundColor: '#FF6347', // Choose a color that stands out or fits your design
        padding: 15,
        borderRadius: 5,
        marginTop: 20,
        width: '80%',
        alignItems: 'center', // Center text in the button
      },
      logoutButtonText: {
        color: '#FFFFFF',
        fontSize: 16,
      }
});