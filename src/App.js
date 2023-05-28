import "bootstrap/dist/css/bootstrap.min.css";
import './App.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Users from "./pages/Users";
import PrivateRouter from "./pages/PrivateRouter";

function App() {
  return (
    <div>
      <BrowserRouter>
          <Routes>
              <Route path="/register" element={<Register />} />
              <Route path="/login" element={<Login />} />
              <Route element={<PrivateRouter />}>
                  <Route path="/" element={<Users />} />
              </Route>
          </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
