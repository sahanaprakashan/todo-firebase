import DashBoard from "./component/DashBoard";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./component/Login";


function App() {
  return (
    <div className="App">
   

    <Router>
          <Routes> 
          <Route path="/" element={<Login />} />
            <Route path="/login" element={<Login />} />
            <Route path="/dashboard" element={<DashBoard />} />  
          </Routes>
        </Router>
    </div>
  );
}

export default App;
