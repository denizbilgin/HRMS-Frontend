import { Formik, Form } from "formik";
import React, { useEffect, useState } from "react";
import CityService from "../services/cityService";
import JobPositionService from "../services/jobPositionService";
import { Button, Card } from "semantic-ui-react";
import EmployerService from "../services/employerService";
import JobTypeService from "../services/jobTypeService";
import WorkingTimeService from "../services/workingTimeService";
import JobPostingService from "../services/jobPostingService"
import * as Yup from "yup";
import DevHrmsDropdownInput from "../utilities/customFormControls/DevHrmsDropdownInput";
import DevHrmsTextInput from "../utilities/customFormControls/DevHrmsTextInput";

export default function AddJobPosting() {
  const addValidationSchema = Yup.object({
    employerId: Yup.number().required("Zorunlu Alan"),
    jobPositionId: Yup.number().required("Zorunlu Alan"),
    cityId: Yup.number().required("Zorunlu Alan"),
    jobDescription: Yup.string()
      .max(50, "Açıklama En fazla 50 karakter olabilir")
      .required("Zorunlu Alan"),
    jobTypeId: Yup.number().required("Zorunlu Alan"),
    minSalary: Yup.number()
      .min(0, "Maaş 0'dan düşük olamaz")
      .required("Zorunlu Alan"),
    maxSalary: Yup.number()
      .min(0, "Max Maaş 0'dan düşük olamaz")
      .required("Zorunlu Alan"),
    numberOfOpenPosition: Yup.number()
      .min(1, "Aranan Eleman sayısı en düşük 0 olabilir")
      .required("Zorunlu Alan"),
    workingTimeId: Yup.number().required("Zorunlu Alan"),
    deadlineDate: Yup.date()
      .min("2021-06-21", "Bu günden eski tarih adına paylaşım yapamazsınız")
      .required("Zorunlu Alan"),
  });

  const initialValues = {
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
  };

  const [cities, setCities] = useState([]);
  const [employers, setEmployers] = useState([]);
  const [jobPositions, setJobPositions] = useState([]);
  const [jobTypes, setJobTypes] = useState([]);
  const [workingTimes, setWorkingTimes] = useState([]);

  useEffect(() => {
    let cityService = new CityService();
    let employerService = new EmployerService();
    let jobPositionService = new JobPositionService();
    let jobTypeService = new JobTypeService();
    let workingTypeService = new WorkingTimeService();

    cityService.getCities().then((result) => setCities(result.data.data));
    employerService
      .getEmployers()
      .then((result) => setEmployers(result.data.data));
    jobPositionService
      .getJobPositions()
      .then((result) => setJobPositions(result.data.data));
    jobTypeService
      .getJobTypes()
      .then((result) => setJobTypes(result.data.data));
    workingTypeService
      .getWorkingTimes()
      .then((result) => setWorkingTimes(result.data.data));
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

  function handleAddJobPosting(values) {
    let jobPostingService = new JobPostingService();
    jobPostingService.addJobPosting(values).then((result) => console.log(result.data.data))
  }

  return (
    <div>
      <Card fluid>
        <Card.Content header="İş ilanı ekle" />
        <Card.Content>
          <Formik
            initialValues={initialValues}
            validationSchema={addValidationSchema}
            onSubmit = {(values) => {
              handleAddJobPosting(values)
            }}
          >
            <Form>
              <DevHrmsDropdownInput
                options={employerOptions}
                placeholder="Bir İşveren Seçiniz"
                name="employerId"
                className="my-input"
              />
              <DevHrmsDropdownInput
                options={jobPositionOptions}
                placeholder="Bir İş Pozisyonu Seçiniz"
                name="jobPositionId"
                className="my-input"
              />
              <DevHrmsDropdownInput
                options={cityOptions}
                placeholder="Bir Şehir Seçiniz"
                name="cityId"
                className="my-input"
              />
              <DevHrmsTextInput
                name="jobDescription"
                type="text"
                placeholder="İş Açıklaması"
                className="my-input"
              />
              <DevHrmsDropdownInput
                options={jobTypeOptions}
                placeholder="Bir İş Tipi Seçiniz"
                name="jobTypeId"
                className="my-input"
              />
              <DevHrmsTextInput
                name="minSalary"
                type="number"
                placeholder="Minimum Maaş"
                className="my-input"
              />
              <DevHrmsTextInput
                name="maxSalary"
                type="number"
                placeholder="Maksimum Maaş"
                className="my-input"
              />
              <DevHrmsTextInput
                name="deadlineDate"
                type="date"
                placeholder="Son Erişim Tarihi"
                className="my-input"
              />
              <DevHrmsTextInput
                name="numberOfOpenPosition"
                type="number"
                placeholder="Açık Pozisyon Adedi"
                className="my-input"
              />
              <DevHrmsDropdownInput
                options={workingTimeOptions}
                placeholder="Bir Çalışma Zamanı Seçiniz"
                name="workingTimeId"
                className="my-input"
              />
              <Button
                content="İş İlanı Ekle"
                labelPosition="right"
                icon="add"
                primary
                fluid
                type="submit"
                style={{ marginTop: "10px" }}
              />
            </Form>
          </Formik>
        </Card.Content>
      </Card>
    </div>
  );
}
