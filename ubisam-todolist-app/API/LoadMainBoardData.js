import api from './api';

const LoadMainBoardData = async (projectName) => {
//console.log(`Board Data 불러오기`);
    //const ip = process.env.REACT_APP_API_DEV === "true" ? `http://192.168.0.136:8877` : `http://14.58.108.70:8877`;
    //const ip = `http://192.168.0.140:8877`;
    //const ip = `http://192.168.0.136:8877`;
    //const ip = `http://localhost:3000`;
    const ip = `http://14.58.108.70:8877`;

    //console.log("MainBoardData ip",ip);
    return await api.post(`${ip}/Board`, {
        projectName: projectName,
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
                Requester: item.Requester,
                ReqManager: item.ReqManager,
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

export default LoadMainBoardData;