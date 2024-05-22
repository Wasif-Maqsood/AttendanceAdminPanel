import React, { useState, useEffect } from "react";
import Navbar from "../userInterface/Navbar";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Footer from "../Footer/Footer";
import "./AllEmployeeData.css";
import "./AllEmployeeData.css"; // Import the CSS file

const Api_Test = () => {
  const notify = (message) => toast(message);

  const [attendanceRecords, setAttendanceRecords] = useState([]);
  const [employeeRecords, setEmployeeRecords] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    // Fetch attendance records
    fetch("http://39.61.51.195:8003/api/v1/accounts/listattendance/", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data && data.results) {
          setAttendanceRecords(data.results);
        } else {
          console.error("Attendance Data is not in the expected format.");
        }
      })
      .catch((error) => console.log(error, "Some error"));
  }, [selectedUser]); // Update attendance records when selectedUser changes

  useEffect(() => {
    // Fetch employee names
    fetch("http://39.61.51.195:8003/api/v1/accounts/listemployee/", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data && data.results) {
          setEmployeeRecords(data.results);
        } else {
          console.error("Employee Data is not in the expected format.");
        }
      })
      .catch((error) => console.log(error, "Some error"));
  }, []); // Fetch employee names only once when the component mounts

  const handleSelectChange = async (e) => {
    const selectedUserName = e.target.value;
    const user = employeeRecords.find((user) => user.name === selectedUserName);
    setSelectedUser(user);
  };

  const extractDate = (datetime) => {
    return datetime ? datetime.split("T")[0] : "";
  };

  const extractTime = (datetime) => {
    return datetime ? datetime.split("T")[1]?.split(".")[0] : "";
  };

  const isAfter9PM = (time) => {
    const targetTime = new Date();
    targetTime.setHours(21, 0, 0, 0);
    const checkTime = new Date();
    checkTime.setHours(...time.split(":"), 0, 0);

    return checkTime.getTime() >= targetTime.getTime();
  };

  const tableData = attendanceRecords.map((record) => ({
    userName:
      employeeRecords.find((user) => user.id === record.user_id)?.name ||
      "Unknown User",
    date: extractDate(record.time_in),
    timeIn: extractTime(record.time_in),
    timeOut: extractTime(record.time_out),
  }));

  return (
    <>
      <Navbar />
      {/* <div className="atndcontainer">
        <h1>
          <strong className="header">All Employees Attendance Details</strong>
        </h1>
        <table className="table">
          <thead>
            <tr className="tableheader">
              <th><h4>User Name</h4></th>
              <th><h4>Date</h4></th>
              <th><h4>Time In</h4></th>
              <th><h4>Time Out</h4></th>
            </tr>
          </thead>
          <tbody>
            {tableData.map((data, index) => (
              <tr key={index}>
                <td className="table-cell">{data.userName}</td>
                <td className="table-cell">{data.date}</td>
                <td className="table-cell">{data.timeIn}</td>
                <td className="table-cell">{data.timeOut}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div> */}
      <div className="atndcontainer">
        <h1>this page is not available </h1>
      </div>
      <Footer />
    </>
  );
};

export default Api_Test;
