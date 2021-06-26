import React from "react";
import { NavLink } from "react-router-dom";
import { Button, Container, Menu } from "semantic-ui-react";

export default function Navi() {
  return (
    <div>
      <Menu secondary pointing fixed="top" style={{backgroundColor:"#f2f2f2", boxShadow:"1px 2px 22px #adadad"}}>
        <Container>
          <Menu.Item><span className="nav-logo"><span style={{color:"#199AD6"}}>DEV</span>Hrms</span></Menu.Item>
          <Menu.Item as={NavLink} to="/home">Ana Sayfa</Menu.Item>
          <Menu.Item as={NavLink} to="/jobpostings">İş İlanları</Menu.Item>

          <Menu.Menu position="right">
            <Menu.Item>Profil</Menu.Item>
            <Menu.Item  style={{paddingBottom:"7px"}}>
              <Button.Group>
                <Button>Giriş Yap</Button>
                <Button.Or/>
                <Button color="blue">Üye Ol</Button>
              </Button.Group>
            </Menu.Item>
          </Menu.Menu>
        </Container>
      </Menu>
    </div>
  );
}
