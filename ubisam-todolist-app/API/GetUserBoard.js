import api from './api';

const GetUserBoard = async (name, item, selectProject) => {
    //const ip = `http://localhost:3000`;
    //const ip = `http://192.168.0.140:8877`;
    //const ip = `http://192.168.0.136:8877`;
    const ip = `http://14.58.108.70:8877`;
    return await api.get(`${ip}/boardPersnal?Name=${name}`, { //get은 body없음
      headers: {
        "Content-Type": "application/json",
      }
    }).then((res) => {
      if (res.data) {
        //console.log('getPersnalBoard_DB',res.data);
        const dataRow = res.data.map((item, index) => ({
          title: item.Title,
          id: item.Index,
          project: item.ProjectName,
          date: item.Date,
          Name: item.Name,
          content: item.Content,
          category: item.Status,
          color: (item.Status === '대기' ? '#CCCCFF' : item.Status === '진행중' ? '#ADD8E6' : item.Status === '완료' ? '#FFD700' : item.Status === '이슈' ? '#FFC0CB' : '#fff'),
          //borderColor:     (item.Status === '대기' ? '#CCCCFF' : item.Status === '진행중' ? '#ADD8E6' : item.Status === '완료' ? '#FFD700' : item.Status === '이슈' ? '#FFC0CB' : '#fff'),
          //textColor: '#333'
        }));
        return dataRow;
      } else if (res.data.code === 403) { //에러메세지 로그 없이 처리하려할때
        console.log("403");
      }
    }).catch(error => {
      console.log({ error });
      if (error.response.status === 403) {
        alert(`${error.response.data.message}`);
      }
    });
};

export default GetUserBoard;