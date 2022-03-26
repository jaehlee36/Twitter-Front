import { useCallback, useContext } from "react";
import { Switch, Route, useHistory } from "react-router-dom";
import Header from "./components/Header";
import AllTweets from "./pages/AllTweets";
import MyTweets from "./pages/MyTweets";
import AuthContext from "./context/AuthContext";
import Profile from "./pages/Profile";

function App() {
  const history = useHistory();
  const { user, logout } = useContext(AuthContext);

  const onAllTweets = useCallback(() => {
    history.push("/");
  }, [history]);

  const onMyTweets = useCallback(() => {
    history.push(`/${user.username}`);
  }, [history, user.username]);

  const onLogout = useCallback(() => {
    if (window.confirm("Do you want to log out?")) {
      logout();
      history.push("/");
    }
  }, [history, logout]);

  const onProfile = useCallback(() => {
    history.push(`/${user.username}/profile`);
  }, [history, user]);
  return (
    <div className="app">
      <Header
        username={user.username}
        userImg={user.url}
        onLogout={onLogout}
        onAllTweets={onAllTweets}
        onMyTweets={onMyTweets}
        onProfile={onProfile}
      />
      <Switch>
        (
        <>
          <Route exact path="/">
            <AllTweets />
          </Route>
          <Route exact path="/:username">
            <MyTweets />
          </Route>
          <Route exact path="/:username/profile">
            <Profile />
          </Route>
        </>
        )
      </Switch>
    </div>
  );
}

export default App;
