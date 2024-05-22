import React, { useState, useEffect } from "react";
import "./After_9am.css";
import Navbar from "../userInterface/Navbar";
import Footer from "../Footer/Footer";

const EmployeeProfile = () => {
  const [leaveData, setLeaveData] = useState([]);
  const [employeeData, setEmployeeData] = useState([]);

  useEffect(() => {
    // Fetch leave data from the API
    fetchLeaveData();
    // Fetch employee data from the API
    fetchEmployeeData();
  }, []);

  const fetchLeaveData = () => {
    fetch("http://39.61.51.195:8003/api/v1/accounts/Leave_Table/")
      .then((response) => response.json())
      .then((data) => {
        if (data && data.results) {
          setLeaveData(data.results);
        } else {
          console.error("Leave Data is not in the expected format.");
        }
      })
      .catch((error) => console.error("Error fetching leave data:", error));
  };

  const fetchEmployeeData = () => {
    fetch("http://39.61.51.195:8003/api/v1/accounts/listemployee/")
      .then((response) => response.json())
      .then((data) => {
        if (data && data.results) {
          setEmployeeData(data.results);
        } else {
          console.error("Employee Data is not in the expected format.");
        }
      })
      .catch((error) => console.error("Error fetching employee data:", error));
  };

  // Function to get employee name by user ID
  const getEmployeeNameById = (userId) => {
    const employee = employeeData.find((emp) => emp.id === userId);
    return employee ? employee.name : "Unknown";
  };

  return (
    <>
      <Navbar />
      <div>
        <h2 className="head">Employee Leave</h2>
        <div className="table-container">
          <table className="styled-table">
            <thead>
              <tr>
                <th className="tableleave">Sr. #.</th>
                <th className="tableleave">Employee Name</th>
                <th className="tableleave">Date</th>
                <th className="tableleave">Leave Reason</th>
                <th className="tableleave">Status</th>
              </tr>
            </thead>
            <tbody>
              {leaveData.length === 0 ? (
                <tr>
                  <td className="tableleave">-</td>
                  <td className="tableleave">-</td>
                  <td className="tableleave">-</td>
                  <td className="tableleave">-</td>
                  <td className="tableleave">-</td>
                </tr>
              ) : (
                leaveData.map((leave, index) => (
                  <tr key={index}>
                    <td className="tableleave">{index + 1}</td>
                    <td className="tableleave">
                      {getEmployeeNameById(leave.user_id)}
                    </td>
                    <td className="tableleave">{leave.date}</td>
                    <td className="tableleave">{leave.leave_reason}</td>
                    <td className="tableleave">{leave.status}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
      <Footer />
    </>
  );
};
export default EmployeeProfile;
