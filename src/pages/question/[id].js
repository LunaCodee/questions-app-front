import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import styles from "./styles.module.css";
import { useRouter } from "next/router";
import thumbUpImage from '../../assets/thumb-up.png';
import thumbDownImage from '../../assets/thumb-down.png';

const QuestionPage = () => {
  const router = useRouter();
  const { id } = router.query; 
  const [question, setQuestion] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [newAnswer, setNewAnswer] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchQuestionAndAnswers = async () => {
      try {
        const token = localStorage.getItem("jwt");

        const response = await axios.get(`http://localhost:8081/question/${id}`, 
        { headers: { authorization: token } 
      });
        setQuestion(response.data.question);

        const answerResponse = await axios.get(`http://localhost:8081/question/${id}/answers`, 
        { headers: { authorization: token } 
      });
        setAnswers(answerResponse.data.response);
      } catch (error) {
        console.log("Error fetching question and answers:", error);
      }
    };

    if (id) {
      fetchQuestionAndAnswers();
    }
  }, [id]);

  const handleNewAnswerChange = (event) => {
    setNewAnswer(event.target.value);
  };

  const handleNewAnswerSubmit = async (event) => {
    event.preventDefault();

    if (newAnswer.trim() === '') {
      setError('* There is no answer text in the field');
      setTimeout(() => {
        setError('');
      }, 1000); 
      return;
    }

    try {
      const token = localStorage.getItem("jwt");

      await axios.post(`http://localhost:8081/question/${id}/answers`, 
      { answer_text: newAnswer }, 
      { headers: { authorization: token }
     });
      setNewAnswer('');
      setError('');

      const updatedAnswersResponse = await axios.get(`http://localhost:8081/question/${id}/answers`, 
      { headers: { authorization: token } 
    });
      setAnswers(updatedAnswersResponse.data.response);
    } catch (error) {
      console.log('Error posting answer:', error);
    }
  };

  const handleLike = async (answerId) => {
    try {
      const token = localStorage.getItem("jwt");

      await axios.post(`http://localhost:8081/answer/${answerId}/like`, {}, 
      { headers: { authorization: token } 
    });

      const updatedAnswersResponse = await axios.get(`http://localhost:8081/question/${id}/answers`, 
      { headers: { authorization: token } 
    });
      setAnswers(updatedAnswersResponse.data.response);
    } catch (error) {
      console.log('Error liking answer:', error);
    }
  };

  const handleDislike = async (answerId) => {
    try {
      const token = localStorage.getItem("jwt");

      await axios.post(`http://localhost:8081/answer/${answerId}/dislike`, {}, 
      { headers: { authorization: token } 
    });

      const updatedAnswersResponse = await axios.get(`http://localhost:8081/question/${id}/answers`, 
      { headers: { authorization: token } 
    });
      setAnswers(updatedAnswersResponse.data.response);
    } catch (error) {
      console.log('Error disliking answer:', error);
    }
  };

  const handleDelete = async (answerId) => {
    try {
      const token = localStorage.getItem("jwt");

      await axios.delete(`http://localhost:8081/answer/${answerId}`, 
      { headers: { authorization: token } 
    });

      const updatedAnswersResponse = await axios.get(`http://localhost:8081/question/${id}/answers`, 
      { headers: { authorization: token } 
    });
      setAnswers(updatedAnswersResponse.data.response);
    } catch (error) {
      console.log('Error deleting answer:', error);
    }
  };

  return (
    <>
      <Navbar />
      <div className={styles.container}>
        <h1 className={styles.questionText}>{question?.question_text}</h1>
        <ul className={styles.answerList}>
          {answers.map((answer) => (
            <li key={answer._id} className={styles.answerItem}>
              <button onClick={() => handleDelete(answer._id)} className={styles.deleteButton}>
                X
              </button>
              <div className={styles.answerText}>{answer.answer_text}</div>
              <div className={styles.voteContainer}>
                <div className={styles.voteSection}>
                  <button onClick={() => handleLike(answer._id)} className={styles.voteButton}>
                    <img src={thumbUpImage.src} alt="Thumb Up" className={styles.thumbIcon} />
                  </button>
                  <div className={styles.voteScore}>{answer.vote_score}</div>
                  <button onClick={() => handleDislike(answer._id)} className={styles.voteButton}>
                    <img src={thumbDownImage.src} alt="Thumb Down" className={styles.thumbIcon} />
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
        <form className={styles.form} onSubmit={handleNewAnswerSubmit}>
          <textarea
            value={newAnswer}
            onChange={handleNewAnswerChange}
            placeholder="Your answer..."
            className={styles.newAnswerInput}
          />
          {error && <p className={styles.errorText}>{error}</p>}
          <button type="submit" className={styles.submitButton}>
            Answer
          </button>
        </form>
      </div>
      <Footer />
    </>
  );
};


export default QuestionPage;
