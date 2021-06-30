import axios from "axios";

export default class LanguageService{
    
    update(values){
        return axios.post("http://localhost:8080/api/languages/update",values)
    }
    
    add(values){
        values.candidate = {
            id: values.candidateId
        }
        return axios.post("http://localhost:8080/api/languages/add",values)
    }

    delete(languageId){
        return axios.post("http://localhost:8080/api/languages/delete?languageId="+languageId)
    }
}