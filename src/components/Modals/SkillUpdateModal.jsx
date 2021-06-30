import React from "react";
import { Modal, Button, Divider } from "semantic-ui-react";
import { useState } from "react";
import DevHrmsTextInput from "../../utilities/customFormControls/DevHrmsTextInput";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import SkillService from "../../services/skillService"

export default function SkillUpdateModal(props) {
  const [open, setOpen] = useState(false);

  const schema = Yup.object({
    id: Yup.number(),
    skillName: Yup.string().required("Yetenek Bilgisi Zorunludur"),
  });

  function handleUpdateSkill(values) {
      let skillService = new SkillService();
      skillService.update(values);
      toast.success("Yetenekleriniz Güncellendi.")
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
          <Button fluid style={{ marginTop: "15px", backgroundColor:"white"}}>
            Yeteneklerinizi Düzenlemek İçin Tıklayın
          </Button>
        }
      >
        <Modal.Header>Bilgilerinizi Güncelleyin</Modal.Header>
        <Modal.Content>
          <Modal.Description>
            {props.candidateSkills?.map((skill) => (
              <Formik
                initialValues={{
                  id: skill.id,
                  skillName: skill.skillName,
                }}
                validationSchema={schema}
                onSubmit = {(values) => {
                    handleUpdateSkill(values);
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
                      {skill.skillName}
                    </div>
                  </Divider>
                  <div className="my-header">Yetenek Adı</div>
                  <DevHrmsTextInput
                    name="skillName"
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
