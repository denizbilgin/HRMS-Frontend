import React from "react";
import { Modal, Button, Divider } from "semantic-ui-react";
import { useState, useEffect } from "react";
import DevHrmsTextInput from "../../utilities/customFormControls/DevHrmsTextInput";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import DevHrmsDropdownInput from "../../utilities/customFormControls/DevHrmsDropdownInput";
import CandidateLinkService from "../../services/candidateLinkService";
import LinkTypeService from "../../services/linkTypeService";

export default function LinkUpdateModal(props) {
  const [linkTypes, setLinkTypes] = useState([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    let linkTypeService = new LinkTypeService();
    linkTypeService
      .getLinkTypes()
      .then((result) => setLinkTypes(result.data.data));
  }, []);

  const schema = Yup.object({
    linkPath: Yup.string().required("Link Yolu Bilgisi Zorunludur"),
    linkTypeId: Yup.number().required(),
  });

  const linkAddInitialValues = {
    candidateId: props.candidateId,
    linkPath: "",
    linkTypeId: 0,
  };

  const linkTypeOptions = linkTypes?.map((linkType, index) => ({
    key: index,
    text: linkType.linkTypeName,
    value: linkType.id,
  }));

  function handleUpdateLink(values) {
    let candidateLinkService = new CandidateLinkService();
    candidateLinkService.update(values);
    toast.success("Link Bilgileriniz Güncellendi.");
  }

  function handleDeleteLink(linkId) {
    let candidateLinkService = new CandidateLinkService();
    candidateLinkService.delete(linkId);
    toast.success("Link Silindi.");
  }

  function handleAddLink(values) {
    let candidateLinkService = new CandidateLinkService();
    candidateLinkService.add(values);
    toast.success("Özgeçmişinize Yeni Bir Link Eklendi.");
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
          <Button fluid style={{ marginTop: "15px" }} style={{backgroundColor:"#537fb4", color:"#a5a5a5",padding:"0px",marginLeft:"0px"}}>
            Linklerinizi Düzenlemek İçin Tıklayın
          </Button>
        }
      >
        <Modal.Header>Bilgilerinizi Düzenleyin</Modal.Header>
        <Modal.Content>
          <Modal.Description>
            {props.candidateLinks?.map((link) => (
              <div key={link.id}>
                <Formik
                  initialValues={{
                    candidateId: parseInt(props.candidateId),
                    linkId: link.id,
                    linkPath: link.linkPath,
                    linkTypeId: link.linkType?.id,
                  }}
                  validationSchema={schema}
                  onSubmit={(values) => {
                    handleUpdateLink(values);
                  }}
                >
                  <Form>
                    <div className="my-header">Link Tipi</div>
                    <DevHrmsDropdownInput
                      options={linkTypeOptions}
                      placeholder="Bir Link Tipi Seçiniz"
                      name="linkTypeId"
                      className="my-input"
                    />
                    <div className="my-header">Link Yolu</div>
                    <DevHrmsTextInput
                      name="linkPath"
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
                    handleDeleteLink(link.id);
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
                  Link Ekle
                </div>
              </Divider>
              <Formik
                initialValues={linkAddInitialValues}
                validationSchema={schema}
                onSubmit={(values) => {
                  handleAddLink(values);
                }}
              >
                <Form>
                  <div className="my-header">Link Tipi</div>
                  <DevHrmsDropdownInput
                    options={linkTypeOptions}
                    placeholder="Bir Link Tipi Seçiniz"
                    name="linkTypeId"
                    className="my-input"
                  />
                  <div className="my-header">Link Yolu</div>
                  <DevHrmsTextInput
                    name="linkPath"
                    type="text"
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
