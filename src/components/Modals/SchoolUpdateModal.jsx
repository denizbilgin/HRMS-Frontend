import React from "react";
import { Modal, Button, Divider } from "semantic-ui-react";
import { useState } from "react";
import DevHrmsTextInput from "../../utilities/customFormControls/DevHrmsTextInput";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import SchoolService from "../../services/schoolService";

export default function SchoolUpdateModal(props) {
  const [open, setOpen] = useState(false);

  const schema = Yup.object({
    id: Yup.number(),
    schoolName: Yup.string().required("Okul Bilgisi Zorunludur"),
    department: Yup.string().required("Departman Bilgisi Zorunludur"),
    entryDate: Yup.date().required("Giriş Tarihi Zorunludur"),
    graduateDate: Yup.date(),
  });

  function handleUpdateSchool(values) {
    let schoolService = new SchoolService();
    schoolService.update(values);
    toast.success("Okul Bilgileriniz Güncellendi.");
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
            Okullarınızı Düzenlemek İçin Tıklayın
          </Button>
        }
      >
        <Modal.Header>Bilgilerinizi Güncelleyin</Modal.Header>
        <Modal.Content>
          <Modal.Description>
            {props.candidateSchools?.map((school) => (
              <Formik
                initialValues={{
                  id: school.id,
                  schoolName: school.schoolName,
                  department: school.department,
                  entryDate: school.entryDate,
                  graduateDate: school.graduateDate,
                }}
                validationSchema={schema}
                onSubmit={(values) => {
                  handleUpdateSchool(values);
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
                      {school.schoolName}
                    </div>
                  </Divider>
                  <div className="my-header">Okul</div>
                  <DevHrmsTextInput
                    name="schoolName"
                    type="text"
                    className="my-input"
                  />
                  <div className="my-header">Departman</div>
                  <DevHrmsTextInput
                    name="department"
                    type="text"
                    className="my-input"
                  />
                  <div className="my-header">Giriş Tarihi</div>
                  <DevHrmsTextInput
                    name="entryDate"
                    type="date"
                    className="my-input"
                  />
                  <div className="my-header">Mezuniyet Tarihi</div>
                  <DevHrmsTextInput
                    name="graduateDate"
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
