import React from "react";
import { Modal, Button, Divider } from "semantic-ui-react";
import { useState } from "react";
import DevHrmsTextInput from "../../utilities/customFormControls/DevHrmsTextInput";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import LanguageService from "../../services/languageService"

export default function LanguageUpdateModal(props) {
  const [open, setOpen] = useState(false);

  const schema = Yup.object({
    id: Yup.number(),
    languageName: Yup.string()
      .required("Dil Adı Bilgisi Zorunludur"),
    languageLevel: Yup.number().required("Dil Seviyesi Bilgisi Zorunludur").min(0).max(5),
  });

  function handleUpdateLanguage(values) {
      let languageService = new LanguageService();
      languageService.update(values)
      toast.success("Dilleriniz Güncellendi.")
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
          <Button fluid style={{ marginTop: "20px", backgroundColor:"white"}}>
            Dillerinizi Düzenlemek İçin Tıklayın
          </Button>
        }
      >
        <Modal.Header>Bilgilerinizi Güncelleyin</Modal.Header>
        <Modal.Content>
          <Modal.Description>
            {props.candidateLanguages?.map((language) => (
              <Formik
                initialValues={{
                  id: language.id,
                  languageName: language.languageName,
                  languageLevel: language.languageLevel,
                }}
                validationSchema={schema}
                onSubmit = {(values) => {
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
                    style={{ marginTop: "10px", marginBottom: "40px" }}
                  />
                </Form>
              </Formik>
            ))}
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
