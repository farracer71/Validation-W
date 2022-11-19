import React, { useEffect, useState } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Login from "./components/Login";
import ReGister from "./components/Register";
import Reset from "./components/Reset";
import Reset2 from "./components/Reset2";
import Login2 from "./components/Login2";
import { textAlign } from '@mui/system';
// import Getapi from './components/Getapi';
import Fetch from './components/Fetch';


function App() {

  return (
    <>
      <div>
        <Fetch />
        {/* <Getapi /> */}
      </div>
      {/* <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Login} />
          <Route exact path="/signup" component={ReGister} />
          <Route exact path="/login" component={Login2} />
          <Route exact path="/reset-password-link" component={Reset} />
          <Route exact path="/reset-password" component={Reset2} />
        </Switch>
      </BrowserRouter> */}
    </>
  );
}

export default App;
