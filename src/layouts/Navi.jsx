import React from "react";
import { NavLink } from "react-router-dom";
import { Button, Container, Menu } from "semantic-ui-react";

export default function Navi() {
  return (
    <div>
      <Menu secondary fixed="top" style={{backgroundColor:"#ededed"}}>
        <Container>
          <Menu.Item><span className="nav-logo"><span style={{color:"#199AD6"}}>DEV</span>Hrms</span></Menu.Item>
          <Menu.Item name="Ana Sayfa" as={NavLink} to="/home"></Menu.Item>
          <Menu.Item name="İş İlanları" as={NavLink} to="/jobpostings"></Menu.Item>

          <Menu.Menu position="right">
            <Menu.Item name="Profil" />
            <Menu.Item>
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
