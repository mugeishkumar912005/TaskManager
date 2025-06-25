import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Components/Login";
import Main from "./Components/Main";
import Settings from "./Components/Settings";
import ProtectedRoute from "./Components/ProtectedRoute.jsx";
import Dashboard from "./Components/DashBoard.jsx";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<ProtectedRoute><Main /></ProtectedRoute>} />
        <Route path="/settings" element={<ProtectedRoute><Settings /></ProtectedRoute>} />
        <Route path="/DashBoard" element={<ProtectedRoute><Dashboard/> </ProtectedRoute>}/>
      </Routes>
    </Router>
  );
}

export default App;
