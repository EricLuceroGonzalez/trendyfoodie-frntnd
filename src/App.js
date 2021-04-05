import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Landing from "./components/Landing";
import { Route, Switch, BrowserRouter as Router } from "react-router-dom";
import ThanksComnpo from "./components/ThanksComponent";
import TableCompo from "./components/TableCompo";
function App() {
  let routes;
  routes = (
    <Switch>
      <Route exact path="/" component={Landing} />
      <Route path="/thanks" component={ThanksComnpo} />
      <Route path='/data' component={TableCompo}/>
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
