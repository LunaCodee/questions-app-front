import React, { useState } from 'react';
import Link from 'next/link';
import axios from 'axios';
import styles from './styles.module.css';
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";

const HomePage = () => {

  return (
    <>
    <Navbar />
    <div className={styles.container}>
      <div className={styles.content}>
        <h1 className={styles.title}>Welcome to Let's Talk</h1>
        <p className={styles.description}>Join the conversation and connect with others.</p>
      </div>
      <div className={styles.buttons}>
        <Link href="/register">
          <span className={`${styles.button} ${styles.register}`}>Register</span>
        </Link>
        <Link href="/login">
          <span className={`${styles.button} ${styles.login}`}>Login</span>
        </Link>
      </div>
    </div>
    <Footer />
    </>
  );
};

export default HomePage;