
import api from './api';

const ProjectInfoData = async (name) => {
    //const ip = `http://localhost:3000`;
    //const ip = `http://192.168.0.140:8877`;
    //const ip = `http://192.168.0.136:8877`;
    //const ip = `http://14.58.108.70:8877`;
    const ip = `http://192.168.45.171:8877`;
    //console.log("MainBoardData ip", ip);
    return await api.get(`${ip}/BoardProject?Name=${encodeURIComponent(name)}`, {
    }, {
        headers: {
            "Content-Type": "application/json",
        }
    }).then(response => {
        //console.log('projectInfo 14',response.status);
        if (response.status === 200) {
            // 응답 데이터 전체를 출력
            console.log('response 17');
            const newDataRow = response.data.map((item, index) => ({
                id: index + 1,
                key: item.ProjectName,
                text: item.ProjectName,
                period: item.Period,
                status: item.Status,
                pm : item.PM
            }));
            //console.log('response 24',newDataRow);
            return newDataRow;

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

export default ProjectInfoData;