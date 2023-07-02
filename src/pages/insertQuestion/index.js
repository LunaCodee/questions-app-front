import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import styles from "./styles.module.css";

const QuestionForm = () => {
  const router = useRouter();
  const [questionText, setQuestionText] = useState("");
  const [successMessage, setSuccessMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    if (!questionText.trim()) {
      setErrorMessage('* There is no answer text in the field');
      setTimeout(() => {
        setErrorMessage(null);
      }, 1000);
      return;
    }
    try {
      const token = localStorage.getItem("jwt");

      const response = await axios.post(
        "http://localhost:8081/question",
        {
          question_text: questionText,
        },
        {
          headers: {
            authorization: token, 
          },
        }
      );

      console.log("Question was posted successfully!", response);
      
      setSuccessMessage("* Question was posted successfully!");
      setTimeout(() => {
        setSuccessMessage(null);
        router.push("/questions");
      }, 1000);
    } catch (err) {
      console.log("Error posting question:", err);
    }
  };

  return (
    <>
      <Navbar />
      <div className={styles.container}>
        <h1 className={styles.title}>Ask Your Question:</h1>

        <form className={styles.form} onSubmit={handleSubmit}>
          <textarea
            value={questionText}
            onChange={(event) => setQuestionText(event.target.value)}
            placeholder="Type your question here"
            className={styles.textarea}
          ></textarea>
           {errorMessage && <div className={styles.error_message}>{errorMessage}</div>}
            {successMessage && <div className={styles.success_message}>{successMessage}</div>}
            <button type="submit" className={styles.button}>
              Ask
            </button>
        </form>
      </div>
      <Footer />
    </>
  );
};

export default QuestionForm;
