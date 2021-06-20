import React, { useEffect, useState } from "react";
import { Icon, Menu, Table } from "semantic-ui-react";
import EmployerService from "../services/employerService";

export default function EmployerList() {
  const [employers, setEmployers] = useState([]);

  useEffect(() => {
    let employerService = new EmployerService();
    employerService
      .getEmployers()
      .then((result) => setEmployers(result.data.data));
  });

  return (
    <div>
      <Table>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Email</Table.HeaderCell>
            <Table.HeaderCell>Şirket Adı</Table.HeaderCell>
            <Table.HeaderCell>Web Adresi</Table.HeaderCell>
            <Table.HeaderCell>Telefon No</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {
          employers.map((employer) => (
            <Table.Row key={employer.id}>
              <Table.Cell>{employer.email}</Table.Cell>
              <Table.Cell>{employer.companyName}</Table.Cell>
              <Table.Cell>{employer.webAdress}</Table.Cell>
              <Table.Cell>{employer.phoneNumber}</Table.Cell>
            </Table.Row>
          ))
          }
        </Table.Body>

        <Table.Footer>
          <Table.Row>
            <Table.HeaderCell colSpan="3">
              <Menu floated="right" pagination>
                <Menu.Item as="a" icon>
                  <Icon name="chevron left" />
                </Menu.Item>
                <Menu.Item as="a">1</Menu.Item>
                <Menu.Item as="a">2</Menu.Item>
                <Menu.Item as="a">3</Menu.Item>
                <Menu.Item as="a">4</Menu.Item>
                <Menu.Item as="a" icon>
                  <Icon name="chevron right" />
                </Menu.Item>
              </Menu>
            </Table.HeaderCell>
          </Table.Row>
        </Table.Footer>
      </Table>
    </div>
  );
}
