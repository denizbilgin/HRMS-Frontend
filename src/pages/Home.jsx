import React, { useEffect } from "react";
import {
  Grid,
  Image,
  Dropdown,
  Button,
  Icon,
  Label,
  Container,
  Form,
} from "semantic-ui-react";
import Fullpage, {
  FullPageSections,
  FullpageSection,
} from "@ap.cx/react-fullpage";
import { useFormik } from "formik";
import JobPostingService from "../services/jobPostingService";
import CityService from "../services/cityService";
import JobPositionService from "../services/jobPositionService";
import { useState } from "react";
import { NavLink } from "react-router-dom";

export default function Home() {
  const formik = useFormik({
    initialValues: {
      cityId: "",
      positionId: "",
    },
    onSubmit: (values) => {
      let jobPostingService = new JobPostingService();
      jobPostingService
        .getByCityIdAndPositionId({ values })
        .then((result) => console.log(result.data.data));
    },
  });

  const [cities, setCities] = useState([]);
  const [jobPositions, setJobPositions] = useState([]);

  useEffect(() => {
    let cityService = new CityService();
    let jobPositionService = new JobPositionService();

    cityService.getCities().then((result) => setCities(result.data.data));
    console.log(cities);
    jobPositionService
      .getJobPositions()
      .then((result) => setJobPositions(result.data.data));
    console.log(jobPositions);
  }, []);

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

  const handleChangeSemantic = (value, fieldName) => {
    formik.setFieldValue(fieldName, value);
  };

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
                    <h1
                      style={{
                        color: "#199AD6",
                        marginTop: "2em",
                        fontSize: "42px",
                      }}
                    >
                      İş mi arıyorsunuz?
                    </h1>
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
                      <Form onSubmit={formik.handleSubmit}>
                        <Form.Field>
                          <Dropdown
                            style={{ marginTop: "20px" }}
                            placeholder="Şehir Seçiniz"
                            fluid
                            search
                            selection
                            onChange={(event, data) =>
                              handleChangeSemantic(data.value, "cityId")
                            }
                            options={cityOptions}
                            value={formik.values.cityId}
                            onBlur={formik.onBlur}
                            item
                          />
                        </Form.Field>
                        <Form.Field>
                          <Dropdown
                            style={{ marginTop: "10px" }}
                            placeholder="İş Pozisyonu Seçiniz"
                            fluid
                            search
                            selection
                            onChange={(event, data) =>
                              handleChangeSemantic(data.value, "positionId")
                            }
                            options={jobPositionOptions}
                            value={formik.values.positionId}
                            onBlur={formik.onBlur}
                            item
                          />
                        </Form.Field>
                        <Button
                          content="Ara"
                          labelPosition="right"
                          icon="search"
                          primary
                          fluid
                          type="submit"
                          style={{ marginTop: "10px" }}
                          as={NavLink}
                          to={`/jobpostings/cityId/${formik.values.cityId}/positionId/${formik.values.positionId}`}
                        />
                      </Form>
                    </div>
                  </Grid.Column>
                  <Grid.Column width={8}>
                    <Image
                      src="http://localhost:3000/homepic.png"
                      size="big"
                      style={{ paddingRight: "0px" }}
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
                    <h1
                      style={{
                        color: "#199AD6",
                        marginTop: "1em",
                        fontSize: "42px",
                        marginLeft: "60px",
                      }}
                    >
                      Hayalinizdeki İş Burada
                    </h1>
                    <div style={{ marginLeft: "60px", marginTop: "4rem" }}>
                      <div className="my-white-background">
                        <b>DevHrms</b> ile artık işsizliğe son!
                      </div>
                      <br />
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
                  style={{
                    marginBottom: "0px",
                    paddingBottom: "0px",
                    height: "500px",
                  }}
                >
                  <Grid.Column width={6} style={{ height: "500px" }}>
                    <div>
                      <h1
                        style={{
                          color: "#199AD6",
                          marginTop: "2em",
                          fontSize: "42px",
                        }}
                      >
                        Nasıl Kullanılır?
                      </h1>
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
                            }}
                          >
                            1
                          </Label>
                          Üye Olun
                          <Icon
                            name="check"
                            style={{ float: "right", color: "#199AD6" }}
                          />
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
                            }}
                          >
                            2
                          </Label>
                          Özgeçmişinizi doldurun ve paylaşın
                          <Icon
                            name="check"
                            style={{ float: "right", color: "#199AD6" }}
                          />
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
                            }}
                          >
                            3
                          </Label>
                          İş ilanlarından size uygun olanı bulun ve iş verenle
                          iletişime geçin
                          <Icon
                            name="check"
                            style={{ float: "right", color: "#199AD6" }}
                          />
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
