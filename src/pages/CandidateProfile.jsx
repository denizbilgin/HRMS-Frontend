import React from "react";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import CandidateService from "../services/candidateService";
import {
  Grid,
  Image,
  Icon,
  List,
  Divider,
  Modal,
  Button,
  Header,
} from "semantic-ui-react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import DevHrmsTextInput from "../utilities/customFormControls/DevHrmsTextInput";
import { toast } from "react-toastify";
import JobExperienceUpdateModal from "../components/Modals/JobExperienceUpdateModal";
import SchoolUpdateModal from "../components/Modals/SchoolUpdateModal";
import SkillUpdateModal from "../components/Modals/SkillUpdateModal";
import LanguageUpdateModal from "../components/Modals/LanguageUpdateModal";
import LinkUpdateModal from "../components/Modals/LinkUpdateModal";

export default function CandidateProfile() {
  const { id } = useParams();
  const [candidateCv, setCandidateCv] = useState({});
  const [open, setOpen] = useState(false);

  useEffect(() => {
    let candidateService = new CandidateService();
    candidateService
      .getCvByCandidateId(id)
      .then((result) => setCandidateCv(result.data.data));
  }, []);

  function editDate(strDate) {
    var strSplitDate = String(strDate).split(" ");
    var date = new Date(strSplitDate[0]);
    var dd = date.getDate();
    var mm = date.getMonth() + 1; //January is 0!

    var yyyy = date.getFullYear();
    if (dd < 10) {
      dd = "0" + dd;
    }
    if (mm < 10) {
      mm = "0" + mm;
    }
    date = dd + "/" + mm + "/" + yyyy;
    return date.toString();
  }

  const personalInitialValues = {
    id: parseInt(id),
    email: candidateCv.candidate?.email,
    password: candidateCv.candidate?.password,
    firstName: candidateCv.candidate?.firstName,
    lastName: candidateCv.candidate?.lastName,
    nationalityId: candidateCv.candidate?.nationalityId,
    birthYear: candidateCv.candidate?.birthYear,
    description: candidateCv.candidate?.description,
    password: candidateCv.candidate?.password,
    activated: candidateCv.candidate?.activated,
    imgUrl: "",
  };

  const personalValidationSchema = Yup.object({
    id: Yup.number(),
    email: Yup.string().email(),
    password: Yup.string(),
    firstName: Yup.string(),
    lastName: Yup.string(),
    nationalityId: Yup.string().length(11),
    birthYear: Yup.date(),
    description: Yup.string().nullable(),
  });

  function handlePersonalUpdate(values) {
    let candidateService = new CandidateService();
    candidateService.updateCandidate(values);
    toast.success(
      "Bilgileriniz Başarıyla Güncellendi " +
        candidateCv.candidate?.firstName +
        " " +
        candidateCv.candidate?.lastName
    );
  }

  function handleUploadImage(image) {
    let candidateService = new CandidateService();
    candidateService.uploadImage(id, image);
  }

  return (
    <div>
      <Divider horizontal style={{ marginBottom: "40px" }}>
        <div
          style={{ paddingTop: "10px", lineHeight: "0px", fontSize: "20px" }}
        >
          PROFİLİNİZ
        </div>
      </Divider>
      <div className="cv-container">
        <Grid>
          <Grid.Row
            style={{
              alignItems: "center",
              padding: "0",
              backgroundColor: "white",
              borderRadius: "15px",
            }}
          >
            <Grid.Column
              width={5}
              style={{ paddingRight: "0px", height: "100%", paddingLeft: "0" }}
            >
              <div className="cv-left">
                <div>
                  <Image
                    className="cv-profile-img"
                    src={candidateCv.candidate?.imgUrl}
                    size="small"
                    style={{
                      width: "150px",
                      height: "150px",
                      marginTop: "20px",
                    }}
                  />
                  <div style={{ marginTop: "20px", fontSize: "25px" }}>
                    {candidateCv.candidate?.firstName}{" "}
                    {candidateCv.candidate?.lastName}
                  </div>
                </div>
                <div
                  style={{
                    textAlign: "left",
                    marginLeft: "20px",
                    marginTop: "40px",
                  }}
                >
                  <div>
                    <div className="cv-left-bar-header">
                      <Icon name="at" /> Email
                    </div>
                    <span style={{ color: "#d4d4d4" }}>
                      {candidateCv.candidate?.email}
                    </span>
                  </div>
                  <div>
                    <div className="cv-left-bar-header">
                      <Icon name="table" /> Doğum Tarihi
                    </div>
                    <div>
                      <span style={{ color: "#d4d4d4" }}>
                        {editDate(candidateCv.candidate?.birthYear)}
                      </span>
                    </div>
                  </div>
                  <div>
                    <div className="cv-left-bar-header">
                      <Icon name="file outline" /> Açıklama
                    </div>
                    <div>
                      <span style={{ color: "#d4d4d4" }}>
                        {candidateCv.candidate?.description == null
                          ? "Açıklama Yok"
                          : candidateCv.candidate.description}
                      </span>
                    </div>
                  </div>
                  <div>
                    <div className="cv-left-bar-header">
                      <Icon name="thumbtack" /> Linkler
                    </div>
                    <List style={{ marginTop: "0px" }}>
                      {candidateCv.candidateLinks?.map((link) => (
                        <List.Item
                          key={link.id}
                          href={link.linkPath}
                          style={{ color: "#d4d4d4" }}
                        >
                          <List.Icon
                            name="caret right"
                            style={{ color: "white" }}
                          />
                          {link.linkType.linkTypeName}
                        </List.Item>
                      ))}
                    </List>
                    <LinkUpdateModal
                      candidateLinks={candidateCv.candidateLinks}
                      candidateId={id}
                    />
                  </div>
                </div>
              </div>
            </Grid.Column>
            <Grid.Column
              width={11}
              style={{ paddingLeft: "0px", height: "100%", padding: "0px" }}
            >
              <div
                className="cv-right"
                style={{
                  backgroundColor: "#fff",
                  padding: "30px",
                  paddingBottom: "5px",
                }}
              >
                <div className="job-experiences" style={{ marginLeft: "15px" }}>
                  <div className="cv-right-header">
                    <Icon name="briefcase" /> <b>İş Deneyimleri</b>
                  </div>
                  <div>
                    <List>
                      {candidateCv.jobExperiences?.map((experience) => (
                        <List.Item
                          key={experience.id}
                          style={{ marginTop: "35px" }}
                        >
                          <Grid>
                            <Grid.Row
                              style={{
                                paddingTop: "0px",
                                paddingBottom: "25px",
                              }}
                            >
                              <Grid.Column width={6}>
                                <div style={{ fontSize: "16px" }}>
                                  <Icon name="long arrow alternate right" />
                                  {editDate(experience.startDate)} -
                                  {experience.finishDate == null
                                    ? "Hala Devam Ediyor"
                                    : editDate(experience.finishDate)}
                                </div>
                              </Grid.Column>
                              <Grid.Column width={5}>
                                <div style={{ textAlign: "center" }}>
                                  <div
                                    style={{
                                      fontSize: "18px",
                                      marginBottom: "7px",
                                    }}
                                  >
                                    İş Yeri Adı
                                  </div>
                                  <span className="cv-right-grey-text">
                                    {experience.workplaceName}
                                  </span>
                                </div>
                              </Grid.Column>
                              <Grid.Column width={5}>
                                <div style={{ textAlign: "center" }}>
                                  <div
                                    style={{
                                      fontSize: "18px",
                                      marginBottom: "7px",
                                    }}
                                  >
                                    Pozisyon
                                  </div>
                                  <span className="cv-right-grey-text">
                                    {experience.position}
                                  </span>
                                </div>
                              </Grid.Column>
                            </Grid.Row>
                          </Grid>
                        </List.Item>
                      ))}
                    </List>
                    <JobExperienceUpdateModal
                      candidateJobExperiences={candidateCv.jobExperiences}
                      candidateId={id}
                    />
                  </div>
                </div>
                <Divider style={{ marginLeft: "0px" }} />
                <div className="educations" style={{ marginLeft: "15px" }}>
                  <div className="cv-right-header">
                    <Icon name="building" /> <b>Eğitim</b>
                  </div>
                  <div style={{ marginTop: "20px" }}>
                    <List>
                      {candidateCv.schools?.map((school) => (
                        <Grid key={school.id}>
                          <Grid.Row>
                            <Grid.Column width={3}>
                              <Icon name="graduation cap" />
                              <span
                                className="cv-right-grey-text"
                                style={{ marginLeft: "5px" }}
                              >
                                Okul
                              </span>
                              <span style={{ fontSize: "16px" }}>
                                {school.schoolName}
                              </span>
                            </Grid.Column>
                            <Grid.Column width={5}>
                              <span className="cv-right-grey-text">Bölüm</span>
                              <span style={{ fontSize: "16px" }}>
                                {school.department}
                              </span>
                            </Grid.Column>
                            <Grid.Column
                              width={3}
                              style={{ paddingLeft: "0px" }}
                            >
                              <span className="cv-right-grey-text">
                                Başlangıç
                              </span>
                              {editDate(school.entryDate)}
                            </Grid.Column>
                            <Grid.Column
                              width={5}
                              style={{ paddingLeft: "30px" }}
                            >
                              <span className="cv-right-grey-text">
                                Mezuniyet
                              </span>
                              {school.graduateDate == null
                                ? "Hala Devam Ediyor"
                                : editDate(school.graduateDate)}
                            </Grid.Column>
                          </Grid.Row>
                        </Grid>
                      ))}
                    </List>
                    <SchoolUpdateModal
                      candidateSchools={candidateCv.schools}
                      candidateId={id}
                    />
                  </div>
                </div>
                <Divider style={{ marginLeft: "0px" }} />
                <div
                  className="skills"
                  style={{ marginLeft: "15px", marginBottom: "25px" }}
                >
                  <div className="cv-right-header">
                    <Icon name="pencil" /> <b>Yetenekler</b>
                  </div>
                  <div>
                    <List>
                      <Grid columns={5} style={{ marginTop: "20px" }}>
                        {candidateCv.skills?.map((skill) => (
                          <Grid.Column key={skill.id}>
                            <List.Item>
                              <Icon name="check" style={{ color: "#a7a7a7" }} />
                              <span
                                style={{ fontSize: "16px", marginLeft: "6px" }}
                              >
                                {skill.skillName}
                              </span>
                            </List.Item>
                          </Grid.Column>
                        ))}
                      </Grid>
                    </List>
                    <SkillUpdateModal
                      candidateSkills={candidateCv.skills}
                      candidateId={id}
                    />
                  </div>
                </div>
                <Divider style={{ marginLeft: "0px" }} />
                <div
                  className="languages"
                  style={{ marginLeft: "15px", marginBottom: "25px" }}
                >
                  <div className="cv-right-header">
                    <Icon name="language" /> <b>Diller</b>
                  </div>
                  <div>
                    <List>
                      <Grid columns={2} style={{ marginTop: "20px" }}>
                        {candidateCv.languages?.map((language) => (
                          <Grid.Column
                            key={language.id}
                            style={{ paddingTop: "0px" }}
                          >
                            <List.Item>
                              <Icon name="comment alternate" />
                              <span
                                className="cv-right-grey-text"
                                style={{ marginLeft: "5px" }}
                              >
                                Dil
                              </span>
                              <span
                                style={{ fontSize: "16px", marginLeft: "6px" }}
                              >
                                {language.languageName}
                              </span>

                              <span
                                className="cv-right-grey-text"
                                style={{ marginLeft: "25px" }}
                              >
                                Seviye
                              </span>
                              <span
                                style={{ fontSize: "16px", marginLeft: "4px" }}
                              >
                                {language.languageLevel}
                              </span>
                            </List.Item>
                          </Grid.Column>
                        ))}
                      </Grid>
                    </List>
                    <LanguageUpdateModal
                      candidateLanguages={candidateCv.languages}
                      candidateId={id}
                    />
                  </div>
                </div>
              </div>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
      <Modal
        onClose={() => {
          setOpen(false);
        }}
        onOpen={() => setOpen(true)}
        open={open}
        trigger={
          <Button primary fluid style={{ marginTop: "50px" }}>
            {" "}
            Bilgilerinizi Güncellemek İçin Tıklayın{" "}
          </Button>
        }
      >
        <Modal.Header>Bilgilerinizi Güncelleyin</Modal.Header>
        <Modal.Content image>
          <Image src={candidateCv.candidate?.imgUrl} size="medium" />
          <Modal.Description style={{ width: "100%" }}>
            <Formik
              initialValues={personalInitialValues}
              validationSchema={personalValidationSchema}
              onSubmit={(values) => {
                handlePersonalUpdate(values);
              }}
            >
              <Form>
                <Header>
                  Profil Fotoğrafınızı Güncellemek İçin Bir Dosya Seçin
                </Header>
                <DevHrmsTextInput
                  type="email"
                  name="email"
                  className="my-input"
                />
                <DevHrmsTextInput
                  name="firstName"
                  type="text"
                  className="my-input"
                />
                <DevHrmsTextInput
                  name="lastName"
                  type="text"
                  className="my-input"
                />
                <DevHrmsTextInput
                  name="nationalityId"
                  type="text"
                  className="my-input"
                />
                <DevHrmsTextInput
                  name="birthYear"
                  type="date"
                  className="my-input"
                />
                <DevHrmsTextInput
                  name="description"
                  type="text"
                  className="my-input"
                />
                <Button
                  content="Güncelle"
                  labelPosition="right"
                  icon="sync"
                  primary
                  fluid
                  type="submit"
                  style={{ marginTop: "10px" }}
                />
              </Form>
            </Formik>
          </Modal.Description>
        </Modal.Content>
        <Modal.Actions>
          <Button
            color="red"
            onClick={() => {
              setOpen(false);
            }}
          >
            Kapat
          </Button>
        </Modal.Actions>
      </Modal>
      <div style={{marginTop:"30px", textAlign:"left"}}>
        * Özgeçmişinize Okul, Dil, Link, İş Deneyimi, Yetenek eklemek isterseniz o
        şeyle ilgili düzenleme metnine basmanız yeterli olacaktır.
      </div>
    </div>
  );
}
