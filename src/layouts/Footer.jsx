import React from "react";
import { List, Container, Icon } from "semantic-ui-react";

export default function Footer() {
  return (
    <div className="footer">
      <div style={{ backgroundColor: "#e3e3e3", padding:"10px" }}>
        <Container>
          <List horizontal>
            <List.Item><Icon name="facebook" size="big" style={{color:"grey"}}/></List.Item>
            <List.Item><Icon name="twitter" size="big" style={{color:"grey"}}/></List.Item>
            <List.Item><Icon name="instagram" size="big" style={{color:"grey"}}/></List.Item>
            <List.Item><Icon name="linkedin" size="big" style={{color:"grey"}}/></List.Item>
            <List.Item><Icon name="github" size="big" style={{color:"grey"}}/></List.Item>
          </List>
        </Container>
      </div>
      <div style={{ backgroundColor: "#d9d9d9", padding: "10px", color:"grey" }}>
        Made By Deniz Bilgin - 2021
      </div>
    </div>
  );
}
