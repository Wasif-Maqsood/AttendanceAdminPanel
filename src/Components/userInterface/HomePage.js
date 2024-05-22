import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button } from "@mui/material";
import Navbar from "../userInterface/Navbar";
import { Link } from "react-router-dom";
import Footer from "../Footer/Footer";


const HomePage = () => {
  return (
    <>
      <Navbar />
      <div className="background"></div>
      <table
        style={{
          marginTop: "1rem",
          marginLeft: "7.5rem",
          width: "65rem",
          textAlign: "center",
          color: "#0a2d45",
        }}
      >
        <thead>
          <tr>
            <th
              style={{
                backgroundColor: "white",
                width: "25.5rem",
                borderRight: "2px solid #00308F",
                borderTopLeftRadius: "8px",
                borderEndStartRadius: "8px",
              }}
            >
              <h1 class="w3-jumbo w3-teal">
                <i class="fa fa-warning" style={{ fontSize: "9rem" }}>
                  <h4>
                    <Link to="/attendencenotsub">
                      <Button
                        style={{
                          backgroundColor: "#0a2d45",
                          border: "3px solid black",
                          color: "white",
                          fontWeight: "bold",
                        }}
                      >
                        not Submitted attendance
                      </Button>
                    </Link>
                  </h4>
                </i>
              </h1>
            </th>
            <th
              style={{
                backgroundColor: "white",
                width: "25rem",
                borderRight: "2px solid #00308F",
              }}
            >
              <h1 class="w3-jumbo w3-teal">
                <i class="fa fa-address-card" style={{ fontSize: "10rem" }}>
                  <h4>
                    <Link to="/employee">
                      <Button
                        style={{
                          backgroundColor: "#0a2d45",
                          border: "3px solid black",
                          color: "white",
                          fontWeight: "bold",
                        }}
                      >
                        Attendance Details
                      </Button>
                    </Link>
                  </h4>
                </i>
              </h1>
            </th>
            <th
              style={{
                backgroundColor: "white",
                width: "25.5rem",
                borderTopRightRadius: "8px",
                borderEndEndRadius: "8px",
              }}
            >
              <h1 class="w3-jumbo w3-teal">
                <i class="fa fa-group" style={{ fontSize: "8rem" }}>
                  <h4>
                    <Link to="/employeeprofile">
                      <Button
                        style={{
                          backgroundColor: "#0a2d45",
                          border: "3px solid black",
                          marginTop: "1rem",
                          color: "white",
                          fontWeight: "bold",
                        }}
                      >
                        Employee Profile
                      </Button>
                    </Link>
                  </h4>
                </i>
              </h1>
            </th>
          </tr>
        </thead>
      </table>
      {/* new table  */}
      <table
        style={{
          marginTop: "1rem",
          marginLeft: "7.5rem",
          width: "65rem",
          textAlign: "center",
          color: "#0a2d45",
        }}
      >
        <thead>
          <tr>
            <th
              style={{
                backgroundColor: "white",
                width: "25rem",
                borderRight: "2px solid #00308F",
                borderTopLeftRadius: "8px",
                borderEndStartRadius: "8px",
              }}
            >
              <h1 class="w3-jumbo w3-teal">
                <i class="	fa fa-sign-out" style={{ fontSize: "10rem" }}>

                  <h4>
                    <Link to="/after9am">
                      <Button
                        style={{
                          border: "3px solid black",
                          color: "white",
                          fontWeight: "bold",
                          backgroundColor: "#0a2d45",
                        }}
                      >
                        About Leave
                      </Button>
                    </Link>
                  </h4>
                </i>
              </h1>
            </th>
            <th
              style={{
                backgroundColor: "white",
                width: "25rem",
                borderRight: "2px solid #00308F",
              }}
            >
              <h1 class="w3-jumbo w3-teal">
                <i class="fa fa-book" style={{ fontSize: "8rem" }}>
                  <h4>
                    <Link to="/allemployee">
                      <Button
                        style={{
                          backgroundColor: "#0a2d45",
                          border: "3px solid black",
                          color: "white",
                          fontWeight: "bold",
                          cursor: "pointer",
                        }}
                      >
                        All Attendance
                      </Button>
                    </Link>
                  </h4>
                </i>
              </h1>
            </th>
            <th
              style={{
                backgroundColor: "white",
                width: "25rem",
                borderTopRightRadius: "8px",
                borderEndEndRadius: "8px",
              }}
            >
              <h1 class="w3-jumbo w3-teal">
                <i className="fa fa-user-plus" style={{ fontSize: "8rem" }}>
                  <h4>
                    <Link to="/signup">
                      <Button
                        style={{
                          backgroundColor: "#0a2d45",
                          border: "3px solid black",
                          color: "white",
                          fontWeight: "bold",
                          cursor: "pointer",
                        }}
                      >
                        Employee Register
                      </Button>
                    </Link>
                  </h4>
                </i>
              </h1>
            </th>
          </tr>
        </thead>
      </table>
      <br />
      <br />
      <br />
      <Footer />
    </>
  );
};
export default HomePage;
