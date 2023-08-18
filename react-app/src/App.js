import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import SignupFormPage from "./components/SignupFormPage";
import LoginFormPage from "./components/LoginFormPage";
import { authenticate } from "./store/session";
import LeftNav from "./components/LeftNav";
import Attacks from './components/Attacks'
import Maps from "./components/Maps";
import Items from './components/Items'
import Location from './components/Location'
import ProtectedRoute from './components/auth/ProtectedRoute'
import ErrorPage from './components/ErrorPage'
import './App.css'
function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(authenticate()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      {isLoaded && (
        <div id='app-container'>
          <div id='left-app'>
            <ProtectedRoute component={LeftNav} />
          </div>
          <div id='right-app'>
            <Switch>
              <Route path='/maps/:locationId'>
                <Location />
              </Route>
              <ProtectedRoute exact path="/" component={Maps} />
              <ProtectedRoute exact path="/items" component={Items} />
              <ProtectedRoute exact path="/attacks" component={Attacks} />
              <ProtectedRoute exact path="/maps" component={Maps} />
              <Route path="/login" >
                <LoginFormPage />
              </Route>
              <Route path="/signup">
                <SignupFormPage />
              </Route>
              <Route path="*" component={ErrorPage} />
            </Switch>
          </div>
        </div>
      )}
    </>
  );
}

export default App;
