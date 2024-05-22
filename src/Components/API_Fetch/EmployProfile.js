import Navbar from "../userInterface/Navbar";
import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./EmployProfile.css"; // Import the CSS file
import Footer from "../Footer/Footer";

const EmployeeProfile = () => {
  const [originalEmployeeData, setOriginalEmployeeData] = useState([]);
  const [employeeData, setEmployeeData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    // Fetch original employee data
    fetchEmployeeData();
  }, []);

  const fetchEmployeeData = () => {
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
          setOriginalEmployeeData(data.results);
          setEmployeeData(data.results); // Set both original and current employee data
        } else {
          console.error("Employee Data is not in the expected format.");
        }
      })
      .catch((error) => console.log(error, "Some error"));
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    // Filter employee data based on the search query
    const filteredData = originalEmployeeData.filter((employee) =>
      employee.name.toLowerCase().includes(query.toLowerCase())
    );
    setEmployeeData(filteredData);
  };

  const resetSearch = () => {
    // Reset the search query and fetch all employees again
    setSearchQuery("");
    setEmployeeData(originalEmployeeData);
  };

  return (
    <>
      <div className="profile">
        <Navbar />
        <div className="container mt-3">
          <h1>
            <strong className="headertext">Employee Details</strong>
          </h1>
          <div className="row">
            <div className="col-md-12 mb-4">
              <div className="input-group mb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search by Name"
                  value={searchQuery}
                  onChange={(e) => handleSearch(e.target.value)}
                />
                <div className="input-group-append">
                  <button
                    className="btn btn-outline-secondary"
                    type="button"
                    onClick={resetSearch}
                  >
                    Reset
                  </button>
                </div>
              </div>
            </div>
            {employeeData.map((employee, index) => (
              <div key={index} className="col-md-4 mb-4">
                <div className="card">
                  <img
                    src={employee.avatar}
                    className="card-img-top"
                    alt="Avatar"
                    style={{
                      width: "130px",
                      marginLeft: "7rem",
                      marginTop: "5px",
                      height: "130px",
                      borderRadius: "50%",
                    }}
                  />
                  <div className="card-body">
                    <h5 className="card-title">
                      <strong style={{ fontSize: "2rem" }}>
                        {employee.name}
                      </strong>
                    </h5>
                    <p className="card-text">
                      {" "}
                      <strong>Email:</strong> {employee.email}
                    </p>
                    <p className="card-text">
                      {" "}
                      <strong>Designation:</strong> {employee.designation}
                    </p>
                    <p className="card-text">
                      {" "}
                      <strong>CNIC:</strong> {employee.CNIC}
                    </p>
                    <p className="card-text">
                      {" "}
                      <strong>Phone:</strong> {employee.phone}
                    </p>
                    <p className="card-text">
                      {" "}
                      <strong>Joining Date:</strong> {employee.joining_date}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default EmployeeProfile;
