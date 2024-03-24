import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Signup from "./components/pages/signup";
import Login from "./components/pages/login";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </Router>
  );
}
export default App;
