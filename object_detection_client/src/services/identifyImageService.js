import http from "./httpService"

const apiEndPoint = '/api/object_detection';

export async function objectsInImage(id, image) {
    const headers = {
        'Content-Type': 'application/json'
    };
    
    return await http.post(apiEndPoint,{id, image}, headers);
}