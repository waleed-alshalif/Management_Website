import { Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import Dashboard from "./Dashboard/Dashboard";
import "./index.css"; // أو App.css
import Card from "./Dashboard/Card";
import AddUser from "./Dashboard/Users/AddUser";
import UpdateUser from "./Dashboard/Users/UpdateUser";
import Services from "./Pages/Services";
import Main from "./Pages/Main";
import Layout from "./Pages/Layout";
import Contect from "./Pages/Contect";
import AllUser from "./Dashboard/Users/AllUser";
import AddEmploye from "./Dashboard/Employees/AddEmploye";
import AllEmployees from "./Dashboard/Employees/AllEmployees";
import UpdateEmploye from "./Dashboard/Employees/UpdateEmploye";
import AllOffice from "./Dashboard/Offices/AllOffices";
import AddOffice from "./Dashboard/Offices/AddOffice";
import UpdateOffice from "./Dashboard/Offices/UpdateOffice";

function App() {
  return (
    <div>
      <Routes>
        {/* التوجيه العام لداشبورد مع صفحاته الفرعية */}
        <Route path="/dashboard" element={<Dashboard />}>
          <Route index element={<Card />} />

          {/* USER */}
          <Route path="alluser" element={<AllUser />} />
          <Route path="updateuser/:id" element={<UpdateUser />} />
          <Route path="adduser" element={<AddUser />} />

          {/* EMPLOYEES */}
          <Route path="addemployes" element={<AddEmploye />} />
          <Route path="employes" element={<AllEmployees />} />
          <Route path="updateemp/:id" element={<UpdateEmploye />} />

          {/* OFFICE */}
          <Route path="addoffice" element={<AddOffice />} />
          <Route path="offices" element={<AllOffice />} />
          <Route path="updateoff/:id" element={<UpdateOffice />} />
        </Route>

        {/* صفحات خارج داشبورد */}
        <Route path="/" element={<Layout />}>
          <Route path="content" element={<Contect />} />
          <Route path="home" element={<Home />} />
          <Route path="service" element={<Services />} />
          <Route path="main" element={<Main />} />
        </Route>

        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </div>
  );
}

export default App;
