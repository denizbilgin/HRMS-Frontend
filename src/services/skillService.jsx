import axios from "axios";

export default class SkillService{
    
    update(values){
        return axios.post("http://localhost:8080/api/skills/update",values)
    }

    add(values){
        values.candidate = {
            id: values.candidateId
        }
        return axios.post("http://localhost:8080/api/skills/add",values)
    }

    delete(skillId){
        return axios.post("http://localhost:8080/api/skills/delete?skillId="+skillId)
    }
}