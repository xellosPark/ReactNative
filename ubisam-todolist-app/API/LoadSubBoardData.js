import api from './api';

const LoadSubBoardData = async (projectName) => {
//console.log(`Board Data 불러오기`);
    //const ip = process.env.REACT_APP_API_DEV === "true" ? `http://192.168.0.136:8877` : `http://14.58.108.70:8877`;
    //const ip = `http://192.168.0.140:8877`;
    //const ip = `http://192.168.0.136:8877`;
    //const ip = `http://localhost:3000`;
    const ip = `http://14.58.108.70:8877`;

    let project = ''
    const _ProjectName = projectName.replace(/ /g, '_');
    const index = _ProjectName.indexOf('(');
    if (index !== -1) {
        project = _ProjectName.substring(0, index);
    }
    else project = _ProjectName; // '(' 기호가 없는 경우, 전체 텍스트 반환
    return await api.post(`${ip}/subLoadBoard`, {
        ProjectName: projectName,
        _ProjectName : project,
    }, {
        headers: {
            "Content-Type": "application/json",
        }
    }).then((res) => {
        //console.log('subLoadBoard', { res });
        if (res.data) {
            const dataRow = res.data;
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

export default LoadSubBoardData;