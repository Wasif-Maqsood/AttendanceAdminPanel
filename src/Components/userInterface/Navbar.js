import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import logo from "../Assets/logo.png";
import "./navbar.css";

const Navbar = () => {
  const [attendanceRecords, setAttendanceRecords] = useState([]);
  const [employeeData, setEmployeeData] = useState([]);
  const [uniqueLateArrivalsCount, setUniqueLateArrivalsCount] = useState(0);
  const [uniqueLateArrivals, setUniqueLateArrivals] = useState([]);
  const [notSubmittedUsers, setNotSubmittedUsers] = useState([]);
  const [showNotifications, setShowNotifications] = useState(false);

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

    // Fetch employee data
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
          setEmployeeData(data.results);
        } else {
          console.error("Employee Data is not in the expected format.");
        }
      })
      .catch((error) => console.log(error, "Some error"));
  }, []);

  useEffect(() => {
    const todayRecordsAbove9 = filterTodayTimeAbove9();
    const uniqueNamesSet = new Set(
      todayRecordsAbove9.map((record) => record.employeeName)
    );
    setUniqueLateArrivalsCount(uniqueNamesSet.size);
    setUniqueLateArrivals(
      todayRecordsAbove9.filter(
        (record, index, self) =>
          index ===
          self.findIndex((r) => r.employeeName === record.employeeName)
      )
    );

    const users = employeeData.filter(
      (user) =>
        !attendanceRecords.some(
          (record) =>
            record.user_id === user.id &&
            record.time_in.includes(new Date().toISOString().split("T")[0])
        )
    );
    setNotSubmittedUsers(users);
  }, [attendanceRecords, employeeData]);

  const handleBellIconClick = () => {
    setShowNotifications(!showNotifications);
  };

  // ...

  const filterTodayTimeAbove9 = () => {
    const currentDate = new Date().toISOString().split("T")[0];

    return (
      attendanceRecords
        .filter((record) => {
          const recordDate = record.time_in
            ? record.time_in.split("T")[0]
            : null;
          const timeIn = record.time_in
            ? record.time_in.split("T")[1]?.split(".")[0]
            : null;
          const hour = timeIn ? parseInt(timeIn.split(":")[0], 10) : null;
          const minute = timeIn ? parseInt(timeIn.split(":")[1], 10) : null;
          return (
            recordDate === currentDate &&
            (hour > 8 || (hour === 8 && minute >= 30))
          );
        })

        // alert(recordDate)

        .map((record) => ({
          user_id: record.user_id,
          employeeName: getEmployeeName(record.user_id),
          timeIn: record.time_in
            ? record.time_in.split("T")[1]?.split(".")[0]
            : null,
          timeOut: record.time_out
            ? record.time_out.split("T")[1]?.split(".")[0]
            : null,
        }))
    );
  };
  const getEmployeeName = (userId) => {
    const employee = employeeData.find((employee) => employee.id === userId);
    return employee ? employee.name : "Unknown";
  };

  return (
    <>
      <nav
        className="navbar navbar-expand-lg "
        style={{ backgroundColor: "#0a2d45" }}
      >
        <Link className="navbar-brand" to={"/home"}>
          <img src={logo} style={{ width: "40px", height: "40px" }} />
          <strong
            style={{
              marginLeft: "1rem",
              // textDecoration: "underline",
              color: "white",
              cursor: "pointer",
            }}
          >
            Wise group of College
          </strong>
        </Link>

        {/* Notification btn */}
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <div
            className="btn-group"
            style={{ display: "flex", alignItems: "center" }}
          >
            <li
              onClick={handleBellIconClick}
              className="fa fa-bell notificatio-element"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              <span
                className="position-absolute bottom start-100 translate-middle badge rounded-pill bg-danger"
                style={{
                  color: "white",
                  cursor: "pointer",
                  fontSize: "0.8rem",
                }}
              >
                {uniqueLateArrivalsCount + notSubmittedUsers.length}
              </span>
            </li>

            <div
              className="dropdown-menu dropdown-menu-right"
              style={{
                backgroundColor: "yellowgreen",
                border: "2px solid black",
                // width: "20rem",
                marginLeft: "36rem",
              }}
            >
              <i onClick={handleBellIconClick}>
                <strong
                  style={{
                    marginLeft: "7rem",
                    // textAlign:"center",
                    color: "red",
                    textDecoration: "underline",
                    backgroundColor: "yellowgreen",
                  }}
                >
                  Notifications
                </strong>
                {showNotifications && (
                  <div
                    className="dropdown"
                    style={{
                      backgroundColor: "white",
                      marginTop: "0.5rem",
                      width: "24rem",
                    }}
                  >
                    <div className="dropdown-content">
                      <ul>
                        {uniqueLateArrivalsCount > 0 && showNotifications && (
                          <li>
                            <strong style={{ textDecoration: "underline" }}>
                              <h5 style={{ fontWeight: "bold" }}>
                                After 9AM Attendance:
                              </h5>
                            </strong>
                            <ul>
                              {uniqueLateArrivals.map((record, index) => (
                                <li key={index}>
                                  <strong>{record.employeeName}</strong> - Time
                                  In: <strong>{record.timeIn}</strong>
                                </li>
                              ))}
                            </ul>
                          </li>
                        )}
                        {notSubmittedUsers.length > 0 && showNotifications && (
                          <li>
                            <strong style={{ textDecoration: "underline" }}>
                              <h5 style={{ fontWeight: "bold" }}>
                                Today Absent Employees List:
                              </h5>
                            </strong>
                            <ul>
                              {notSubmittedUsers.map((user, index) => (
                                <li key={index}>
                                  <strong>{user.name}</strong>
                                </li>
                              ))}
                            </ul>
                          </li>
                        )}
                      </ul>
                    </div>
                  </div>
                )}
              </i>
            </div>
          </div>
        </div>

        <ul className="navbar-nav mr-auto">
          <li className="nav-item active">
            <a
              className="btn black mr-3  nav-link btn-outline-primary my-2  my-sm-0"
              href="/"
              style={{
                border: "black",
                color: "white",
                marginRight: "5rem",
                backgroundColor: "",
                border: "2px solid white",
              }}
            >
              {" "}
              <strong>LogOut</strong> <span className="sr-only">(current)</span>
            </a>
          </li>
        </ul>
      </nav>
    </>
  );
};

export default Navbar;
