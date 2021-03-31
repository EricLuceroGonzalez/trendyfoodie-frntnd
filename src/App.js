import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Landing from "./components/Landing";
import FooterCompo from "./components/Footer";
import { Route, Switch, BrowserRouter as Router } from "react-router-dom";
import ThanksComnpo from "./components/ThanksComponent";
function App() {
  let routes;
  routes = (
    <Switch>
      <Route exact path="/" component={Landing} />
      <Route path="/thanks" component={ThanksComnpo} />
    </Switch>
  );
  return (
    <div className="App">
      {/* <header className="App-header">
        <p>
          This is the <code>Header</code>.
        </p>
      </header> */}
      <Router>
        <main>{routes}</main>
        {/* <footer>
        <FooterCompo/>
      </footer> */}
      </Router>
    </div>
  );
}

export default App;
