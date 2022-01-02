import './App.css';
import Registration from './Screens/Registration';
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import Login from './Screens/Login';
import Preferences from './Screens/Preferences';


function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="login" element={<Login />} />
      <Route path="register" element={<Registration />} />
      <Route path="/preferences" element={<Preferences />} />
    </Routes>
  </BrowserRouter>
  );
}

export default App;
