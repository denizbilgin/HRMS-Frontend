import React from "react";
import { useParams } from "react-router-dom";
import SystemUserService from "../services/systemUserService";
import { useEffect, useState } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { Button, Divider, Header } from "semantic-ui-react";
import DevHrmsTextInput from "../utilities/customFormControls/DevHrmsTextInput";
import { toast } from "react-toastify";

export default function SystemUserProfile() {
  const { id } = useParams();
  const [systemUser, setSystemUser] = useState({});

  const systemUserInitialValues = {
    id: id,
    email: systemUser.email,
    password: systemUser.password,
    firstName: systemUser.firstName,
    lastName: systemUser.lastName,
  };

  useEffect(() => {
    let systemUserService = new SystemUserService();
    systemUserService
      .getById(id)
      .then((result) => setSystemUser(result.data.data));
  }, []);

  const schema = Yup.object({
    id: Yup.number(),
    email: Yup.string().email().required("Email Alanı Zorunludur"),
    password: Yup.string(),
    firstName: Yup.string().required("İsim Alanı Zorunludur"),
    lastName: Yup.string().required("Soyisim Alanı Zorunludur"),
  });

  function handleUpdate(values) {
    let systemUserService = new SystemUserService();
    systemUserService.update(values);
    toast.success("Bilgileriniz Başarıyla Güncellendi.")
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
      <Header style={{textAlign:"left"}}>
        Sistem Kullanıcısı Bilgileriniz
      </Header>
      <Formik
        enableReinitialize
        initialValues={systemUserInitialValues}
        validationSchema={schema}
        onSubmit={(values) => {
          handleUpdate(values);
        }}
      >
        <Form>
          <DevHrmsTextInput name="email" type="email" className="my-input"/>
          <DevHrmsTextInput name="firstName" type="text" className="my-input" />
          <DevHrmsTextInput name="lastName" type="text" className="my-input" />
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
    </div>
  );
}
