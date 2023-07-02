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

  const handleSubmit = async (event) => {
    event.preventDefault();
    
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
                  {successMessage && <div className={styles.success_message}>{successMessage}</div>}
          <div className={styles.button_wrapper}>
            <button type="submit" className={styles.button}>
              Submit
            </button>
          </div>
        </form>
      </div>
      <Footer />
    </>
  );
};

export default QuestionForm;
