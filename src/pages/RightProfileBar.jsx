import React from "react";
import { Card, Icon, Image } from 'semantic-ui-react'

export default function RightProfileBar() {
  return (
    <div>
      <Card fixed="right">
        <Image src="https://i.pinimg.com/736x/89/90/48/899048ab0cc455154006fdb9676964b3.jpg" wrapped ui={false} />
        <Card.Content>
          <Card.Header>Cafer</Card.Header>
          <Card.Meta>
            <span className="date">2018'de Katıldı</span>
          </Card.Meta>
          <Card.Description>
            Cafer Sivas'ta Yaşıyor.
            Boyu 1.10
            Kilosu 25
            Gözlerinin Rengini Bilmiyor
          </Card.Description>
        </Card.Content>
        <Card.Content extra>
          <a>
            <Icon name="user" />
            -5 Arkadaşlar
          </a>
        </Card.Content>
      </Card>
    </div>
  );
}
