import axios from "axios";

export default class CandidateLinkService{
    
    add(values){
        values.candidate = {
            id: values.candidateId
        }
        values.linkType = {
            id: values.linkTypeId
        }
        values.id = values.linkId
        return axios.post("http://localhost:8080/api/candidatelinks/add",values);
    }

    update(values){
        values.candidate = {
            id: values.candidateId
        }
        values.linkType = {
            id: values.linkTypeId
        }
        values.id = values.linkId
        return axios.post("http://localhost:8080/api/candidatelinks/update",values)
    }

    delete(linkId){
        return axios.post("http://localhost:8080/api/candidatelinks/delete?linkId="+linkId)
    }
}