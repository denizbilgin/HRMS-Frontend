import React from "react";
import { Button, Container, Dropdown, Menu } from "semantic-ui-react";

export default function Navi() {
  return (
    <div>
      <Menu size="large" fixed="top">
        <Container>
          <Menu.Item name="HRMS Project" />
          <Menu.Item name="home" />
          <Menu.Item name="jobPostings" />

          <Menu.Menu position="right">
            <Menu.Item name="profile" />
            <Menu.Item>
              <Button.Group>
                <Button>Sign In</Button>
                <Button.Or />
                <Button color="blue">Sign Up</Button>
              </Button.Group>
            </Menu.Item>
          </Menu.Menu>
        </Container>
      </Menu>
    </div>
  );
}
