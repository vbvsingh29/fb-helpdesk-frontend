import React, { useEffect, useState } from "react";
import FacebookLogin from "@greatsumini/react-facebook-login";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";

function Home() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decoded = jwtDecode(token);
      setUser(decoded.user);
    } else {
      navigate("/login", { replace: false });
    }
  }, []);
  const responseFacebook = async (response) => {
    try {
      console.log(response, "respomnse");
      // Send the Facebook response to your backend API for handling
      const res = await fetch(
        "http://localhost:5000/api/auth/facebook/callback",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ accessToken: response.accessToken }),
        }
      );
      console.log(response,"FB");
      if (res.ok) {
        const userData = await res.json();
        setUser(userData);
      } else {
        console.error("Facebook login failed");
      }
    } catch (error) {
      console.error("Facebook login error:", error);
    }
  };

  return (
    <div className="home">
      <div className="sidebar">
        <h3>User Details</h3>
        {user && (
          <div>
            <img
              src={require("../images/female.png")}
              alt="Profile"
              className="profile-image"
            />
            <p>
              <strong>Name:</strong> {user.name}
            </p>
            <p>
              <strong>Email:</strong> {user.email}
            </p>
          </div>
        )}
      </div>
      <div className="main-content">
        <h1>Welcome to Your Profile</h1>
        <p>
          This is a dummy project made for learning purposes. It demonstrates
          the integration of Facebook APIs.
        </p>
        <FacebookLogin
          appId="365433089674225"
          autoLoad={false}
          fields="name,email,picture"
          version="3.1"
          callback={responseFacebook}
        />
      </div>
    </div>
  );
}

export default Home;
