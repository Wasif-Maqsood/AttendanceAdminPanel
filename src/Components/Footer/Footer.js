import { FaFacebook, FaHome, FaLinkedin, FaMailBulk, FaPhone, FaTwitter } from "react-icons/fa";
import "./FooterStyles.css";

import React from "react"; 

const Footer = () => {
  return (
    <>
    <div className="footer">
      <div className="footer-container">
        <div className="left" >
          <div className="location " >
            <FaHome size={20} style={{color:"white", marginLeft:"2rem"}} />
              <div>
                <p>48-A Main Gulberg, Lahore.</p>
                {/* <p>Pakistan.</p> */}
              </div>
          </div>
          <div className="phone">
            <h4> <FaPhone size={20} style={{color:"white", marginLeft:"2rem", marginRight:"2rem" }} />
            +92 301 4522212</h4>
          </div>
          <div className="email">
            <h4> <FaMailBulk size={20} style={{color:"white", marginLeft:"2rem", marginRight:"2rem", marginTop:"0.5rem"}} />
            wisecollege78@gmail.com</h4>
          </div>
        </div>
        <div className="right" > 
          <h4>About</h4>
          <p>Our Mission:
To Prepare our Youth for Self Earning through Education & Skills Training with Ethics</p>
          <div className="social" >
            <FaFacebook size={20} style={{color:"white", marginLeft:"2rem"}} />
            <FaTwitter size={20} style={{color:"white", marginLeft:"2rem"}} />
            <FaLinkedin size={20} style={{color:"white", marginLeft:"2rem"}} />
          </div>
        </div>
      

      </div>
    </div>
    </>
  )
  
};

export default Footer;
