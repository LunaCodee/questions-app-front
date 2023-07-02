import React, { useState } from "react";
import styles from "./styles.module.css";
import axios from "axios";
import { useRouter } from "next/router";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";

const LoginPage = () => {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleLogin = async () => {
    try {
      const response = await axios.post("http://localhost:8081/login", {
        email: email,
        password: password,
      });

      console.log("response", response);
      handleSuccessfulLogin(response.data.jwt, response.data.userId);
    } catch (err) {
      console.log("err", err);
      setErrorMessage("Bad email or password");
      setTimeout(() => {
        setErrorMessage("");
      }, 2000);
    }
  };

  const handleSuccessfulLogin = (jwt, userId) => {
    localStorage.setItem("jwt", jwt);
    localStorage.setItem("userId", userId);
    router.push("/");
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (email && password) {
      handleLogin();
    } else {
      setErrorMessage("* Please fill in all the fields");
      setTimeout(() => {
        setErrorMessage("");
      }, 2000);
    }
  };

  return (
    <>
      <Navbar />
      <div className={styles.container}>
        <div className={styles.form}>
          <h2>Please login:</h2>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
          <button onClick={handleSubmit}>Login</button>
          {errorMessage && (
            <p className={styles.errorMessage}>{errorMessage}</p>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default LoginPage;