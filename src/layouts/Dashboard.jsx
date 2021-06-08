import React from "react";
import { Grid } from "semantic-ui-react";
import CandidateList from "../components/CandidateList";
import EmployerList from "../components/EmployerList";
import RightProfileBar from "../pages/RightProfileBar";

export default function Dashboard() {
  return (
    <div>
      <Grid>
        <Grid.Row>
          <Grid.Column width={12}>
            <CandidateList />
            <br /><br />
            <EmployerList />
          </Grid.Column>
          <Grid.Column width={4}>
            <RightProfileBar />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </div>
  );
}
