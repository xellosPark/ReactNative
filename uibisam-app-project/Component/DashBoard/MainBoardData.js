// export const bulletinBoardData = [
//     {
//       id: '1.8.7',
//       date: '1 month ago',
//       content: 'In the morning, I was recommended a school that driving students no longer attend. Your favorite snack is on the menu today.',
//     },
//     {
//       id: '1.8.6',
//       date: '2 months ago',
//       content: 'The community garden has started planting new seeds, and we\'re excited for the harvest season!',
//     },
//     {
//       id: '1.8.5',
//       date: '2 months ago',
//       content: 'Local artists have painted a new mural downtown. It’s a must-see for art enthusiasts!',
//     },
//     {
//       id: '1.8.4',
//       date: '3 months ago',
//       content: 'The yearly book fair is coming up next weekend. Great deals on a wide range of genres!',
//     },
//     {
//       id: '1.8.3',
//       date: '3 months ago',
//       content: 'A group of volunteers organized a beach cleanup. Join us for a day of giving back to nature.',
//     },
//     {
//       id: '1.8.2',
//       date: '4 months ago',
//       content: 'Our football team made it to the finals! Game night watch party at the community center.',
//     },
//     {
//       id: '1.8.1',
//       date: '5 months ago',
//       content: 'New smoothie bar opened by the park with healthy, delicious options. First drink is on the house!',
//     },
//     {
//       id: '1.8.0',
//       date: '6 months ago',
//       content: 'Jazz in the park this weekend. Bring your picnic blankets and enjoy the music.',
//     },
//     {
//       id: '1.7.9',
//       date: '7 months ago',
//       content: 'A lost puppy was found near the library. Please contact the shelter if you recognize him.',
//     },
//     {
//       id: '1.7.8',
//       date: '7 months ago',
//       content: 'Cooking classes now available at the community center. Sign up to learn some gourmet recipes!',
//     },
//     // Add more items as needed...
//   ];

// export const MainBoardData = [
//     {
//       order: '01',
//       title: 'School Recommendation',
//       date: '2024-04-29',
//       name: '홍길동',
//       content: 'In the morning, I was recommended a school that driving students no longer attend. Your favorite snack is on the menu today.',
//       status: '이슈' // 상태 추가
//     },
//     {
//       order: '02',
//       title: 'Community Garden Update',
//       date: '2024-04-29',
//       name: '홍길동',
//       content: 'The community garden has started planting new seeds, and we\'re excited for the harvest season!',
//       status: '대기' // 상태 추가
//     },
//     {
//       order: '03',
//       title: 'New Mural Downtown',
//       date: '2024-04-29',
//       name: '홍길동',
//       content: 'Local artists have painted a new mural downtown. It’s a must-see for art enthusiasts!',
//       status: '대기' // 상태 추가
//     },
//     {
//       order: '04',
//       title: 'Book Fair Announcement',
//       date: '2024-04-29',
//       name: '홍길동',
//       content: 'The yearly book fair is coming up next weekend. Great deals on a wide range of genres!',
//       status: '진행중' // 상태 추가
//     },
//     {
//       order: '05',
//       title: 'Beach Cleanup Initiative',
//       date: '2024-04-29',
//       name: '홍길동',
//       content: 'A group of volunteers organized a beach cleanup. Join us for a day of giving back to nature.',
//       status: '대기' // 상태 추가
//     },
//     {
//       order: '06',
//       title: 'Football Finals Party',
//       date: '2024-04-29',
//       name: '홍길동',
//       content: 'Our football team made it to the finals! Game night watch party at the community center.',
//       status: '대기' // 상태 추가
//     },
//     {
//       order: '07',
//       title: 'Smoothie Bar Opening',
//       date: '2024-04-29',
//       name: '홍길동',
//       content: 'New smoothie bar opened by the park with healthy, delicious options. First drink is on the house!',
//       status: '대기' // 상태 추가
//     },
//     {
//       order: '08',
//       title: 'Jazz Weekend',
//       date: '2024-04-29',
//       name: '홍길동',
//       content: 'Jazz in the park this weekend. Bring your picnic blankets and enjoy the music.',
//       status: '완료' // 상태 추가
//     },
//     {
//       order: '09',
//       title: 'Lost Puppy Alert',
//       date: '2024-04-29',
//       name: '홍길동',
//       content: 'A lost puppy was found near the library. Please contact the shelter if you recognize him.',
//       status: '완료' // 상태 추가
//     },
//     {
//       order: '10',
//       title: 'Cooking Classes',
//       date: '2024-04-29',
//       name: '홍길동',
//       content: 'Cooking classes now available at the community center. Sign up to learn some gourmet recipes!',
//       status: '진행중' // 상태 추가
//     }
//   ];
  
import axios from 'axios';
import api from '../../API/api';

const MainBoardData = async () => {
  //console.log(`Board Data 불러오기`);
  //const ip = process.env.REACT_APP_API_DEV === "true" ? `http://192.168.0.136:8877` : `http://14.58.108.70:8877`;
  //const ip = `http://192.168.0.136:8877`;
  const ip = `http://192.168.0.140:8877`;

  console.log("MainBoardData ip",ip);
  return await api.post(`${ip}/Board`, {
      projectName: "First", // 나중에 변경
  }, {
      headers: {
          "Content-Type": "application/json",
      }
  }).then(response => {
      if (response.status === 200) {
        // 응답 데이터 전체를 출력
          const newDataRow = response.data.data.map((item, index) => ({
              Key: item.Index,
              Index: index + 1, // 예시로 index 사용, 실제 구현에서는 서버로부터의 데이터에 따라 조정
              ProjectName: item.ProjectName, // 서버로부터 받은 데이터 구조에 따라 접근
              Date: item.Date, // 예시 날짜, 실제로는 동적으로 설정
              ChangeDate: item.ChangeDate,
              Name: item.Name, // 서버로부터 받은 데이터 구조에 따라 접근
              Title: item.Title, // 서버로부터 받은 데이터 구조에 따라 접근
              Content: item.Content, // 서버로부터 받은 데이터 구조에 따라 접근
              Status: item.Status, // 서버로부터 받은 데이터 구조에 따라 접근
              Plus: item.Plus
          }));
          //console.log("newData 166 = ", newDataRow);
          const sortedData = newDataRow.sort((a, b) => new Date(b.Index) - new Date(a.Index)); //최신부터 보여줌
          return sortedData;

      } else if (response.data.code === 403) { //에러메세지 로그 없이 처리하려할때
          console.log("403");
          return '403';
      }
  }).catch(error => {
      //console.log({error});
      if (error.response.status === 403) {
          alert(`${error.response.data.message}`);
      }
      return '403';
  });
};

export default MainBoardData;