import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import "./SurveyCreationPage.css";

const SurveyCreationPage = () => {
    const location = useLocation();
    const selectedTemplate = location.state?.template || null;

    const [surveyData, setSurveyData] = useState({
        title: "",
        description: "",
        questions: [],
    });

    const [responses, setResponses] = useState({});

    useEffect(() => {
        if (selectedTemplate) {
            setSurveyData({
                title: selectedTemplate.title,
                description: selectedTemplate.description,
                questions: selectedTemplate.questions,
            });
        }
    }, [selectedTemplate]);

    const handleResponseChange = (questionIndex, value) => {
        setResponses((prev) => ({
            ...prev,
            [questionIndex]: value,
        }));
    };

    return (
        <div className="survey-creation-container">
            <div className="survey-header">
                <h2 className="survey-title">{surveyData.title || "Create Survey"}</h2>
                <p className="survey-description">{surveyData.description}</p>
            </div>

            <div className="survey-body">
                {surveyData.questions.length > 0 ? (
                    surveyData.questions.map((question, index) => (
                        <div key={index} className="question-container">
                            <label className="question-label">{question.label}</label>
                            
                            {question.type === "text" && (
                                <input
                                    type="text"
                                    className="text-input"
                                    value={responses[index] || ""}
                                    onChange={(e) => handleResponseChange(index, e.target.value)}
                                />
                            )}

                            {question.type === "rating" && (
                                <div className="rating-group">
                                    {[1, 2, 3, 4, 5].map((num) => (
                                        <button
                                            key={num}
                                            className={`rating-btn ${responses[index] === num ? "selected" : ""}`}
                                            onClick={() => handleResponseChange(index, num)}
                                        >
                                            {num} ⭐
                                        </button>
                                    ))}
                                </div>
                            )}

                            {question.type === "multiple-choice" && (
                                <div className="options-group">
                                    {question.options.map((option, idx) => (
                                        <label key={idx} className="option-label">
                                            <input
                                                type="radio"
                                                name={`q${index}`}
                                                value={option}
                                                checked={responses[index] === option}
                                                onChange={() => handleResponseChange(index, option)}
                                            />
                                            {option}
                                        </label>
                                    ))}
                                </div>
                            )}

                            {question.type === "dropdown" && (
                                <select
                                    className="dropdown-select"
                                    onChange={(e) => handleResponseChange(index, e.target.value)}
                                    value={responses[index] || ""}
                                >
                                    <option value="">Select an option</option>
                                    {question.options.map((option, idx) => (
                                        <option key={idx} value={option}>
                                            {option}
                                        </option>
                                    ))}
                                </select>
                            )}
                        </div>
                    ))
                ) : (
                    <p className="no-questions">No questions found in this template.</p>
                )}
            </div>

            <button className="save-survey-btn">Save Survey</button>
        </div>
    );
};

export default SurveyCreationPage;
