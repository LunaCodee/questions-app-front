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
//   const [filteredQuestions, setFilteredQuestions] = useState([]);
//   const [filter, setFilter] = useState("all");

//   useEffect(() => {
//     const fetchQuestions = async () => {
//       try {
//         const response = await axios.get("http://localhost:8081/questions");
//         const questionArray = response.data.questions;
//         setQuestions(questionArray);
//         setFilteredQuestions(questionArray);
//       } catch (error) {
//         console.log("Error fetching questions:", error);
//       }
//     };

//     fetchQuestions();
//   }, []);

//   const filterQuestions = (filterType) => {
//     let filteredQuestions = [];
//     if (filterType === "answered") {
//       filteredQuestions = questions.filter(
//         (question) => question.answers_ids && question.answers_ids.length > 0
//       );
//     } else if (filterType === "unanswered") {
//       filteredQuestions = questions.filter(
//         (question) => !question.answers_ids || question.answers_ids.length === 0
//       );
//     } else {
//       filteredQuestions = questions;
//     }
//     setFilter(filterType);
//     setFilteredQuestions(filteredQuestions);
//   };

//   const handleQuestionDelete = async (questionId) => {
//     try {
//       await axios.delete(`http://localhost:8081/question/${questionId}`);
//       const updatedQuestions = questions.filter(
//         (question) => question._id !== questionId
//       );
//       setQuestions(updatedQuestions);
//       setFilteredQuestions(updatedQuestions);
//     } catch (error) {
//       console.log("Error deleting question:", error);
//     }
//   };

//   return (
//     <>
//       <Navbar />
//       <div className={styles.container}>
//         <h1>Questions:</h1>
//         <div className={styles.filterButtons}>
//           <button
//             className={filter === "answered" ? styles.active : ""}
//             onClick={() => filterQuestions("answered")}
//           >
//             Answered
//           </button>
//           <button
//             className={filter === "unanswered" ? styles.active : ""}
//             onClick={() => filterQuestions("unanswered")}
//           >
//             Unanswered
//           </button>
//           <button
//             className={filter === "all" ? styles.active : ""}
//             onClick={() => filterQuestions("all")}
//           >
//             All questions
//           </button>
//         </div>
//         <div className={styles.questionList}>
//           {filteredQuestions.length === 0 ? (
//             <p>No questions at this moment</p>
//           ) : (
//             filteredQuestions.map((question) => (
//               <QuestionCard
//                 key={question._id}
//                 id={question._id}
//                 question_text={question.question_text}
//                 answers_ids={question.answers_ids || []}
//                 onDelete={handleQuestionDelete}
//               />
//             ))
//           )}
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
        const token = localStorage.getItem("jwt");
        const response = await axios.get("http://localhost:8081/questions", { headers: { authorization: token } });
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

  const handleQuestionDelete = async (questionId) => {
    try {
      const token = localStorage.getItem("jwt");
      await axios.delete(`http://localhost:8081/question/${questionId}`, { headers: { authorization: token } });
      const updatedQuestions = questions.filter(
        (question) => question._id !== questionId
      );
      setQuestions(updatedQuestions);
      setFilteredQuestions(updatedQuestions);
    } catch (error) {
      console.log("Error deleting question:", error);
    }
  };

  return (
    <>
      <Navbar />
      <div className={styles.container}>
        <h1>Questions:</h1>
        <div className={styles.filterButtons}>
          <button
            className={filter === "answered" ? styles.active : ""}
            onClick={() => filterQuestions("answered")}
          >
            Answered
          </button>
          <button
            className={filter === "unanswered" ? styles.active : ""}
            onClick={() => filterQuestions("unanswered")}
          >
            Unanswered
          </button>
          <button
            className={filter === "all" ? styles.active : ""}
            onClick={() => filterQuestions("all")}
          >
            All questions
          </button>
        </div>
        <div className={styles.questionList}>
          {filteredQuestions.length === 0 ? (
            <p>No questions at this moment</p>
          ) : (
            filteredQuestions.map((question) => (
              <QuestionCard
                key={question._id}
                id={question._id}
                question_text={question.question_text}
                answers_ids={question.answers_ids || []}
                onDelete={handleQuestionDelete}
              />
            ))
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default QuestionsPage;
