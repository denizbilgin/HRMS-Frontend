import React from "react";
import DevHrmsDropdownInput from "../utilities/customFormControls/DevHrmsDropdownInput";
import { useState, useEffect } from "react";
import CityService from "../services/cityService";
import WorkingTimeService from "../services/workingTimeService";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { Grid, Button } from "semantic-ui-react";
import JobPostingService from "../services/jobPostingService";
import { useHistory } from "react-router";

export default function JobPostingFilter() {
  const initialValues = {
    cityId: "",
    workingTimeId: "",
  };

  const paginationInitialValues = {
    pageNo: 1,
    pageSize: "",
  };

  const paginationSchema = Yup.object({
    pageNo: Yup.number(),
    pageSize: Yup.number().required("Sayfa Büyüklüğü Girmek Zorunludur"),
  });

  const schema = Yup.object({
    cityId: Yup.number(),
    workingTimeId: Yup.number(),
  });

  const [cities, setCities] = useState([]);
  const [workingTimes, setWorkingTimes] = useState([]);

  const cityOptions = cities.map((city, index) => ({
    key: index,
    text: city.cityName,
    value: city.id,
  }));

  const workingTimeOptions = workingTimes.map((workingTime, index) => ({
    key: index,
    text: workingTime.workingTimeName,
    value: workingTime.id,
  }));

  const history = useHistory();

  const paginationOptions = [
    { key: 1, text: 5, value: 5 },
    { key: 2, text: 10, value: 10 },
    { key: 3, text: 20, value: 20 },
    { key: 4, text: 50, value: 50 },
    { key: 5, text: 100, value: 100 },
    { key: 6, text: 1, value: 1 },
  ];

  useEffect(() => {
    let cityService = new CityService();
    let workingTimeService = new WorkingTimeService();

    cityService.getCities().then((result) => setCities(result.data.data));
    workingTimeService
      .getWorkingTimes()
      .then((result) => setWorkingTimes(result.data.data));
  }, []);

  function handleFilter(values) {
    if (values.cityId && values.workingTimeId) {
      history.push(
        `/jobpostings/cityId/${values.cityId}/workingTimeId/${values.workingTimeId}`
      );
    } else if (values.cityId) {
      history.push(`/jobpostings/cityId/${values.cityId}`);
    } else if (values.workingTimeId) {
      history.push(`/jobpostings/workingTimeId/${values.workingTimeId}`);
    }
  }

  function handlePagination(values) {
    history.push(
      `/jobpostings/getallbypage/pageNo/${values.pageNo}/pageSize/${values.pageSize}`
    );
  }

  return (
    <div>
      <Grid>
        <Grid.Row>
          <Grid.Column width={12}>
            <Formik
              initialValues={initialValues}
              validationSchema={schema}
              onSubmit={(values) => {
                handleFilter(values);
              }}
            >
              <Form>
                <Grid>
                  <Grid.Row>
                    <Grid.Column width={6}>
                      <DevHrmsDropdownInput
                        options={cityOptions}
                        placeholder="Şehir Seçiniz"
                        name="cityId"
                        className="my-input"
                      />
                    </Grid.Column>
                    <Grid.Column width={6}>
                      <DevHrmsDropdownInput
                        options={workingTimeOptions}
                        placeholder="Çalışma Zamanı Seçiniz"
                        name="workingTimeId"
                        className="my-input"
                      />
                    </Grid.Column>
                    <Grid.Column width={4}>
                      <Button
                        fluid
                        content="Filtrele"
                        icon="search"
                        primary
                        type="submit"
                        style={{ marginTop: "10px" }}
                      />
                    </Grid.Column>
                  </Grid.Row>
                </Grid>
              </Form>
            </Formik>
          </Grid.Column>
          <Grid.Column width={4}>
            <Formik
              initialValues={paginationInitialValues}
              validationSchema={paginationSchema}
              onSubmit={(values) => {
                handlePagination(values);
              }}
            >
              <Form>
                <Grid>
                  <Grid.Row>
                    <Grid.Column width={13}>
                      <DevHrmsDropdownInput
                        options={paginationOptions}
                        placeholder="Sayfa Büyüklüğü Seçiniz"
                        name="pageSize"
                        className="my-input"
                      />
                    </Grid.Column>
                    <Grid.Column width={3} style={{paddingLeft:"0"}}>
                      <Button
                        fluid
                        icon="arrow alternate circle right outline"
                        primary
                        type="submit"
                        style={{ marginTop: "10px", borderRadius:"30px"}}
                      />
                    </Grid.Column>
                  </Grid.Row>
                </Grid>
              </Form>
            </Formik>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </div>
  );
}
