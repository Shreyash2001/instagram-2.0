import './App.css';
import Registration from './Screens/Registration';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Login from './Screens/Login';
import Preferences from './Screens/Preferences';
import Home from './Screens/Home';
import PostById from './Screens/PostById';
import AddStory from './Components/AddStory';


function App() {
  return (
    <Router>
    <Switch>
      <Route path="/story/create">
        <AddStory />
        <Home />
      </Route>
      <Route path="/post/:id">
        <PostById />
        <Home />
      </Route>
      <Route path="/register">
        <Registration />
      </Route>
      <Route path="/login">
        <Login />
      </Route>
      <Route path="/preferences">
        <Preferences />
      </Route>
      <Route path="/">
        <Home />
      </Route>
    </Switch>
  </Router>
  );
}

export default App;
