import api from './api';

const AddSubEdit = async (orignal, item, name, selectProject) => {
    let project = ''
    //const ip = `http://localhost:3000`;
    const ip = `http://192.168.0.140:8877`;
    //const ip = `http://192.168.0.136:8877`;
    //const ip = `http://14.58.108.70:8877`;
    //const ip = `http://192.168.45.171:8877`;
    
    const _ProjectName = selectProject.replace(/ /g, '_');
    const index = _ProjectName.indexOf('(');
    if (index !== -1) {
        project = _ProjectName.substring(0, index);
    }
    else project = _ProjectName; // '(' 기호가 없는 경우, 전체 텍스트 반환
    return api.post(`${ip}/subAddBoard`, {
        ProjectName: selectProject,
        _ProjectName : project,
        Date: item. dateString,
        Name: name,
        Title: item.title,
        Content: item. content,
        Status: item. selectValue,
        FieldNum: orignal.Key,
        FieldSubNum: subNum,
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
export default AddSubEdit;