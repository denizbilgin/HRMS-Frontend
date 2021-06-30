import React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router";
import {
  Divider,
  Label,
  Button,
  Image,
  Modal,
  Header,
  Icon
} from "semantic-ui-react";
import EmployerService from "../services/employerService";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import DevHrmsTextInput from "../utilities/customFormControls/DevHrmsTextInput";
import { toast } from "react-toastify";

export default function EmployerProfile() {
  const { id } = useParams();

  const [employer, setEmployer] = useState({});
  const [open, setOpen] = React.useState(false);

  useEffect(() => {
    let employerService = new EmployerService();
    employerService.getById(id).then((result) => setEmployer(result.data.data));
  }, []);

  const initialValues = {
    id: id,
    email: employer.email,
    password: employer.password,
    companyName: employer.companyName,
    webAdress: employer.webAdress,
    phoneNumber: employer.phoneNumber,
    imgUrl: employer.imgUrl,
    updateEmployer: employer.updateEmployer,
  };

  const schema = Yup.object({
    email: Yup.string().email(),
    password: Yup.string(),
    companyName: Yup.string(),
    webAdress: Yup.string().url(),
    phoneNumber: Yup.string(),
  });

  function handleUpdate(values) {
    let employerService = new EmployerService();
    employerService.update(values);
    toast.success("Güncelleme İsteğiniz Gönderildi. Sistem Çalışanı Tarafından Onaylandıktan Sonra Güncellemeniz Tamamlanacaktır.")
  }

  return (
    <div>
      <Divider horizontal style={{ marginBottom: "30px" }}>
        <div
          style={{ paddingTop: "10px", lineHeight: "0px", fontSize: "20px" }}
        >
          PROFİLİNİZ
        </div>
      </Divider>
      <div>
        <div>
          <Image
            src={employer.imgUrl}
            className="cv-profile-img"
            size="medium"
          />
        <div className="employer-header">
            <b>{employer.companyName}</b>
        </div>
        <div className="employer-body">
            <div className="employer-body-section">
                <span><Icon name="at" style={{marginRight:"10px"}}/></span>
                <span>Email</span>
                <Icon name="triangle right"/>
                <span>{employer.email}</span>
            </div>
            <div className="employer-body-section">
                <span><Icon name="building" style={{marginRight:"10px"}}/></span>
                <span>Şirket Adı</span>
                <Icon name="triangle right"/>
                <span>{employer.companyName}</span>
            </div>
            <div className="employer-body-section">
                <span><Icon name="compass" style={{marginRight:"10px"}}/></span>
                <span>Web Adresi</span>
                <Icon name="triangle right"/>
                <span>{employer.webAdress}</span>
            </div>
            <div className="employer-body-section">
                <span><Icon name="phone" style={{marginRight:"10px"}}/></span>
                <span>Telefon Numarası</span>
                <Icon name="triangle right"/>
                <span>{employer.phoneNumber}</span>
            </div>
            <div className="employer-body-section">
                <span><Icon name="question" style={{marginRight:"10px"}}/></span>
                <span>Hesabınız Onaylı Mı?</span>
                <Icon name="triangle right"/>
                {employer.activated === false ? <Icon name="delete"/> : <Icon name="checkmark"/> }
            </div>
        </div>
        </div>
      </div>
      <Modal
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        open={open}
        trigger={
          <Button
            content="Verilerinizi Güncellemek İçin Tıklayın"
            labelPosition="right"
            icon="sync"
            primary
            fluid
            style={{ marginTop: "30px" }}
          />
        }
      >
        <Modal.Header>Profilinizi Güncelleyin</Modal.Header>
        <Modal.Content image>
          <Image
            src={employer.imgUrl}
            className="cv-profile-img"
            size="medium"
            style={{margin:"40px"}}
          />
          <Modal.Description style={{width:"100%"}}>
            <Header style={{fontSize:"30px"}}>Bilgileriniz</Header>
            <Formik
              initialValues={initialValues}
              validationSchema={schema}
              onSubmit={(values) => {
                handleUpdate(values);
              }}
            >
              <Form>
                <div className="employer-profile-header">Email :</div>
                <DevHrmsTextInput
                  name="email"
                  type="email"
                  className="my-input"
                />
                <div className="employer-profile-header">Şirket İsmi :</div>
                <DevHrmsTextInput
                  name="companyName"
                  type="text"
                  className="my-input"
                />
                <div className="employer-profile-header">Web Adresi :</div>
                <DevHrmsTextInput
                  name="webAdress"
                  type="text"
                  className="my-input"
                />
                <div className="employer-profile-header">
                  Telefon Numarası :
                </div>
                <DevHrmsTextInput
                  name="phoneNumber"
                  type="text"
                  className="my-input"
                />
                {employer.updateEmployer != null ? (
                  <Label basic color="blue" style={{ marginTop: "20px" }}>
                    Daha Önce Gönderdiğiniz Güncelleme İsteği Onay Bekliyor
                  </Label>
                ) : (
                  <Button
                    content="Güncelle"
                    labelPosition="right"
                    icon="sync"
                    primary
                    fluid
                    type="submit"
                    style={{ marginTop: "10px" }}
                  />
                )}
              </Form>
            </Formik>
          </Modal.Description>
        </Modal.Content>
        <Modal.Actions>
            <Button color='red' onClick={() => setOpen(false)}>
                Kapat
            </Button>
        </Modal.Actions>
      </Modal>
    </div>
  );
}
