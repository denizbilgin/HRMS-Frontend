import React, { useEffect } from "react";
import * as Yup from "yup";
import { useHistory } from "react-router-dom";
import { Formik, Form } from "formik";
import {
  Grid,
  Image,
  Button,
  Icon,
  Label,
  Container
} from "semantic-ui-react";
import Fullpage, {
  FullPageSections,
  FullpageSection,
} from "@ap.cx/react-fullpage";
import CityService from "../services/cityService";
import JobPositionService from "../services/jobPositionService";
import { useState } from "react";
import DevHrmsDropdownInput from "../utilities/customFormControls/DevHrmsDropdownInput";

export default function Home() {
  const initialValues = {
    cityId:"",
    positionId:""
  }

  const schema = Yup.object({
    cityId : Yup.number().required("Lütfen Bir Şehir Seçiniz"),
    positionId: Yup.number().required("Lütfen Bir İş Pozisyonu Seçiniz")
  })

  const [cities, setCities] = useState([]);
  const [jobPositions, setJobPositions] = useState([]);

  const cityOptions = cities.map((city, index) => ({
    key: index,
    text: city.cityName,
    value: city.id,
  }));

  const jobPositionOptions = jobPositions.map((jobPosition, index) => ({
    key: index,
    text: jobPosition.positionName,
    value: jobPosition.positionId,
  }));

  const history = useHistory();

  useEffect(() => {
    let cityService = new CityService();
    let jobPositionService = new JobPositionService();

    cityService.getCities().then((result) => setCities(result.data.data));
    jobPositionService
      .getJobPositions()
      .then((result) => setJobPositions(result.data.data));
  }, []);

  function handleRoute(cityId,positionId) {
    history.push(`/jobpostings/cityId/${cityId}/positionId/${positionId}`)
  }


  return (
    <div>
      <Fullpage>
        <FullPageSections>
          <Container>
            <FullpageSection
              style={{
                padding: "1em",
                paddingTop: "10em",
              }}
            >
              <Grid>
                <Grid.Row>
                  <Grid.Column width={8}>
                    <div
                      style={{
                        color: "#199AD6",
                        marginTop: "2.5em",
                        paddingBottom:"15px",
                        fontSize: "42px",
                      }}
                    >
                      <b>İş mi arıyorsunuz?</b>
                    </div>
                    <div
                      className="my-white-background"
                      style={{ marginTop: "20px" }}
                    >
                      <div>Hangi Şehirde Ve Hangi Pozisyonda Çalışmak</div>
                      <div
                        style={{
                          fontSize: "25px",
                          marginTop: "0.5em",
                        }}
                      >
                        İstersiniz ?
                      </div>
                      <Formik
                      initialValues = {initialValues}
                      validationSchema = {schema}
                      onSubmit = {(values) => {
                        handleRoute(values.cityId,values.positionId)
                      }}
                      >
                        <Form>
                          <DevHrmsDropdownInput
                            options={cityOptions}
                            placeholder="Şehir Seçiniz"
                            name="cityId"
                            className = "my-input"
                            />
                          <DevHrmsDropdownInput
                            options={jobPositionOptions}
                            placeholder="İş Pozisyonu Seçiniz"
                            name="positionId"
                            className = "my-input"
                             />
                          <Button
                          content="Ara"
                          labelPosition="right"
                          icon="search"
                          primary
                          fluid
                          type="submit"
                          style={{ marginTop: "10px" }}
                          />
                        </Form>
                      </Formik>
                    </div>
                  </Grid.Column>
                  <Grid.Column width={8}>
                    <Image
                      src="http://localhost:3000/homepic.png"
                      size="big"
                      style={{ paddingRight: "0px" ,marginLeft:"30px",marginTop:"30px"}}
                    ></Image>
                  </Grid.Column>
                </Grid.Row>
              </Grid>
            </FullpageSection>
            <FullpageSection
              style={{
                padding: "1em",
                paddingTop: "10em",
              }}
            >
              <Grid>
                <Grid.Row>
                  <Grid.Column width={8}>
                    <Image
                      src="http://localhost:3000/file-search.png"
                      size="huge"
                    ></Image>
                  </Grid.Column>
                  <Grid.Column width={8}>
                    <div
                      style={{
                        color: "#199AD6",
                        marginTop: "2em",
                        fontSize: "42px",
                        marginLeft: "60px",
                        lineHeight:"40px"
                      }}
                    >
                      <b>Hayalinizdeki İş Burada</b>
                    </div>
                    <div style={{ marginLeft: "60px", marginTop: "2rem" }}>
                      <div className="my-white-background">
                        <b>DevHrms</b> ile artık işsizliğe son!
                      </div>
                      <br />
                      <br />
                      Size uygun olan işi bulmak artık mümkün. Hemen üye olun,
                      kolay ve hızlı arama imkanlarından faydalanın.
                    </div>
                  </Grid.Column>
                </Grid.Row>
              </Grid>
            </FullpageSection>
            <FullpageSection
              style={{
                padding: "1em",
                paddingTop: "10em",
              }}
            >
              <Grid>
                <Grid.Row
                  className="cv-row"
                >
                  <Grid.Column width={6}>
                    <div>
                      <div
                        style={{
                          color: "#199AD6",
                          fontSize: "42px",
                        }}
                      >
                        <b>Nasıl Kullanılır?</b>
                      </div>
                      <div style={{ marginTop: "30px" }}>
                        <div
                          className="my-white-background"
                          style={{ marginTop: "1em" }}
                        >
                          <Label
                            style={{
                              float: "left",
                              backgroundColor: "#199AD6",
                              color: "white",
                              marginRight:"10px"
                            }}
                          >
                            1
                          </Label>
                          Üye Olun
                        </div>
                        <div
                          className="my-white-background"
                          style={{ marginTop: "1em" }}
                        >
                          <Label
                            style={{
                              float: "left",
                              backgroundColor: "#199AD6",
                              color: "white",
                              marginRight:"10px"
                            }}
                          >
                            2
                          </Label>
                          Özgeçmişinizi doldurun ve paylaşın
                        </div>
                        <div
                          className="my-white-background"
                          style={{ marginTop: "1em" }}
                        >
                          <Label
                            style={{
                              float: "left",
                              backgroundColor: "#199AD6",
                              color: "white",
                              marginRight:"10px"
                            }}
                          >
                            3
                          </Label>
                          İş ilanlarından size uygun olanı bulun ve iş verenle
                          iletişime geçin
                        </div>
                      </div>
                    </div>
                  </Grid.Column>
                  <Grid.Column width={10} style={{ padding: "0px" }}>
                    <Image
                      src="http://localhost:3000/cv.png"
                      size="massive"
                      className="cv-image"
                    ></Image>
                  </Grid.Column>
                </Grid.Row>
              </Grid>
            </FullpageSection>
          </Container>
        </FullPageSections>
      </Fullpage>
    </div>
  );
}
