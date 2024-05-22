import React, { useState, useEffect } from "react";
import Navbar from "../userInterface/Navbar";
import saveAs from "file-saver";
import * as XLSX from "xlsx";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Footer from "../Footer/Footer";
import "./Employee.css";

const Api_Test = () => {
  const notify = (message) =>
    toast(message, {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });

  const [attendanceRecords, setAttendanceRecords] = useState([]);
  const [employeeRecords, setEmployeeRecords] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
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
  }, []);

  const handleSelectChange = (e) => {
    const selectedUserName = e.target.value;
    const user = employeeRecords.find((user) => user.name === selectedUserName);
    setSelectedUser(user);

    createNotification(user);
  };

  const extractDate = (datetime) => {
    return datetime ? datetime.split("T")[0] : "";
  };

  const extractTime = (datetime) => {
    return datetime ? datetime.split("T")[1]?.split(".")[0] : "";
  };

  const isTodayAfter9PM = () => {
    const now = new Date();
    const targetTime = new Date();
    targetTime.setHours(21, 0, 0, 0);
    return now.getTime() >= targetTime.getTime();
  };

  const createNotification = (user) => {
    const latestTimeInRecord = attendanceRecords
      .filter((record) => record.user_id === user.id)
      .reduce((latestRecord, record) => {
        if (!latestRecord || record.time_in > latestRecord.time_in) {
          return record;
        }
        return latestRecord;
      }, null);

    if (latestTimeInRecord) {
      const timeIn = extractTime(latestTimeInRecord.time_in);
      notify(`Latest Time In recorded for ${user.name}: ${timeIn}`);
    } else {
      notify(`No Time In records found for ${user.name}.`);
    }
  };

  useEffect(() => {
    const checkTimeAndNotify = () => {
      if (isTodayAfter9PM() && selectedUser) {
        createNotification(selectedUser);
      }
    };

    const notificationInterval = setInterval(checkTimeAndNotify, 60000);

    checkTimeAndNotify();

    return () => clearInterval(notificationInterval);
  }, [selectedUser, attendanceRecords]);

  const handleDownload = () => {
    if (!selectedUser) {
      console.error("No user selected.");
      return;
    }

    const data = attendanceRecords
      .filter((record) => record.user_id === selectedUser.id)
      .map((record) => ({
        Date: extractDate(record.time_in),
        TimeIn: extractTime(record.time_in),
        TimeOut: extractTime(record.time_out),
      }));

    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Attendance Details");
    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });

    const filename = `${selectedUser.email || "user"}.xlsx`;

    const excelData = new Blob([excelBuffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });
    saveAs(excelData, filename);
  };

  return (
    <>
      <Navbar />
      <div className="background22"></div>
      <div
        style={{
          marginLeft: "15%",
          width: "70%",
          height: "75vh",
          marginTop: "2rem",
          border: "4px solid #00308F",
          borderRadius: "1rem",
          marginBottom: "3.6rem",
        }}
      >
        <h1>
          <strong
            style={{
              color: "black",
              marginLeft: "2rem",
              textDecoration: "underline",
            }}
          >
            Select Employee to View All Attendance.
          </strong>
        </h1>
        <div
          style={{ color: "black", marginLeft: "2rem", marginBottom: "1rem" }}
        >
          <span style={{ fontWeight: "bold" }}>
            Select an Employee: <br />
          </span>
          <select
            style={{
              fontWeight: "bold",
              fontSize: "1.2rem",
              backgroundColor: "black",
              color: "white",
            }}
            onChange={handleSelectChange}
          >
            <option value="">
              Select an Employee <br />
            </option>
            {employeeRecords.map((user, index) => (
              <option key={index} value={user.name}>
                {user.name} <br />
              </option>
            ))}
          </select>
        </div>

        {selectedUser && (
          <div
            style={{
              marginLeft: "2rem",
              border: "5px solid black",
              marginTop: "1rem",
              width: "35rem",
              backgroundColor: "white",
              marginBottom: "1rem",
              borderRadius: "1rem",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <p>
              {selectedUser.avatar && (
                <img
                  src={selectedUser.avatar}
                  alt="User Avatar"
                  width="100"
                  height="100"
                  style={{ marginLeft: "2.5rem" }}
                />
              )}
            </p>
            <p style={{ color: "black" }}>
              <strong style={{ marginLeft: "2.5rem" }}>Name:</strong>{" "}
              {selectedUser.name}
            </p>
            <p style={{ color: "black" }}>
              <strong style={{ marginLeft: "2.5rem" }}>Designation:</strong>{" "}
              {selectedUser.designation}
            </p>
            <p style={{ color: "black" }}>
              <strong style={{ marginLeft: "2.5rem" }}>Email:</strong>{" "}
              {selectedUser.email}
            </p>
          </div>
        )}
        <div style={{ marginBottom: "2rem" }}>
          {selectedUser && (
            <div>
              <a className="file-btn" onClick={handleDownload}>
                {" "}
                <strong className="filebtntext">
                  Download Attendance Details In Excel
                </strong>
              </a>
            </div>
          )}
        </div>
        <div>
          <ToastContainer
            position="top-center"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="dark"
          />
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Api_Test;
