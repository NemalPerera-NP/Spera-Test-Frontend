import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Signup from "./components/pages/signup";
import Login from "./components/pages/login";
import Home from "./components/pages/home";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </Router>
  );
}
export default App;
