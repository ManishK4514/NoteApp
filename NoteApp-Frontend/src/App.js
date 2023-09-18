import './App.css';
import {BrowserRouter, Routes, Route} from "react-router-dom";

import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import DashboardPage from './pages/DashboardPage';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
          <Routes>
            <Route path= "/" element = {<LoginPage />}/>
            <Route path= "/signup" element = {<SignUpPage />}/>
            <Route path= "/dashboard" element = {<DashboardPage />}/>
          </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
