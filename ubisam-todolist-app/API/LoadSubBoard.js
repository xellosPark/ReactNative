import api from './api';

const LoadSubBoard = async (subdata) => {
    //const ip = process.env.REACT_APP_API_DEV === "true" ? `http://192.168.0.136:8877` : `http://14.58.108.70:8877`;
    //const ip = `http://192.168.0.140:8877`;
    //const ip = `http://192.168.0.136:8877`;
    //const ip = `http://localhost:3000`;
    const ip = `http://14.58.108.70:8877`;

    let project = '';
    let results = [];
    for (const item of subdata) {
        // Replace spaces with underscores in the project name
        const _ProjectName = item.project.replace(/ /g, "_");
        const index = _ProjectName.indexOf('(');
        if (index !== -1) {
            project = _ProjectName.substring(0, index);
        }
        else project = _ProjectName; // '(' 기호가 없는 경우, 전체 텍스트 반환
        try {
            const res = await api.post(
                `${ip}/subLoadBoard`,
                {
                    ProjectName: item.project,
                    _ProjectName: project,
                },
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );

            if (res.data) {
                //console.log("subLoadBoard 124", res.data);
                //results.push(res.data); // Collect the successful response
                //return res.data;
                results = [...results, ...res.data];
            } else if (res.data.code === 403) {
                console.log(
                    "403 Forbidden - the server understood the request but refuses to authorize it."
                );
                // Handle 403 error if needed, perhaps pushing an error object onto results
            }
        } catch (error) {
            console.error("Request failed for project", _ProjectName, error);
            if (error.response && error.response.status === 403) {
                alert(`${error.response.data.message}`);
            }
            // Depending on your error handling, you might want to continue or break the loop
        }
    }
    return results;
};

export default LoadSubBoard;