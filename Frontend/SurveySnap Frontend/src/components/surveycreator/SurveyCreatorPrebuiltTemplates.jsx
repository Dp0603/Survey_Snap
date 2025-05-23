import React from "react";
import { useNavigate } from "react-router-dom";
import "./SurveyCreatorPrebuiltTemplates.css"; 

const prebuiltTemplates = [
  {
    id: 1,
    title: "Customer Feedback Survey",
    icon: "🛒",
    description: "Collect valuable feedback from customers regarding their experiences with your product or service.",
    questions: [
      {
        type: "text",
        label: "What product or service did you purchase?"
      },
      {
        type: "rating",
        label: "How satisfied are you with our service?",
        description: "Please rate your satisfaction on a scale from 1 (Very Dissatisfied) to 5 (Very Satisfied)."
      },
      {
        type: "text",
        label: "What improvements can we make to enhance your experience?"
      },
      {
        type: "multiple-choice",
        label: "How did you hear about us?",
        options: ["Online", "Friend", "Advertisement", "Social Media", "Other"]
      },
      {
        type: "dropdown",
        label: "Which product did you purchase?",
        options: ["Product A", "Product B", "Product C"]
      },
      {
        type: "rating",
        label: "How would you rate the checkout process?",
        description: "Rate the ease of the checkout process from 1 (Difficult) to 5 (Very Easy)."
      },
      {
        type: "multiple-choice",
        label: "Would you recommend our product/service to others?",
        options: ["Yes", "No", "Maybe"]
      },
      {
        type: "text",
        label: "Any additional comments or suggestions?"
      }
    ]
  },
  {
    id: 2,
    title: "Employee Engagement Survey",
    icon: "💼",
    description: "Evaluate employee satisfaction, motivation, and challenges to improve workplace dynamics.",
    questions: [
      {
        type: "rating",
        label: "How satisfied are you with your current role?",
        description: "Please rate on a scale from 1 (Very Dissatisfied) to 5 (Very Satisfied)."
      },
      {
        type: "text",
        label: "What motivates you to perform at your best?"
      },
      {
        type: "multiple-choice",
        label: "Do you feel valued by your team and management?",
        options: ["Yes", "Somewhat", "No"]
      },
      {
        type: "dropdown",
        label: "Which department do you belong to?",
        options: ["HR", "Engineering", "Marketing", "Sales", "Other"]
      },
      {
        type: "text",
        label: "What changes would improve your work environment?"
      },
      {
        type: "text",
        label: "What challenges do you face in your current role?"
      }
    ]
  },
  {
    id: 3,
    title: "Event Feedback Survey",
    icon: "🎤",
    description: "Gather feedback from event attendees to refine and enhance future events.",
    questions: [
      {
        type: "dropdown",
        label: "Which sessions did you attend?",
        options: ["Session A", "Session B", "Session C", "All of the above"]
      },
      {
        type: "rating",
        label: "How would you rate the overall event experience?",
        description: "Rate the event based on your overall experience from 1 (Poor) to 5 (Excellent)."
      },
      {
        type: "multiple-choice",
        label: "Would you attend another event hosted by us?",
        options: ["Definitely", "Maybe", "No"]
      },
      {
        type: "text",
        label: "What was the highlight of the event for you?"
      },
      {
        type: "text",
        label: "What suggestions do you have for future events?"
      },
      {
        type: "rating",
        label: "How would you rate the event's organization and logistics?",
        description: "Rate the organization of the event from 1 (Poor) to 5 (Excellent)."
      }
    ]
  },
  {
    id: 4,
    title: "Tech Usage Survey",
    icon: "💻",
    description: "Understand how users engage with technology and identify preferences and trends.",
    questions: [
      {
        type: "multiple-choice",
        label: "Which devices do you use regularly?",
        options: ["Laptop", "Tablet", "Smartphone", "Smartwatch", "Other"]
      },
      {
        type: "rating",
        label: "How would you rate your overall tech-savviness?",
        description: "Rate your level of tech-savviness from 1 (Novice) to 5 (Expert)."
      },
      {
        type: "dropdown",
        label: "What operating system do you prefer?",
        options: ["Windows", "macOS", "Linux", "Android", "iOS"]
      },
      {
        type: "text",
        label: "What is your most-used app?"
      },
      {
        type: "text",
        label: "Which tech tool or gadget can you not live without?"
      }
    ]
  },
  {
    id: 5,
    title: "Education Feedback Survey",
    icon: "📚",
    description: "Gather student feedback on their learning experience and educational environment.",
    questions: [
      {
        type: "rating",
        label: "How would you rate the overall quality of teaching?",
        description: "Rate the quality of teaching from 1 (Poor) to 5 (Excellent)."
      },
      {
        type: "multiple-choice",
        label: "What is your preferred mode of learning?",
        options: ["In-person", "Online", "Hybrid"]
      },
      {
        type: "dropdown",
        label: "What is your current grade level?",
        options: ["High School", "Undergraduate", "Postgraduate"]
      },
      {
        type: "text",
        label: "Which subject do you find most interesting?"
      },
      {
        type: "text",
        label: "Do you have any suggestions to improve the curriculum?"
      }
    ]
  },
  {
    id: 6,
    title: "Sports Preferences Survey",
    icon: "⚽",
    description: "Understand your sports habits, favorite sports, and fandom interests.",
    questions: [
      {
        type: "multiple-choice",
        label: "Which sports do you participate in regularly?",
        options: ["Football", "Basketball", "Tennis", "Cricket", "Others"]
      },
      {
        type: "rating",
        label: "How often do you play sports each week?",
        description: "Rate your frequency from 1 (Rarely) to 5 (Everyday)."
      },
      {
        type: "text",
        label: "Who is your all-time favorite athlete?"
      },
      {
        type: "dropdown",
        label: "What is your favorite sports league?",
        options: ["NBA", "EPL", "La Liga", "IPL"]
      },
      {
        type: "text",
        label: "Why do you enjoy participating in or watching sports?"
      }
    ]
  },
  {
    id: 7,
    title: "Food Preferences Survey",
    icon: "🍔",
    description: "Explore food preferences, eating habits, and dietary restrictions.",
    questions: [
      {
        type: "multiple-choice",
        label: "What is your favorite cuisine?",
        options: ["Italian", "Indian", "Chinese", "Mexican", "Others"]
      },
      {
        type: "rating",
        label: "How would you rate your cooking skills?",
        description: "Rate your cooking skills from 1 (Beginner) to 5 (Expert)."
      },
      {
        type: "dropdown",
        label: "How often do you eat out?",
        options: ["Daily", "2-3 times per week", "Occasionally", "Never"]
      },
      {
        type: "text",
        label: "What is your favorite dish?"
      },
      {
        type: "text",
        label: "Do you have any dietary restrictions?"
      }
    ]
  },
  {
    id: 8,
    title: "Fashion Preferences Survey",
    icon: "👗",
    description: "Analyze fashion preferences, style trends, and shopping habits.",
    questions: [
      {
        type: "multiple-choice",
        label: "How would you describe your fashion style?",
        options: ["Casual", "Formal", "Streetwear", "Athleisure", "Other"]
      },
      {
        type: "dropdown",
        label: "Which fashion brand do you prefer?",
        options: ["Zara", "H&M", "Nike", "Gucci", "Other"]
      },
      {
        type: "rating",
        label: "How stylish do you consider yourself?",
        description: "Rate your style from 1 (Not stylish) to 5 (Very stylish)."
      },
      {
        type: "text",
        label: "Who is your fashion icon?"
      },
      {
        type: "text",
        label: "How often do you go shopping?"
      }
    ]
  },
  {
    id: 9,
    title: "Customer Satisfaction Survey",
    icon: "😊",
    description: "Gauge customer satisfaction with your products or services to drive improvements.",
    questions: [
      {
        type: "rating",
        label: "How satisfied are you with our product?"
      },
      {
        type: "multiple-choice",
        label: "How likely are you to recommend our product to others?",
        options: ["Very likely", "Somewhat likely", "Not likely"]
      },
      {
        type: "text",
        label: "What can we improve on?"
      },
      {
        type: "multiple-choice",
        label: "Which feature of our product do you like the most?",
        options: ["Design", "Price", "Functionality", "Other"]
      },
      {
        type: "rating",
        label: "How would you rate the customer service?",
        description: "Rate the customer service from 1 (Poor) to 5 (Excellent)."
      }
    ]
  },
  {
    id: 10,
    title: "Market Research Survey",
    icon: "📊",
    description: "Gather insights into market trends, competitors, and consumer behavior.",
    questions: [
      {
        type: "multiple-choice",
        label: "Which of the following brands do you consider as competitors?",
        options: ["Brand A", "Brand B", "Brand C", "Others"]
      },
      {
        type: "rating",
        label: "How well do you think we compare to our competitors?"
      },
      {
        type: "text",
        label: "What do you think is the next big trend in the industry?"
      },
      {
        type: "dropdown",
        label: "Which social media platform do you follow for industry updates?",
        options: ["Facebook", "Instagram", "Twitter", "LinkedIn"]
      },
      {
        type: "text",
        label: "What factors influence your purchase decisions?"
      }
    ]
  },
  {
    id: 11,
    title: "Health & Wellness Survey",
    icon: "💪",
    description: "Collect information on health habits, fitness goals, and wellness practices.",
    questions: [
      {
        type: "multiple-choice",
        label: "How often do you exercise?",
        options: ["Every day", "3-4 times a week", "Once a week", "Rarely"]
      },
      {
        type: "text",
        label: "What is your primary fitness goal?"
      },
      {
        type: "rating",
        label: "How would you rate your overall health?",
        description: "Rate your health from 1 (Poor) to 5 (Excellent)."
      },
      {
        type: "multiple-choice",
        label: "What kind of exercise do you prefer?",
        options: ["Running", "Yoga", "Strength Training", "Cycling", "Other"]
      },
      {
        type: "text",
        label: "Do you follow any specific diet plan?"
      }
    ]
  },
  {
    id: 12,
    title: "Travel Preferences Survey",
    icon: "✈️",
    description: "Understand traveler preferences, destinations, and travel habits.",
    questions: [
      {
        type: "multiple-choice",
        label: "What type of vacation do you prefer?",
        options: ["Beach", "Adventure", "Cultural", "Relaxing"]
      },
      {
        type: "dropdown",
        label: "Which country would you like to visit next?",
        options: ["Italy", "Japan", "USA", "Australia", "Other"]
      },
      {
        type: "rating",
        label: "How would you rate your recent travel experience?",
        description: "Rate your recent trip from 1 (Poor) to 5 (Excellent)."
      },
      {
        type: "text",
        label: "What is your favorite travel destination?"
      },
      {
        type: "multiple-choice",
        label: "Do you prefer solo or group travel?",
        options: ["Solo", "Group", "Both"]
      }
    ]
  },
  {
    id: 13,
    title: "Music Preferences Survey",
    icon: "🎶",
    description: "Explore music tastes, genres, and listening habits.",
    questions: [
      {
        type: "multiple-choice",
        label: "What genres of music do you listen to?",
        options: ["Rock", "Pop", "Hip Hop", "Classical", "Jazz", "Other"]
      },
      {
        type: "rating",
        label: "How often do you listen to music?",
        description: "Rate your listening frequency from 1 (Rarely) to 5 (Daily)."
      },
      {
        type: "text",
        label: "Who is your favorite artist or band?"
      },
      {
        type: "multiple-choice",
        label: "What is your preferred music platform?",
        options: ["Spotify", "Apple Music", "YouTube", "Other"]
      },
      {
        type: "text",
        label: "Do you play any musical instruments?"
      }
    ]
  },
  {
    id: 14,
    title: "Pet Ownership Survey",
    icon: "🐶",
    description: "Learn about pet ownership, habits, and preferences.",
    questions: [
      {
        type: "multiple-choice",
        label: "What type of pet do you own?",
        options: ["Dog", "Cat", "Bird", "Other"]
      },
      {
        type: "rating",
        label: "How satisfied are you with your pet's behavior?",
        description: "Rate your satisfaction from 1 (Not satisfied) to 5 (Very satisfied)."
      },
      {
        type: "text",
        label: "What is your pet's name?"
      },
      {
        type: "dropdown",
        label: "How often do you take your pet to the vet?",
        options: ["Every 6 months", "Once a year", "As needed"]
      },
      {
        type: "text",
        label: "Do you have any advice for new pet owners?"
      }
    ]
  },
  {
    id: 15,
    title: "Technology Adoption Survey",
    icon: "📱",
    description: "Understand how people adopt new technology and their attitudes toward innovation.",
    questions: [
      {
        type: "multiple-choice",
        label: "What type of technology do you use most frequently?",
        options: ["Smartphones", "Wearables", "Smart Home Devices", "Other"]
      },
      {
        type: "rating",
        label: "How likely are you to try new technology?",
        description: "Rate your willingness to try new tech from 1 (Not likely) to 5 (Very likely)."
      },
      {
        type: "text",
        label: "What recent technological innovation excites you the most?"
      },
      {
        type: "dropdown",
        label: "What factors influence your decision to adopt new technology?",
        options: ["Price", "Brand reputation", "Features", "Ease of use"]
      },
      {
        type: "text",
        label: "What is your biggest concern regarding new technology?"
      }
    ]
  }
];


const SurveyCreatorPrebuiltTemplates = () => {
  const navigate = useNavigate();

  const handleSelectTemplate = (template) => {
    navigate(
      "/survey-creator-dashboard/my-surveys/create-new-survey/prebuilt-templates/create",
      {
        state: { template },
      }
    );
  };

  return (
    <div className="prebuilt-templates-container">
      <h2>🧰 Choose a Prebuilt Template</h2>
      <p>Select a category to kickstart your survey in seconds.</p>

      <div className="template-cards">
        {prebuiltTemplates.map((template) => (
          <div
            key={template.id}
            className="template-card"
            onClick={() => handleSelectTemplate(template)}
          >
            <div className="template-icon">{template.icon}</div>
            <h3>{template.title}</h3>
            <p>{template.description}</p>
            <button className="use-template-btn">Use Template</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SurveyCreatorPrebuiltTemplates;
