import React, { useEffect, useState } from "react";
import { Icon, Menu, Table } from "semantic-ui-react";
import CandidateService from "../services/candidateService";
import { Grid } from "semantic-ui-react";

export default function CandidateList() {
  const [candidates, setCandidates] = useState([]);
  useEffect(() => {
    let candidateService = new CandidateService();
    candidateService
      .getCandidates()
      .then((result) => setCandidates(result.data.data));
  });

  return (
    <div>
      <Grid>
        <Grid.Row>
          <Grid.Column width={12}>
            <Table>
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell>Ad</Table.HeaderCell>
                  <Table.HeaderCell>Soyad</Table.HeaderCell>
                  <Table.HeaderCell>Email</Table.HeaderCell>
                </Table.Row>
              </Table.Header>

              <Table.Body>
                {candidates.map((candidate) => (
                  <Table.Row key={candidate.id}>
                    <Table.Cell>{candidate.firstName}</Table.Cell>
                    <Table.Cell>{candidate.lastName}</Table.Cell>
                    <Table.Cell>{candidate.email}</Table.Cell>
                  </Table.Row>
                ))}
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
          </Grid.Column>
          <Grid.Column width={4}>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </div>
  );
}
