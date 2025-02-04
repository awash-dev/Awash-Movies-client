
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./index.css";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import Repass from "./pages/Rest-Pass"
import Movies from "./movies/Movies";
import Profile from './app/Profile'
function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/sign-up" element={<Register />} />
      <Route path="/home" element={<Home />} />
      <Route path="/rest-pass" element={<Repass />} />
      <Route path="/profile" element={<Profile token={null} />} />
      <Route path="/movies/:id" element={<Movies />} />

    </Routes>
  );
}

export default function App() {
  return (
    <Router>
      <AppRouter />
    </Router>
  );
}
