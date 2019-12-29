import React from "react";
import {BrowserRouter as Router, Switch, Route, Redirect} from 'react-router-dom'
import NotFound from "../pages/NotFound";
import ROUTES from './constant';
import Peoples from "../pages/Peoples/find";
import People from "../pages/Peoples/findById";


export default () => (
  <Router>
    <Switch>
      <Route
        exact
        path={ROUTES.PEOPLE.FIND_BY_ID}
        component={People}
      />
      <Route
        exact
        path={ROUTES.HOME}
        component={Peoples}
      />
      <Route
        exact
        path={ROUTES.NOT_FOUND}
        component={NotFound}
      />
      <Redirect from="*" to={ROUTES.NOT_FOUND}/>
    </Switch>
  </Router>
)
