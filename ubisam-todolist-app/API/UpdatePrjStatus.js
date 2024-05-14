import api from './api';

const UpdatePrjStatus = async (prjName, name) => {
    //const ip = `http://localhost:3000`;
    //const ip = `http://192.168.0.140:8877`;
    //const ip = `http://192.168.0.136:8877`;
    const ip = `http://14.58.108.70:8877`;
    await api.post(`${ip}/UpdateUserImpPrj`, {
        projectName: prjName, // 나중에 변경
        userName: name,
    }, {
        headers: {
            "Content-Type": "application/json",
            withCredentials: true,
        }
    }).then(response => {
        if (response.status === 200) {

        } else if (response.data.code === 403) { //에러메세지 로그 없이 처리하려할때
            console.log("403");
        }
    }).catch(error => {
        if (error.response.status === 500) {
            alert(`${error.response.data.message}`);
        }
    });


};

export default UpdatePrjStatus;