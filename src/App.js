import React, { Suspense } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Landing from "./components/Landing";
import { Route, Switch, BrowserRouter as Router } from "react-router-dom";
import LoadingSpinner from "./UIElements/LoadingSpinner";
// import ThanksComponent from "./components/ThanksComponent";
// import TableCompo from "./components/TableCompo";

const TableCompo = React.lazy(() => 
  import("./components/TableCompo")
);
const ThanksComponent = React.lazy(() => 
  import('./components/ThanksComponent')
);
function App() {
  let routes;
  routes = (
    <Switch>
      <Route exact path="/" component={Landing} />
      <Route exact path="/thanks" component={ThanksComponent} />
      <Route path="/privateDataAccess" component={TableCompo} />
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
        <main>
            <Suspense
                          fallback={
                            <div className="center">
                              <LoadingSpinner />
                            </div>}>
            {routes}
            </Suspense>
        </main>
        {/* <footer>
        <FooterCompo/>
      </footer> */}
      </Router>
    </div>
  );
}

export default App;
