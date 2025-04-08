import React, { useEffect, useState } from "react";
import axios from "axios";
import "./SurveyCreatorManageQuestions.css";

const SurveyCreatorManageQuestions = ({ surveyId }) => {
  const [questions, setQuestions] = useState([]);
  const [newQuestion, setNewQuestion] = useState({
    question_text: "",
    question_type: "Short Text",
    is_required: false,
    image: null,
  });

  useEffect(() => {
    fetchQuestions();
  }, []);

  const fetchQuestions = async () => {
    try {
      const res = await axios.get(`/questions/survey/${surveyId}`);
      setQuestions(res.data.data);
    } catch (err) {
      console.error("Error fetching questions:", err);
    }
  };

  const handleAddQuestion = async () => {
    try {
      const formData = new FormData();
      formData.append("survey_id", surveyId);
      formData.append("question_text", newQuestion.question_text);
      formData.append("question_type", newQuestion.question_type);
      formData.append("is_required", newQuestion.is_required);
      if (newQuestion.image) {
        formData.append("image", newQuestion.image);
      }

      const res = await axios.post("/questions/add", formData);
      setQuestions([...questions, res.data.data]);
      setNewQuestion({ question_text: "", question_type: "Short Text", is_required: false, image: null });
    } catch (err) {
      console.error("Error adding question:", err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/questions/${id}`);
      setQuestions(questions.filter((q) => q._id !== id));
    } catch (err) {
      console.error("Error deleting question:", err);
    }
  };

  return (
    <div className="scmq-container">
      <h2>Manage Survey Questions</h2>

      <div className="scmq-new-question">
        <input
          type="text"
          placeholder="Enter question"
          value={newQuestion.question_text}
          onChange={(e) => setNewQuestion({ ...newQuestion, question_text: e.target.value })}
        />
        <select
          value={newQuestion.question_type}
          onChange={(e) => setNewQuestion({ ...newQuestion, question_type: e.target.value })}
        >
          <option>Multiple Choice</option>
          <option>Short Text</option>
          <option>Long Text</option>
          <option>Rating Scale</option>
          <option>Dropdown</option>
        </select>
        <label>
          <input
            type="checkbox"
            checked={newQuestion.is_required}
            onChange={(e) => setNewQuestion({ ...newQuestion, is_required: e.target.checked })}
          />
          Required
        </label>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setNewQuestion({ ...newQuestion, image: e.target.files[0] })}
        />
        <button onClick={handleAddQuestion}>Add Question</button>
      </div>

      <ul className="scmq-question-list">
        {questions.map((q) => (
          <li key={q._id}>
            <strong>{q.question_text}</strong> ({q.question_type}) {q.is_required ? "⭐" : ""}
            {q.questionimageURL && <img src={q.questionimageURL} alt="q-img" className="scmq-image" />}
            <button onClick={() => handleDelete(q._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SurveyCreatorManageQuestions;
