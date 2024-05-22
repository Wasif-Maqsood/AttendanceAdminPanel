import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Employee from "./Components/API_Fetch/Employee";
import HomePage from "./Components/userInterface/HomePage";
import SignUp from "./Components/Login/SignUp";
import AllEmployeeData from "./Components/API_Fetch/AllEmployeeData";
import After_9am from "./Components/API_Fetch/After_9am";
import EmployeeProfile from "./Components/API_Fetch/EmployProfile";
import LoginPage from "./Components/Login/LoginPage";

import AttendenceNotSubmitted from "./Components/API_Fetch/AttendenceNotSubmitted";

// hamid mobile password 7388

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          {/* <Route path="/" element={<Login />} /> */}
          <Route path="/home" element={<HomePage />} />
          <Route path="/after9am" element={<After_9am />} />
          <Route path="/allemployee" element={<AllEmployeeData />} />
          <Route path="/employee" element={<Employee />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/employeeprofile" element={<EmployeeProfile />} />
          <Route path="/" element={<LoginPage />} />
          <Route
            path="/attendencenotsub"
            element={<AttendenceNotSubmitted />}
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
