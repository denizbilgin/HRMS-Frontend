import React from "react";
import { Modal, Button, Divider } from "semantic-ui-react";
import { useState } from "react";
import DevHrmsTextInput from "../../utilities/customFormControls/DevHrmsTextInput";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import LanguageService from "../../services/languageService";

export default function LanguageUpdateModal(props) {
  const [open, setOpen] = useState(false);

  const schema = Yup.object({
    id: Yup.number(),
    languageName: Yup.string().required("Dil Adı Bilgisi Zorunludur"),
    languageLevel: Yup.number()
      .required("Dil Seviyesi Bilgisi Zorunludur")
      .min(0)
      .max(5),
  });

  function handleUpdateLanguage(values) {
    let languageService = new LanguageService();
    languageService.update(values);
    toast.success("Dilleriniz Güncellendi.");
  }

  const languageAddInitialValues = {
    candidateId: props.candidateId,
    languageLevel: 0,
    languageName: "",
  };

  const languageAddSchema = Yup.object({
    languageName: Yup.string().required("Dil Adı Bilgisi Zorunludur"),
    languageLevel: Yup.number()
      .required("Dil Seviyesi Bilgisi Zorunludur")
      .min(0)
      .max(5),
  });

  function handleAddLanguage(values) {
    let languageService = new LanguageService();
    languageService.add(values);
    toast.success("Özgeçmişinize Yeni Bir Dil Eklendi.");
  }

  function handleDeleteLanguage(languageId) {
    let languageService = new LanguageService();
    languageService.delete(languageId);
    toast.success("Dil Silindi.");
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
          <Button fluid style={{ marginTop: "20px", backgroundColor: "white" }}>
            Dillerinizi Düzenlemek İçin Tıklayın
          </Button>
        }
      >
        <Modal.Header>Bilgilerinizi Düzenleyin</Modal.Header>
        <Modal.Content>
          <Modal.Description>
            {props.candidateLanguages?.map((language) => (
              <div key={language.id}>
                <Formik
                  initialValues={{
                    id: language.id,
                    languageName: language.languageName,
                    languageLevel: language.languageLevel,
                  }}
                  validationSchema={schema}
                  onSubmit={(values) => {
                    handleUpdateLanguage(values);
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
                        {language.languageName}
                      </div>
                    </Divider>
                    <div className="my-header">Dil Adı</div>
                    <DevHrmsTextInput
                      name="languageName"
                      type="text"
                      className="my-input"
                    />
                    <div className="my-header">Dil Seviyesi</div>
                    <DevHrmsTextInput
                      name="languageLevel"
                      type="number"
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
                    handleDeleteLanguage(language.id)
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
                  Dil Ekle
                </div>
              </Divider>
              <Formik
                initialValues={languageAddInitialValues}
                validationSchema={languageAddSchema}
                onSubmit={(values) => {
                  handleAddLanguage(values);
                }}
              >
                <Form>
                  <div className="my-header">Dil Adı</div>
                  <DevHrmsTextInput
                    name="languageName"
                    type="text"
                    className="my-input"
                  />
                  <div className="my-header">Dil Seviyesi</div>
                  <DevHrmsTextInput
                    name="languageLevel"
                    type="number"
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
