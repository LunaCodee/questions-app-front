import React, { useEffect, useState } from "react";
import axios from "axios";
import QuestionCard from "../../components/questionCard/questionCard";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import styles from "./styles.module.css";
import { useRouter } from "next/router";

const QuestionsPage = () => {
  const router = useRouter();
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await axios.get("http://localhost:8081/questions");
        const questionArray = response.data.questions;
        console.log(response.data.questions)
        setQuestions(questionArray);
      } catch (error) {
        console.log("Error fetching questions:", error);
      }
    };

    fetchQuestions();
  }, []);

  return (
    <>
      <Navbar />
      <div className={styles.container}>
        <div className={styles.questionList}>
          {questions.map((question) => (
            <QuestionCard
              key={question._id}
              id={question._id}
              question_text={question.question_text}
              answers_ids={question.answers_ids || []}
            />
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default QuestionsPage;