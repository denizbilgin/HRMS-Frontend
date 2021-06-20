import React from "react";
import { Grid, List, Icon, Divider } from "semantic-ui-react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <div className="footer">
      <Grid columns={3}>
        <Grid.Row>
          <Grid.Column>
            <h5>Sayfalar</h5>
            <Divider style={{width:"200px", marginLeft:"115px"}}/>
            <div>
              <List>
                <List.Item>
                  <Link to="/">
                    <List.Icon name="home" />
                    Ana Sayfa
                  </Link>
                </List.Item>
                <List.Item>
                  <Link to="/jobpostings">
                    <List.Icon name="suitcase" />
                    İş İlanları
                  </Link>
                </List.Item>
                <List.Item>
                  <List.Icon name="user" />
                  Üye Ol
                </List.Item>
                <List.Item>
                  <List.Icon name="id card" />
                  Giriş Yap
                </List.Item>
              </List>
            </div>
          </Grid.Column>
          <Grid.Column>
            <h5>Bize Ulaşın</h5>
            <Divider style={{width:"200px", marginLeft:"115px"}}/>
            <div>
              <List>
                <List.Item>
                  <Icon name="hand point right" />
                  Deniz Bilgin
                </List.Item>
                <List.Item>
                  <Icon name="mail" />
                  denizbilgin156@gmail.com
                </List.Item>
                <List.Item>
                  <Icon name="instagram" />
                  denizb04
                </List.Item>
                <List.Item href="https://www.linkedin.com/in/deniz-bilgin-763177207/">
                  <Icon name="linkedin" />
                  LinkedIn Hesabım
                </List.Item>
              </List>
            </div>
          </Grid.Column>
          <Grid.Column>
            <h5>Emeği Geçenler</h5>
            <Divider style={{width:"200px", marginLeft:"115px"}}/>
            <div>
              Deniz Bilgin
              <br />
              Salih Bora Öztürk
            </div>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </div>
  );
}
