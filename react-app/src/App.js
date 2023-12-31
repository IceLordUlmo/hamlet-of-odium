import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Switch } from "react-router-dom";
import SignupFormPage from "./components/SignupFormPage";
import LoginFormPage from "./components/LoginFormPage";
import { authenticate } from "./store/session";
import LeftNav from "./components/LeftNav";
import Attacks from './components/Attacks'
import Maps from "./components/Maps";
import Items from './components/Items'
import Location from './components/Location'
import Encounter from './components/Encounter'
import ProtectedRoute from './components/auth/ProtectedRoute'
import Victory from './components/Encounter/Victory'
import ErrorPage from './components/ErrorPage'
import Leaderboard from './components/Leaderboard'
import HowToPlay from './components/HowToPlay'
import Recipes from './components/Recipes'
import './App.css'
function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(authenticate()).then(() => setIsLoaded(true));
  }, [dispatch]);
  const user = useSelector(state => state.session.user)
  return (
    <>
      {isLoaded && ((user) ? <div id='left-app'>
        <Route component={LeftNav} />
      </div> : null)}
      {isLoaded && (

        <div id='app-container'>

          {user ? <div id='left-dummy-app'><div id='dummy'></div></div> : null}

          {(user) ? <div id='right-app'>
            <Switch>
              <Route path='/maps/:locationId'>
                <Location />
              </Route>
              <Route path='/encounters/:encounterId'>
                <Encounter />
              </Route>
              <ProtectedRoute exact path="/victory" component={Victory} />
              <ProtectedRoute exact path="/" component={Maps} />
              <ProtectedRoute exact path="/items" component={Items} />
              <ProtectedRoute exact path="/attacks" component={Attacks} />
              <ProtectedRoute exact path="/maps" component={Maps} />
              <ProtectedRoute exact path="/login" component={Maps} />
              <ProtectedRoute exact path="/signup" component={HowToPlay} />
              <ProtectedRoute exact path="/howtoplay" component={HowToPlay} />
              <ProtectedRoute exact path="/leaderboard" component={Leaderboard} />
              <ProtectedRoute exact path="/recipes" component={Recipes} />
              <Route path="*" component={ErrorPage} />
            </Switch>
          </div> : <div id='right-app-register'><Switch>
            <Route path="/login" >
              <LoginFormPage />
            </Route>
            <Route path="/signup">
              <SignupFormPage />
            </Route>
            <Route path="*" component={ErrorPage} />
          </Switch>
          </div>
          }
        </div>

      )
      }
    </>
  );
}

export default App;
