import React, { useState } from "react";
import axios from "axios";
import Navbar from "../userInterface/Navbar";
import { ToastContainer, toast } from "react-toastify";

import "./SignUp.css";
import Footer from "../Footer/Footer";

const Signup = () => {
  const [loading, setLoading] = useState(false);
  const successful = () =>
    toast.success("Login Successful!", {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });

  const [formData, setFormData] = useState({
    avatar: null,
    name: "",
    email: "",
    CNIC: "",
    phone: "",
    password: "",
    joining_date: "",
    designation: "",
    location_id: 1,
    time_in: "",
    time_out: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData((prevData) => ({
      ...prevData,
      avatar: file,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formDataObj = new FormData();
      for (const key in formData) {
        formDataObj.append(key, formData[key]);
      }

      // Append the file to FormData
      if (formData.avatar) {
        formDataObj.append("avatar", formData.avatar);
      }

      // Make an API call to the backend
      const response = await axios.post(
        "http://39.61.51.195:8003/api/v1/accounts/Emp_Register_View/",
        formDataObj
      );

      // Handle the response, e.g., show a success message
      console.log("API Response:", response.data);
      successful();
    } catch (error) {
      // Handle errors, e.g., show an error message
      console.error("Error:", error.message);
      alert("Signup failed sdfas");
      failed(); // Call the failed function to display toast notification
      setLoading(false);
    }
  };

  const failed = () =>
    toast.warn("Please enter email & password!", {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });

  return (
    <>
      <Navbar />
      <div className="background"></div>
      <div className="signup-container">
        <h2 className="signup-heading">Register Employee</h2>
        <form
          onSubmit={handleSubmit}
          encType="multipart/form-data"
          className="signup-form"
        >
          <div className="form-group">
            <div style={{ alignContent: "center", alignItems: "center" }}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  width: "50%",
                  marginBottom: "0.1rem",
                }}
              >
                {" "}
                <div>
                  <label
                    className="form-label"
                    style={{
                      fontWeight: "bold",
                      marginRight: "0.5rem",
                      fontSize: "1rem",
                    }}
                  >
                    Profile Picture:
                  </label>
                  <input
                    style={{
                      marginLeft: "2rem",
                      width: "17rem",
                      height: "2.5rem",
                      border: "2px solid black",
                      borderRadius: "0.4rem",
                    }}
                    type="file"
                    name="avatar"
                    onChange={handleFileChange}
                    accept="image/*"
                    className="form-input"
                  />
                </div>
                <div>
                  <label
                    style={{
                      fontWeight: "bold",
                      marginRight: "0.5rem",
                      fontSize: "1rem",
                    }}
                  >
                    Name:
                  </label>
                  <input
                    style={{
                      marginLeft: "2rem",
                      width: "17rem",
                      height: "2.5rem",
                      border: "2px solid black",
                      borderRadius: "0.4rem",
                    }}
                    placeholder="Name"
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div>
                  <label
                    style={{
                      fontWeight: "bold",
                      marginRight: "0.5rem",
                      fontSize: "1rem",
                    }}
                  >
                    Email:
                  </label>
                  <input
                    style={{
                      marginLeft: "2rem",
                      marginLeft: "2rem",
                      width: "17rem",
                      height: "2.5rem",
                      border: "2px solid black",
                      borderRadius: "0.4rem",
                    }}
                    placeholder="Email"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div
                style={{
                  display: "flex",
                  width: "50%",
                  marginBottom: "0.1rem",
                }}
              >
                <div>
                  <label
                    style={{
                      fontWeight: "bold",
                      marginRight: "0.5rem",
                      fontSize: "1rem",
                    }}
                  >
                    CNIC:
                  </label>
                  <input
                    style={{
                      marginLeft: "2rem",
                      width: "17rem",
                      height: "2.5rem",
                      border: "2px solid black",
                      borderRadius: "0.4rem",
                    }}
                    placeholder="CNIC"
                    type="cnic"
                    name="CNIC"
                    value={formData.CNIC}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div>
                  <label
                    style={{
                      fontWeight: "bold",
                      marginRight: "0.5rem",
                      fontSize: "1rem",
                    }}
                  >
                    Password:
                  </label>
                  <input
                    style={{
                      marginLeft: "2rem",
                      marginLeft: "2rem",
                      width: "17rem",
                      height: "2.5rem",
                      border: "2px solid black",
                      borderRadius: "0.4rem",
                    }}
                    placeholder="Password"
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div>
                  <label style={{ fontWeight: "bold", fontSize: "1rem" }}>
                    Join Date:
                  </label>
                  <input
                    style={{
                      marginLeft: "2rem",
                      marginLeft: "2rem",
                      width: "17rem",
                      height: "2.5rem",
                      border: "2px solid black",
                      borderRadius: "0.4rem",
                    }}
                    type="date"
                    name="joining_date"
                    value={formData.joining_date}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  width: "50%",
                  marginBottom: "0.1rem",
                }}
              ></div>

              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  width: "50%",
                  marginBottom: "0.1rem",
                }}
              >
                <div>
                  <label
                    style={{
                      fontWeight: "bold",
                      marginRight: "0.5rem",
                      fontSize: "1rem",
                    }}
                  >
                    Location:{" "}
                  </label>
                  <input
                    style={{
                      marginLeft: "2rem",
                      marginLeft: "2rem",
                      width: "17rem",
                      height: "2.5rem",
                      border: "2px solid black",
                      borderRadius: "0.4rem",
                    }}
                    placeholder="Address auto Selected"
                    type="number"
                    name="location_id"
                    readOnly
                    required
                  />
                </div>
                <div>
                  <label style={{ fontWeight: "bold", fontSize: "1rem" }}>
                    Designation:
                  </label>
                  <input
                    style={{
                      marginLeft: "2rem",
                      marginLeft: "2rem",
                      width: "17rem",
                      height: "2.5rem",
                      border: "2px solid black",
                      borderRadius: "0.4rem",
                    }}
                    placeholder="Designation"
                    type="text"
                    name="designation"
                    value={formData.designation}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div>
                  <label style={{ fontWeight: "bold", fontSize: "1rem" }}>
                    Time_In:
                  </label>
                  <input
                    style={{
                      marginLeft: "2rem",
                      width: "17rem",
                      height: "2.5rem",
                      border: "2px solid black",
                      borderRadius: "0.4rem",
                    }}
                    placeholder="Date"
                    type="datetime-local"
                    name="time_in"
                    value={formData.time_in}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  width: "50%",
                  marginBottom: "1rem",
                }}
              >
                <div>
                  <label style={{ fontWeight: "bold", fontSize: "1rem" }}>
                    Time_Out:
                  </label>
                  <input
                    style={{
                      marginLeft: "2rem",
                      width: "17rem",
                      height: "2.5rem",
                      border: "2px solid black",
                      borderRadius: "0.4rem",
                    }}
                    type="datetime-local"
                    name="time_out"
                    value={formData.time_out}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div>
                  <label
                    style={{
                      fontWeight: "bold",
                      marginRight: "0.5rem",
                      fontSize: "1rem",
                    }}
                  >
                    Ph No.{" "}
                  </label>
                  <input
                    style={{
                      marginLeft: "2rem",
                      width: "17rem",
                      height: "2.5rem",
                      border: "2px solid black",
                      borderRadius: "0.4rem",
                    }}
                    placeholder="Phone No."
                    type="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div>
                  <div style={{ marginLeft: "2rem", marginTop: "0.5rem" }}>
                    <button
                      type="submit"
                      className="submit-button"
                      disabled={loading}
                    >
                      {loading ? "Loading..." : "Register"}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
      <Footer />
    </>
  );
};

export default Signup;
