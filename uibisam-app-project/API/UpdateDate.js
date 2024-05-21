import api from './api';

const UpdateDate = async (item, name, selectProject) => {
    //const ip = `http://localhost:3000`;
    const ip = `http://192.168.0.140:8877`;
    //const ip = `http://192.168.0.136:8877`;
    //const ip = `http://14.58.108.70:8877`;
    //const ip = `http://192.168.45.171:8877`;
    return api.post(`${ip}/updateDateList`, {
        Index: item.Key,
        ProjectName: selectProject,
        Name: name,
        ChangeDate : item.setDate,
        Title: item.title,
    }, {
        headers: {
            "Content-Type": "application/json",
        }
    }).then(response => {
        console.log({ response });
        if (response.status === 200) {
        } else if (response.data.code === 403) { //에러메세지 로그 없이 처리하려할때
            console.log("403");

        }
    }).catch(error => {
        //console.log({error});
        if (error.response.status === 403) {
            alert(`${error.response.data.message}`);
        }
    });
};

export default UpdateDate;