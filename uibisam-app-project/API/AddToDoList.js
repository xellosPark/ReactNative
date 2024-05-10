import api from './api';

const AddToDoList = async (item, name) => {
    //const ip = `http://localhost:3000`;
    //const ip = `http://192.168.0.140:8877`;
    //const ip = `http://192.168.0.136:8877`;
    const ip = `http://14.58.108.70:8877`;
    console.log("AddToDoList ip", ip);
    
    return api.post(`${ip}/ToDoList`, {
        ProjectName: selectedProjectName,
        Date: dateString,
        Name: name,
        Title: task,
        Content: memo,
        Status: selectValue,
        FieldIndex: 0
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

export default AddToDoList;