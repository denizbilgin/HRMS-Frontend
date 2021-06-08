import logo from "./logo.svg";
import "./App.css";
import "../src";
import Navi from "./layouts/Navi";
import Dashboard from "./layouts/Dashboard";
import Footer from "./layouts/Footer";
import "semantic-ui-css/semantic.min.css";
import { Container } from "semantic-ui-react";

function App() {
  return (
    <div className="App">
      <Navi />
      <Container className="main">
        <Dashboard />
      </Container>
      <Footer />
    </div>
  );
}

export default App;
