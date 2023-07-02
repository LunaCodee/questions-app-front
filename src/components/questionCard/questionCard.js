import React from "react";
import styles from "./styles.module.css";
import Link from "next/link";

const QuestionCard = ({ id, question_text, answers_ids }) => {
  return (
    <div className={styles.card}>
      <Link className={styles.link} href={`/question/${id}`}>

          <h1 className={styles.questionText}>{question_text}</h1>

      </Link>
      <div className={styles.answersCount}>
        Answers: {answers_ids.length}
      </div>
    </div>
  );
};

export default QuestionCard;