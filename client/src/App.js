import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import { useLayoutEffect } from "react";
import Tournaments from "./pages/Tournaments/Tournaments";
import Sports from "./pages/Sports/Sports";
import Teams from "./pages/Teams/Teams";
import Players from "./pages/Players/Players";
import Matches from "./pages/Matches/Matches";
import Countries from "./pages/Countries/Countries";
import CountryForm from "./pages/Countries/CountryForm";
import CityForm from "./pages/Countries/CityForm";
import TeamForm from "./pages/Teams/TeamForm";
import SportForm from "./pages/Sports/SportForm";
import PlayerForm from "./pages/Players/PlayerForm";
import TournamentForm from "./pages/Tournaments/TournamentForm";
import MatchForm from "./pages/Matches/MatchForm";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import MatchDetails from "./pages/Matches/MatchDetails";
import PlayerDetails from "./pages/Matches/PlayerDetails";
import { Provider } from "react-redux";
import store from "./store";
import PrivateRoute from "./routing/PrivateRoute";
import setAuthToken from "./utils/setAuthToken";

export const HOST = "http://localhost:5000/api";

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

export const fixDate = (isoDate) => {
  const date = new Date(isoDate);

  const options = { year: "numeric", month: "long", day: "numeric" };
  const formattedDate = date.toLocaleDateString(undefined, options);
  return formattedDate;
};

export const fixDataForInputField = (dbDate) => {
  const date = new Date(dbDate);

  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");
  return `${year}-${month}-${day}`;
};

const Wrapper = ({ children }) => {
  const location = useLocation();
  useLayoutEffect(() => {
    document.documentElement.scrollTo(0, 0);
  }, [location.pathname]);
  return children;
};

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <Wrapper>
          <Routes>
            <Route path="/*">
              {/* Static routes */}
              <Route index element={<Login />} />
              <Route path="login" element={<Login />} />
              <Route path="register" element={<Register />} />

              {/* Dashboard routes */}
              <Route
                path="dashboard"
                element={
                  <PrivateRoute>
                    <Dashboard />
                  </PrivateRoute>
                }
              />
              <Route
                path="countries"
                element={
                  <PrivateRoute>
                    <Countries />
                  </PrivateRoute>
                }
              />
              <Route
                path="countries/add"
                element={
                  <PrivateRoute>
                    <CountryForm />
                  </PrivateRoute>
                }
              />
              <Route
                path="countries/edit/:id"
                element={
                  <PrivateRoute>
                    <CountryForm />
                  </PrivateRoute>
                }
              />
              <Route
                path="cities/add"
                element={
                  <PrivateRoute>
                    <CityForm />
                  </PrivateRoute>
                }
              />
              <Route
                path="cities/edit/:id"
                element={
                  <PrivateRoute>
                    <CityForm />
                  </PrivateRoute>
                }
              />
              <Route
                path="sports"
                element={
                  <PrivateRoute>
                    <Sports />
                  </PrivateRoute>
                }
              />
              <Route
                path="sports/:id/:viewOnly"
                element={
                  <PrivateRoute>
                    <SportForm />
                  </PrivateRoute>
                }
              />
              <Route
                path="sports/add"
                element={
                  <PrivateRoute>
                    <SportForm />
                  </PrivateRoute>
                }
              />
              <Route
                path="sports/edit/:id"
                element={
                  <PrivateRoute>
                    <SportForm />
                  </PrivateRoute>
                }
              />
              <Route
                path="tournaments"
                element={
                  <PrivateRoute>
                    <Tournaments />
                  </PrivateRoute>
                }
              />
              <Route
                path="tournaments/:id/:viewOnly"
                element={
                  <PrivateRoute>
                    <TournamentForm />
                  </PrivateRoute>
                }
              />
              <Route
                path="tournaments/add"
                element={
                  <PrivateRoute>
                    <TournamentForm />
                  </PrivateRoute>
                }
              />
              <Route
                path="tournaments/edit/:id"
                element={
                  <PrivateRoute>
                    <TournamentForm />
                  </PrivateRoute>
                }
              />
              <Route
                path="teams"
                element={
                  <PrivateRoute>
                    <Teams />
                  </PrivateRoute>
                }
              />
              <Route
                path="teams/add"
                element={
                  <PrivateRoute>
                    <TeamForm />
                  </PrivateRoute>
                }
              />
              <Route
                path="teams/:id/:viewOnly"
                element={
                  <PrivateRoute>
                    <TeamForm />
                  </PrivateRoute>
                }
              />
              <Route
                path="teams/edit/:id"
                element={
                  <PrivateRoute>
                    <TeamForm />
                  </PrivateRoute>
                }
              />
              <Route
                path="players"
                element={
                  <PrivateRoute>
                    <Players />
                  </PrivateRoute>
                }
              />
              <Route
                path="players/add"
                element={
                  <PrivateRoute>
                    <PlayerForm />
                  </PrivateRoute>
                }
              />
              <Route
                path="players/:id/:viewOnly"
                element={
                  <PrivateRoute>
                    <PlayerForm />
                  </PrivateRoute>
                }
              />
              <Route
                path="players/edit/:id"
                element={
                  <PrivateRoute>
                    <PlayerForm />
                  </PrivateRoute>
                }
              />
              <Route
                path="matches"
                element={
                  <PrivateRoute>
                    <Matches />
                  </PrivateRoute>
                }
              />
              <Route
                path="matches/:id/:viewOnly"
                element={
                  <PrivateRoute>
                    <MatchForm />
                  </PrivateRoute>
                }
              />
              <Route
                path="matches/add"
                element={
                  <PrivateRoute>
                    <MatchForm />
                  </PrivateRoute>
                }
              />
              <Route
                path="matches/edit/:id"
                element={
                  <PrivateRoute>
                    <MatchForm />
                  </PrivateRoute>
                }
              />
              <Route
                path="matches/:id/matchDetails"
                element={
                  <PrivateRoute>
                    <MatchDetails />
                  </PrivateRoute>
                }
              />
              <Route
                path="matches/:id/:team_id/:player_id/playerDetails"
                element={
                  <PrivateRoute>
                    <PlayerDetails />
                  </PrivateRoute>
                }
              />
              <Route
                path="matches/:id/:team_id/:player_id/playerDetails/:viewOnly"
                element={
                  <PrivateRoute>
                    <PlayerDetails />
                  </PrivateRoute>
                }
              />
            </Route>
          </Routes>
        </Wrapper>
      </Router>
    </Provider>
  );
};

export default App;
