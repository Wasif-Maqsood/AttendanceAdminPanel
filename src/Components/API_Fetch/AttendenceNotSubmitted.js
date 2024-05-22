import React, { useState, useEffect } from "react";
import Navbar from "../userInterface/Navbar";
import "react-toastify/dist/ReactToastify.css";
import Table from "react-bootstrap/Table";
import "./AttendenceNotSubmitted.css";
import Footer from "../Footer/Footer";

const AttendenceNotSubmitted = () => {
  const [attendanceRecords, setAttendanceRecords] = useState([]);
  const [employeeRecords, setEmployeeRecords] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // State to track loading status

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
      .catch((error) => console.log(error, "Some error"))
      .finally(() => setIsLoading(false)); // Set loading to false when fetch completes

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
      .catch((error) => console.log(error, "Some error"))
      .finally(() => setIsLoading(false)); // Set loading to false when fetch completes
  }, []);

  // Filter records to show only users who have not submitted time today
  const notSubmittedUsers = employeeRecords.filter(
    (user) =>
      !attendanceRecords.some(
        (record) =>
          record.user_id === user.id &&
          record.time_in.includes(new Date().toISOString().split("T")[0])
      )
  );

  return (
    <>
      <div className="notmarkattendance">
        <Navbar />
        <h1 className="attendance-header">
          Today's User's Not Marked Attendance
        </h1>
        <div className="attendance-table-container">
          {isLoading ? ( // Conditional rendering based on loading state
            <div className="loaderback">
              <div className="Loader"></div>
            </div>
          ) : (
            <Table striped bordered hover>
              <thead>
                <tr className="attendance-table">
                  <th>Sr. #.</th>
                  <th>Name</th>
                  <th>Contact #.</th>
                  <th>Designation</th>
                </tr>
              </thead>
              <tbody>
                {notSubmittedUsers.map((user, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td className="sr">{user.name}</td>
                    <td>{user.phone}</td>
                    <td className="sr">{user.designation}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}
        </div>
        <Footer />
      </div>
    </>
  );
};

export default AttendenceNotSubmitted;
