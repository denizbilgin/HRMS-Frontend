import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import CityService from "../services/cityService";
import JobPositionService from "../services/jobPositionService";
import {
  Button,
  Dropdown,
  Input,
  Card,
  Form,
} from "semantic-ui-react";
import EmployerService from "../services/employerService";
import JobTypeService from "../services/jobTypeService";
import WorkingTimeService from "../services/workingTimeService";
import * as Yup from 'yup';
import JobPostingService from "../services/jobPostingService";

export default function AddJobPosting() {

    const addValidationSchema = Yup.object({
        employerId: Yup.number().required("Zorunlu Alan"),
        jobPositionId: Yup.number().required("Zorunlu Alan"),
        cityId: Yup.number().required("Zorunlu Alan"),
        jobDescription: Yup.string().max(50,"Açıklama En fazla 50 karakter olabilir").required("Zorunlu Alan"),
        jobTypeId: Yup.number().required("Zorunlu Alan"),
        minSalary: Yup.number().min(0,"Maaş 0'dan düşük olamaz").required("Zorunlu Alan"),
        maxSalary: Yup.number().min(0,"Max Maaş 0'dan düşük olamaz").required("Zorunlu Alan"),
        numberOfOpenPosition: Yup.number().min(1,"Aranan Eleman sayısı en düşük 0 olabilir").required("Zorunlu Alan"),
        workingTimeId: Yup.number().required("Zorunlu Alan"),
        deadlineDate: Yup.date().min("2021-06-21","Bu günden eski tarih adına paylaşım yapamazsınız").required("Zorunlu Alan")
    });

  const formik = useFormik({
    initialValues: {
      employerId: "",
      jobPositionId: "",
      cityId: "",
      jobDescription: "",
      jobTypeId: "",
      minSalary: "",
      maxSalary: "",
      numberOfOpenPosition: "",
      workingTimeId: "",
      deadlineDate: "",
    },
    validationSchema:addValidationSchema,
    onSubmit: (values, {resetForm}) => {
      let jobPostingService = new JobPostingService();

      jobPostingService.addJobPosting(values).then((result) => console.log(result.data.data));
      resetForm({})
    }
  });




  const [cities, setCities] = useState([]);
  const [employers, setEmployers] = useState([]);
  const [jobPositions, setJobPositions] = useState([]);
  const [jobTypes, setJobTypes] = useState([]);
  const [workingTimes, setWorkingTimes] = useState([])




  useEffect(() => {
    let cityService = new CityService();
    let employerService = new EmployerService();
    let jobPositionService = new JobPositionService();
    let jobTypeService = new JobTypeService();
    let workingTypeService = new WorkingTimeService();

    cityService.getCities().then((result) => setCities(result.data.data));
    employerService.getEmployers().then((result) => setEmployers(result.data.data));
    jobPositionService.getJobPositions().then((result) => setJobPositions(result.data.data));
    jobTypeService.getJobTypes().then((result) => setJobTypes(result.data.data));
    workingTypeService.getWorkingTimes().then((result) => setWorkingTimes(result.data.data))
  }, []);




  const cityOptions = cities.map((city, index) => ({
    key: index,
    text: city.cityName,
    value: city.id,
  }));

  const employerOptions = employers.map((employer, index) => ({
    key: index,
    text: employer.companyName,
    value: employer.id,
  }));

  const jobPositionOptions = jobPositions.map((jobPosition, index) => ({
    key: index,
    text: jobPosition.positionName,
    value: jobPosition.positionId,
  }));

  const jobTypeOptions = jobTypes.map((jobType, index) => ({
    key: index,
    text: jobType.jobTypeName,
    value: jobType.id,
  }));

  const workingTimeOptions = workingTimes.map((workingTime, index) => ({
    key: index,
    text: workingTime.workingTimeName,
    value: workingTime.id,
  }));





  const handleChangeSemantic = (value, fieldName) => {
    formik.setFieldValue(fieldName, value);
  };




  return (
    <div>
      <Card fluid>
        <Card.Content header="İş ilanı ekle" />
        <Card.Content>
          <Form onSubmit={formik.handleSubmit}>
            <Form.Field>
              <Dropdown
                clearable
                item
                search
                placeholder="İşveren"
                selection
                onChange={(event, data) =>
                  handleChangeSemantic(data.value, "employerId")
                }
                onBlur={formik.onBlur}
                id="id"
                value={formik.values.employerId}
                options={employerOptions}
              />
            </Form.Field>
            <Form.Field>
              <Dropdown
                clearable
                search
                item
                placeholder="İş Pozisyonu"
                selection
                onChange={(event, data) =>
                  handleChangeSemantic(data.value, "jobPositionId")
                }
                onBlur={formik.onBlur}
                id="id"
                value={formik.values.jobPositionId}
                options={jobPositionOptions}
              />
            </Form.Field>
            <Form.Field>
              <Dropdown
                search
                clearable
                item
                placeholder="Şehir"
                selection
                onChange={(event, data) =>
                  handleChangeSemantic(data.value, "cityId")
                }
                onBlur={formik.onBlur}
                id="id"
                value={formik.values.cityId}
                options={cityOptions}
              />
            </Form.Field>
            <Form.Field>
                <Input
                type="text"
                placeholder="İş açıklaması"
                value={formik.values.jobDescription}
                onChange={formik.handleChange}
                onBlur={formik.onBlur}
                name="jobDescription"
                >
                </Input>
            </Form.Field>
            <Form.Field>
              <Dropdown
                search
                clearable
                item
                placeholder="İş tipi"
                selection
                onChange={(event, data) =>
                  handleChangeSemantic(data.value, "jobTypeId")
                }
                onBlur={formik.onBlur}
                id="id"
                value={formik.values.jobTypeId}
                options={jobTypeOptions}
              />
            </Form.Field>
            <Form.Field>
                <Input
                type="number"
                placeholder="Min Salary"
                value={formik.values.minSalary}
                onChange={formik.handleChange}
                onBlur={formik.onBlur}
                name="minSalary"
                >
                </Input>
            </Form.Field>
            <Form.Field>
                <Input
                type="number"
                placeholder="Max Salary"
                value={formik.values.maxSalary}
                onChange={formik.handleChange}
                onBlur={formik.onBlur}
                name="maxSalary"
                >
                </Input>
            </Form.Field>
            <Form.Field>
                <Input
                type="number"
                placeholder="Number Of Open Position"
                value={formik.values.numberOfOpenPosition}
                onChange={formik.handleChange}
                onBlur={formik.onBlur}
                name="numberOfOpenPosition"
                >
                </Input>
            </Form.Field>
            <Form.Field>
              <Dropdown
                clearable
                search
                item
                placeholder="Working Times"
                selection
                onChange={(event, data) =>
                  handleChangeSemantic(data.value, "workingTimeId")
                }
                onBlur={formik.onBlur}
                id="id"
                value={formik.values.workingTimeId}
                options={workingTimeOptions}
              />
            </Form.Field>
            <Form.Field>
                <Input
                type="date"
                placeholder="Deadline Date"
                value={formik.values.deadlineDate}
                onChange={formik.handleChange}
                onBlur={formik.onBlur}
                name="deadlineDate"
                >
                </Input>
            </Form.Field>
            <Button
                content="Ekle"
                labelPosition="right"
                icon="add"
                primary
                type="submit"
                style={{ marginLeft: "20px" }}
              />
          </Form>
        </Card.Content>
      </Card>
    </div>
  );
}
