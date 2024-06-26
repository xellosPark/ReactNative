import api from './api';
const UpdateSubEdit = async (item, name, selectedProjectName, project, subRow, index) => {
    //const ip = `http://localhost:3000`;
    //const ip = `http://192.168.0.140:8877`;
    //const ip = `http://192.168.0.136:8877`;
    const ip = `http://14.58.108.70:8877`;
    //let project = ''

    // const _ProjectName = selectedProjectName.replace(/ /g, '_');
    // const index = _ProjectName.indexOf('(');
    // if (index !== -1) {
    //     project = _ProjectName.substring(0, index);
    // }
    // else project = _ProjectName; // '(' 기호가 없는 경우, 전체 텍스트 반환
    return api.post(`${ip}/subUpdateBoard`, {
        Index: index,
        ProjectName: selectedProjectName,
        _ProjectName: project,
        ChangeDate: item.setDate,
        Name: name,
        Title: item.title,
        Content: item.content,
        Status: item.status,
        FieldNum: item.Key,
        FieldSubNum: subRow,
    }, {
        headers: {
            "Content-Type": "application/json",
        }
    }).then(response => {
        if (response.status === 200) {
            return response.status;
        } else if (response.data.code === 403) { //에러메세지 로그 없이 처리하려할때
            console.log("403");

        }
    }).catch(error => {
        //console.log({error});
        if (error.response.status === 403) {
            alert(`${error.response.data.message}`);
        }
    });
}

export default UpdateSubEdit;