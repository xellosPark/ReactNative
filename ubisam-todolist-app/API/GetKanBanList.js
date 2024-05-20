import api from './api';

const GetKanBanList = async (selectProject) => {
    //const ip = `http://localhost:3000`;
    //const ip = `http://192.168.0.140:8877`;
    //const ip = `http://192.168.0.136:8877`;
    const ip = `http://14.58.108.70:8877`;
    return await api.get(`${ip}/loadKanBanList?Project=${encodeURIComponent(selectProject)}`, { //get은 body없음
        headers: {
            "Content-Type": "application/json",
        }
    }).then((res) => {
        //console.log('getProject', { res });
        if (res.data) {
            //console.log('kanban load', res.data);
            return res.data;
        } else if (res.data.code === 403) { //에러메세지 로그 없이 처리하려할때
            console.log("403");
        }
    }).catch(error => {
        console.log({ error });
        if (error.response.status === 403) {
            alert(`${error.response.data.message}`);
        }
    });

}

export default GetKanBanList;