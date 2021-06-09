import React from "react";
import { Button, Container, Dropdown, Menu } from "semantic-ui-react";

export default function Navi() {
  return (
    <div>
      <Menu size="large" fixed="top">
        <Container>
          <Menu.Item name="HRMS Project" />
          <Menu.Item name="Ana Sayfa" icon="home"/>
          <Menu.Item name="jobPostings" />

          <Menu.Menu position="right">
            <Menu.Item name="Profil" />
            <Menu.Item>
              <Button.Group>
                <Button>Giriş Yap</Button>
                <Button.Or />
                <Button color="blue">Üye Ol</Button>
              </Button.Group>
            </Menu.Item>
          </Menu.Menu>
        </Container>
      </Menu>
    </div>
  );
}
