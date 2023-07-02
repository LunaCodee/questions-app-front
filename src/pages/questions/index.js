// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import QuestionCard from "../../components/questionCard/questionCard";
// import Navbar from "../../components/Navbar/Navbar";
// import Footer from "../../components/Footer/Footer";
// import styles from "./styles.module.css";
// import { useRouter } from "next/router";

// const QuestionsPage = () => {
//   const router = useRouter();
//   const [questions, setQuestions] = useState([]);

//   useEffect(() => {
//     const fetchQuestions = async () => {
//       try {
//         const response = await axios.get("http://localhost:8081/questions");
//         const questionArray = response.data.questions;
//         console.log(response.data.questions)
//         setQuestions(questionArray);
//       } catch (error) {
//         console.log("Error fetching questions:", error);
//       }
//     };

//     fetchQuestions();
//   }, []);

//   return (
//     <>
//       <Navbar />
//       <div className={styles.container}>
//         <div className={styles.questionList}>
//           {questions.map((question) => (
//             <QuestionCard
//               key={question._id}
//               id={question._id}
//               question_text={question.question_text}
//               answers_ids={question.answers_ids || []}
//             />
//           ))}
//         </div>
//       </div>
//       <Footer />
//     </>
//   );
// };

// export default QuestionsPage;


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
  const [filteredQuestions, setFilteredQuestions] = useState([]);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await axios.get("http://localhost:8081/questions");
        const questionArray = response.data.questions;
        setQuestions(questionArray);
        setFilteredQuestions(questionArray);
      } catch (error) {
        console.log("Error fetching questions:", error);
      }
    };

    fetchQuestions();
  }, []);

  const filterQuestions = (filterType) => {
    let filteredQuestions = [];
    if (filterType === "answered") {
      filteredQuestions = questions.filter(
        (question) => question.answers_ids && question.answers_ids.length > 0
      );
    } else if (filterType === "unanswered") {
      filteredQuestions = questions.filter(
        (question) => !question.answers_ids || question.answers_ids.length === 0
      );
    } else {
      filteredQuestions = questions;
    }
    setFilter(filterType);
    setFilteredQuestions(filteredQuestions);
  };

  return (
    <>
      <Navbar />
      <div className={styles.container}>
        <div className={styles.filterButtons}>
          <button
            className={filter === "answered" ? styles.active : ""}
            onClick={() => filterQuestions("answered")}
          >
            Answered questions
          </button>
          <button
            className={filter === "unanswered" ? styles.active : ""}
            onClick={() => filterQuestions("unanswered")}
          >
            Unanswered questions
          </button>
          <button
            className={filter === "all" ? styles.active : ""}
            onClick={() => filterQuestions("all")}
          >
            All questions
          </button>
        </div>
        <div className={styles.questionList}>
          {filteredQuestions.map((question) => (
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

