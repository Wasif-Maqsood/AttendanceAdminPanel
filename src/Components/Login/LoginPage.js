import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Style.css";

const App = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const storedEmail = localStorage.getItem("rememberedEmail");
    const storedRememberMe = localStorage.getItem("rememberMe");
    if (storedRememberMe === "true" && storedEmail) {
      setEmail(storedEmail);
      setRememberMe(true);
    }
  }, []);

  const showToast = (message, type = "default") => {
    toast[type](message, {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
  };

  const handleLogin = async () => {
    if (!email || !password) {
      showToast("Please enter email & password!", "warn");
      return;
    }

    setIsLoading(true);

    const credentials = {
      email,
      password,
    };

    try {
      const response = await fetch(
        "http://39.61.51.195:8003/api/v1/accounts/login/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(credentials),
        }
      );

      if (response.ok) {
        showToast("Login Successful!", "success");
        if (rememberMe) {
          localStorage.setItem("rememberedEmail", email);
          localStorage.setItem("rememberMe", true);
        } else {
          localStorage.removeItem("rememberedEmail");
          localStorage.removeItem("rememberMe");
        }
        navigate("/home");
      } else {
        showToast("Email and Password do not match. Please try again.", "warn");
      }
    } catch (error) {
      console.error("Login error:", error);
      alert("An error occurred during login. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="background">
        {[...Array(20)].map((_, index) => (
          <span key={index}></span>
        ))}
      </div>
      <div>
        <div style={{ marginTop: "1.5rem" }} className="box-form">
          <div className="left">
            <div className="overlay">
              <h1 className="login-heading">Wise Institute</h1>
              <p>
                Wise Institute envisions itself as a beacon of student-centered
                learning, empowering individuals with the technical skills and
                knowledge they need to thrive in their chosen fields. We are
                dedicated to fostering a supportive and enriching environment
                where students are not just taught, but guided and mentored
                towards achieving their academic and professional goals. We
                believe in the transformative power of education and its ability
                to unlock a future filled with opportunity and success for our
                students.
              </p>
            </div>
          </div>

          <div className="right">
            <h5>Login</h5>
            <div className="inputs">
              <input
                type="text"
                placeholder="User name"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <br />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <br />

            <br />

            <br />
            <button onClick={handleLogin} disabled={isLoading}>
              {isLoading ? <div className="loader"></div> : "Login"}
            </button>
            <div className="remember-me--forget-password">
              <label>
                <input
                  className="checkbox"
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                />
              </label>
              <p className="forgot">Forgot Password?</p>
            </div>
            {/* <div>
              <p>
                Don't have an account? <a href="#">Create Your Account</a> it
                takes less than a minute
              </p>
            </div> */}
          </div>
        </div>
        <ToastContainer />
      </div>
    </>
  );
};

export default App;
