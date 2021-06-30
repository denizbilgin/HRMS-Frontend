import React from "react";
import { Modal, Button, Divider } from "semantic-ui-react";
import { useState } from "react";
import DevHrmsTextInput from "../../utilities/customFormControls/DevHrmsTextInput";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import JobExperienceService from "../../services/jobExperienceService";
import { toast } from "react-toastify";

export default function JobExperienceUpdateModal(props) {
  const [open, setOpen] = useState(false);

  const schema = Yup.object({
    id: Yup.number(),
    workplaceName: Yup.string().required("İş Yeri Bilgisi Zorunludur"),
    position: Yup.string().required("Pozisyon Bilgisi Zorunludur"),
    startDate: Yup.date().required("Başlangıç Tarihi Zorunludur"),
    finishDate: Yup.date(),
  });

  function handleUpdateJobExperience(values) {
    let jobExperienceService = new JobExperienceService();
    jobExperienceService.update(values);
    toast.success("İş Deneyimleriniz Güncellendi.");
  }

  const addJobExperienceInitialValues = {
    candidateId: props.candidateId,
    finishDate: "",
    position: "",
    startDate: "",
    workplaceName: "",
  };

  const addJobExperienceSchema = Yup.object({
    workplaceName: Yup.string().required("İş Yeri Bilgisi Zorunludur"),
    position: Yup.string().required("Pozisyon Bilgisi Zorunludur"),
    startDate: Yup.date().required("Başlangıç Tarihi Zorunludur"),
    finishDate: Yup.date(),
  });

  function handleAddJobExperience(values) {
    let jobExperienceService = new JobExperienceService();
    jobExperienceService.add(values);
    toast.success("Özgeçmişinize Yeni Bir İş Deneyimi Eklendi.");
  }

  function handleDeleteJobExperience(jobExperienceId) {
    let jobExperienceService = new JobExperienceService();
    jobExperienceService.delete(jobExperienceId);
    toast.success("İş Deneyimi Silindi");
  }

  return (
    <div>
      <Modal
        onClose={() => {
          setOpen(false);
        }}
        onOpen={() => setOpen(true)}
        open={open}
        trigger={
          <Button fluid style={{ marginTop: "15px", backgroundColor: "white" }}>
            İş Deneyimlerinizi Düzenlemek İçin Tıklayın
          </Button>
        }
      >
        <Modal.Header>Bilgilerinizi Düzenleyin</Modal.Header>
        <Modal.Content>
          <Modal.Description>
            {props.candidateJobExperiences?.map((experience) => (
              <div key={experience.id}>
                <Formik
                  initialValues={{
                    id: experience.id,
                    workplaceName: experience.workplaceName,
                    position: experience.position,
                    startDate: experience.startDate,
                    finishDate: experience.finishDate,
                  }}
                  validationSchema={schema}
                  onSubmit={(values) => {
                    handleUpdateJobExperience(values);
                  }}
                >
                  <Form>
                    <Divider
                      horizontal
                      style={{ marginBottom: "20px", marginTop: "10px" }}
                    >
                      <div
                        style={{
                          paddingTop: "10px",
                          lineHeight: "0px",
                          fontSize: "20px",
                        }}
                      >
                        {experience.workplaceName}
                      </div>
                    </Divider>
                    <div className="my-header">İş Yeri</div>
                    <DevHrmsTextInput
                      name="workplaceName"
                      type="text"
                      className="my-input"
                    />
                    <div className="my-header">Pozisyon</div>
                    <DevHrmsTextInput
                      name="position"
                      type="text"
                      className="my-input"
                    />
                    <div className="my-header">Başlangıç Tarihi</div>
                    <DevHrmsTextInput
                      name="startDate"
                      type="date"
                      className="my-input"
                    />
                    <div className="my-header">Bitiş Tarihi</div>
                    <DevHrmsTextInput
                      name="finishDate"
                      type="date"
                      className="my-input"
                    />
                    <Button
                      content="Güncelle"
                      labelPosition="right"
                      icon="sync"
                      primary
                      fluid
                      type="submit"
                      style={{ marginTop: "10px", marginBottom: "10px" }}
                    />
                  </Form>
                </Formik>
                <Button
                  content="Sil"
                  labelPosition="right"
                  icon="delete"
                  color="red"
                  fluid
                  onClick={() => {
                    handleDeleteJobExperience(experience.id);
                  }}
                  style={{ marginBottom: "40px" }}
                />
              </div>
            ))}
            <div>
              <Divider
                horizontal
                style={{ marginBottom: "20px", marginTop: "10px" }}
              >
                <div
                  style={{
                    paddingTop: "10px",
                    lineHeight: "0px",
                    fontSize: "20px",
                  }}
                >
                  İş Deneyimi Ekle
                </div>
              </Divider>
              <Formik
                initialValues={addJobExperienceInitialValues}
                validationSchema={addJobExperienceSchema}
                onSubmit={(values) => {
                  handleAddJobExperience(values);
                }}
              >
                <Form>
                  <div className="my-header">Şirket Adı</div>
                  <DevHrmsTextInput
                    name="workplaceName"
                    type="text"
                    className="my-input"
                  />
                  <div className="my-header">Pozisyon</div>
                  <DevHrmsTextInput
                    name="position"
                    type="text"
                    className="my-input"
                  />
                  <div className="my-header">Giriş Tarihi</div>
                  <DevHrmsTextInput
                    name="startDate"
                    type="date"
                    className="my-input"
                  />
                  <div className="my-header">Çıkış Tarihi</div>
                  <DevHrmsTextInput
                    name="finishDate"
                    type="date"
                    className="my-input"
                  />
                  <Button
                    content="Ekle"
                    labelPosition="right"
                    icon="add"
                    positive
                    fluid
                    type="submit"
                    style={{ marginTop: "10px", marginBottom: "40px" }}
                  />
                </Form>
              </Formik>
            </div>
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
    </div>
  );
}
