import axios from "axios";

export default class LanguageService{
    
    update(values){
        return axios.post("http://localhost:8080/api/languages/update",values)
    }
}