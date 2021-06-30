import axios from "axios";

export default class SkillService{
    
    update(values){
        return axios.post("http://localhost:8080/api/skills/update",values)
    }
}