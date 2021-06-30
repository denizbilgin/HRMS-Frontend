import axios from "axios";

export default class EmployerService{

    getEmployers(){
        return axios.get("http://localhost:8080/api/employers/getall")
    }

    getById(employerId){
        return axios.get("http://localhost:8080/api/employers/getById?employerId="+employerId)
    }

    update(values){
        return axios.post("http://localhost:8080/api/employers/waitingUpdate",values)
    }

    uploadImage(employerId,file){
        return axios.post("http://localhost:8080/api/employers/uploadImage?employerId="+employerId,file)
    }

}