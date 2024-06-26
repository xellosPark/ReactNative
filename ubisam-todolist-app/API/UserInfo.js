import api from './api';

const UserInfo = async (id, name) => {
    //const ip = `http://localhost:3000`;
    //const ip = `http://192.168.0.140:8877`;
    //const ip = `http://192.168.0.136:8877`;
    const ip = `http://14.58.108.70:8877`;
    
    return await api.get(`${ip}/getUserInfo?userEmail=${encodeURIComponent(id)}&name=${encodeURIComponent(name)}`, { //get은 body없음
        headers: {
            "Content-Type": "application/json",
        }
    }).then((res) => {
        //console.log('UserInfo 14');
        if (res.data.userData) {
            //console.log('userData 14');
            return res.data.userData;
        } else if (res.data.code === 403) { //에러메세지 로그 없이 처리하려할때
            console.log("403");
        } else {
            //console.log('userData none 19', res.data);
        }
    }).catch(error => {
        console.log({ error });
        if (error.response.status === 403) {
            alert(`${error.response.data.message}`);
        }
    });
};

export default UserInfo;