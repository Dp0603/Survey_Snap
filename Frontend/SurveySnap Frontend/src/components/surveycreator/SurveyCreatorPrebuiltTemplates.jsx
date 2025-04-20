import React from "react";
import { useNavigate } from "react-router-dom";
import "./SurveyCreatorPrebuiltTemplates.css"; // Enhanced CSS version

const prebuiltTemplates = [
  {
    id: 1,
    title: "Customer Feedback",
    icon: "🛒",
    description: "Gather feedback after a service or purchase.",
    questions: [
      { type: "rating", label: "How satisfied are you with our service?" },
      { type: "text", label: "What can we improve?" },
      {
        type: "multiple-choice",
        label: "How did you hear about us?",
        options: ["Online", "Friend", "Advertisement", "Other"],
      },
      {
        type: "dropdown",
        label: "Which product did you purchase?",
        options: ["Product A", "Product B", "Product C"],
      },
      { type: "text", label: "Any additional comments?" },
      { type: "rating", label: "Rate the checkout experience." },
      {
        type: "multiple-choice",
        label: "Would you recommend us?",
        options: ["Yes", "No", "Maybe"],
      },
    ],
  },
  {
    id: 2,
    title: "Employee Engagement",
    icon: "💼",
    description: "Gauge employee satisfaction and motivation.",
    questions: [
      { type: "rating", label: "How satisfied are you at work?" },
      { type: "text", label: "What motivates you daily?" },
      {
        type: "multiple-choice",
        label: "Do you feel valued?",
        options: ["Yes", "Somewhat", "No"],
      },
      {
        type: "dropdown",
        label: "Select your department",
        options: ["HR", "Engineering", "Marketing", "Sales"],
      },
      { type: "text", label: "Suggestions for improvement?" },
      { type: "text", label: "Biggest challenge in your role?" },
    ],
  },
  {
    id: 3,
    title: "Event Feedback",
    icon: "🎤",
    description: "Collect insights post-event from attendees.",
    questions: [
      {
        type: "dropdown",
        label: "Which sessions did you attend?",
        options: ["Session A", "Session B", "Session C"],
      },
      { type: "rating", label: "Rate the overall event experience." },
      {
        type: "multiple-choice",
        label: "Would you attend again?",
        options: ["Definitely", "Maybe", "No"],
      },
      { type: "text", label: "What was the highlight?" },
      { type: "text", label: "Suggestions for future events?" },
    ],
  },
  // {
  //   id: 4,
  //   title: "Sexual Experience Survey",
  //   icon: "🔥",
  //   description: "Explore adult preferences. Private & bold.",
  //   questions: [
  //     {
  //       type: "rating",
  //       label: "How would you rate your last sexual experience?",
  //     },
  //     {
  //       type: "multiple-choice",
  //       label: "Preferred positions?",
  //       options: ["Missionary", "Doggy", "Cowgirl", "69", "Others"],
  //     },
  //     {
  //       type: "text",
  //       label: "Average session duration (in minutes)?",
  //     },
  //     {
  //       type: "dropdown",
  //       label: "Size preference?",
  //       options: ['<4"', '4-6"', '6-8"', '>8"'],
  //     },
  //     {
  //       type: "text",
  //       label: "Kinks or fantasies you’d like to share?",
  //     },
  //     {
  //       type: "multiple-choice",
  //       label: "Do you prefer spontaneous or planned intimacy?",
  //       options: ["Spontaneous", "Planned", "Depends"],
  //     },
  //   ],
  // },
  {
    id: 5,
    title: "Tech Usage Survey",
    icon: "💻",
    description: "Understand user interaction with modern tech.",
    questions: [
      {
        type: "multiple-choice",
        label: "Devices used daily?",
        options: ["Laptop", "Tablet", "Phone", "Smartwatch"],
      },
      { type: "rating", label: "How tech-savvy are you?" },
      {
        type: "dropdown",
        label: "Favorite OS?",
        options: ["Windows", "macOS", "Linux", "Android", "iOS"],
      },
      { type: "text", label: "Most-used app?" },
      { type: "text", label: "Tech tool you can't live without?" },
    ],
  },
  {
    id: 6,
    title: "Education Feedback",
    icon: "📚",
    description: "Student survey on learning experience.",
    questions: [
      { type: "rating", label: "Rate the teaching quality." },
      {
        type: "multiple-choice",
        label: "Preferred learning mode?",
        options: ["In-person", "Online", "Hybrid"],
      },
      {
        type: "dropdown",
        label: "Your grade level:",
        options: ["High School", "Undergrad", "Postgrad"],
      },
      { type: "text", label: "Most interesting subject?" },
      { type: "text", label: "Curriculum improvement ideas?" },
    ],
  },
  {
    id: 7,
    title: "Sports Preferences",
    icon: "⚽",
    description: "Explore sports habits and favorites.",
    questions: [
      {
        type: "multiple-choice",
        label: "Favorite sports?",
        options: ["Football", "Basketball", "Tennis", "Cricket", "Others"],
      },
      { type: "rating", label: "How often do you play weekly?" },
      { type: "text", label: "All-time favorite athlete?" },
      {
        type: "dropdown",
        label: "Favorite league?",
        options: ["NBA", "EPL", "La Liga", "IPL"],
      },
      { type: "text", label: "Why do you love sports?" },
    ],
  },
  {
    id: 8,
    title: "Food Preferences",
    icon: "🍔",
    description: "Food taste, habits, and restrictions.",
    questions: [
      {
        type: "multiple-choice",
        label: "Preferred cuisine?",
        options: ["Italian", "Indian", "Chinese", "Mexican"],
      },
      { type: "rating", label: "Rate your cooking skills." },
      {
        type: "dropdown",
        label: "How often do you eat out?",
        options: ["Daily", "2-3x/week", "Occasionally", "Never"],
      },
      { type: "text", label: "Favorite dish ever?" },
      { type: "text", label: "Any dietary restrictions?" },
    ],
  },
  {
    id: 9,
    title: "Fashion Choices",
    icon: "👗",
    description: "Analyze fashion styles and brands.",
    questions: [
      {
        type: "multiple-choice",
        label: "Your fashion style?",
        options: ["Casual", "Formal", "Streetwear", "Athleisure"],
      },
      {
        type: "dropdown",
        label: "Favorite fashion brand?",
        options: ["Zara", "H&M", "Nike", "Gucci", "Others"],
      },
      { type: "rating", label: "How stylish are you?" },
      { type: "text", label: "Your fashion icon?" },
      { type: "text", label: "Shopping frequency?" },
    ],
  },
  {
    id: 10,
    title: "Political Opinion Survey",
    icon: "🗳️",
    description: "Understand civic and political leanings.",
    questions: [
      {
        type: "multiple-choice",
        label: "Your political leaning?",
        options: ["Liberal", "Conservative", "Moderate", "Neutral"],
      },
      { type: "rating", label: "Interest in politics?" },
      {
        type: "dropdown",
        label: "Did you vote recently?",
        options: ["Yes", "No", "Not eligible"],
      },
      { type: "text", label: "Biggest issue that matters?" },
      { type: "text", label: "Ideal leadership traits?" },
    ],
  },
  {
    id: 11,
    title: "Dating & Love Survey",
    icon: "💘",
    description: "Dive into love life & romantic style.",
    questions: [
      {
        type: "multiple-choice",
        label: "Current relationship status?",
        options: ["Single", "Dating", "Married", "Complicated"],
      },
      { type: "rating", label: "Satisfaction with love life?" },
      {
        type: "dropdown",
        label: "Love language?",
        options: ["Touch", "Words", "Time", "Gifts", "Acts of Service"],
      },
      { type: "text", label: "Most romantic date idea?" },
      { type: "text", label: "Deal-breaker in a relationship?" },
    ],
  },
  {
    id: 12,
    title: "Anime & Fandom Survey",
    icon: "🧝‍♂️",
    description: "Explore anime tastes & fandom culture.",
    questions: [
      {
        type: "multiple-choice",
        label: "Favorite anime genre?",
        options: ["Shonen", "Romance", "Isekai", "Horror", "Slice of Life"],
      },
      { type: "rating", label: "How hardcore is your fandom?" },
      { type: "text", label: "Top 3 anime ever?" },
      {
        type: "dropdown",
        label: "Preferred platform?",
        options: ["Crunchyroll", "Netflix", "Funimation", "Other"],
      },
      { type: "text", label: "Waifu or husbando of choice?" },
    ],
  },
  {
    id: 13,
    title: "Gaming Survey",
    icon: "🎮",
    description: "Dive into gamer habits, genres, and devices.",
    questions: [
      {
        type: "multiple-choice",
        label: "Main gaming device?",
        options: ["Console", "PC", "Mobile", "Cloud Gaming"],
      },
      { type: "rating", label: "Hours per week you play?" },
      {
        type: "dropdown",
        label: "Favorite genre?",
        options: ["Shooter", "RPG", "Sports", "Simulation", "Puzzle"],
      },
      { type: "text", label: "Favorite game of all time?" },
      { type: "text", label: "Gaming goal this year?" },
    ],
  },
  {
    id: 14,
    title: "Music Survey",
    icon: "🎵",
    description: "Genres, artists, and listening habits.",
    questions: [
      {
        type: "multiple-choice",
        label: "Favorite music genre?",
        options: ["Pop", "Rock", "Hip-Hop", "Jazz", "EDM"],
      },
      { type: "rating", label: "Music importance in your life?" },
      {
        type: "dropdown",
        label: "Listening platform?",
        options: ["Spotify", "Apple Music", "YouTube", "Other"],
      },
      { type: "text", label: "All-time favorite artist?" },
      { type: "text", label: "Dream concert to attend?" },
    ],
  },
  {
    id: 15,
    title: "Movie & Streaming Survey",
    icon: "🎬",
    description: "Watching preferences and platform use.",
    questions: [
      {
        type: "multiple-choice",
        label: "Preferred genre?",
        options: ["Action", "Comedy", "Romance", "Thriller", "Sci-Fi"],
      },
      { type: "rating", label: "How often do you stream?" },
      {
        type: "dropdown",
        label: "Streaming service of choice?",
        options: ["Netflix", "Prime", "Disney+", "Hulu", "Other"],
      },
      { type: "text", label: "Movie you rewatch most?" },
      { type: "text", label: "TV series you recommend?" },
    ],
  },
  {
    id: 16,
    title: "Startup/Business Survey",
    icon: "🚀",
    description: "Entrepreneurship goals, pain points & growth.",
    questions: [
      {
        type: "multiple-choice",
        label: "Startup stage?",
        options: ["Idea", "Early", "Growth", "Scaling", "Exit"],
      },
      { type: "rating", label: "Confidence in your business?" },
      {
        type: "dropdown",
        label: "Main industry?",
        options: ["Tech", "Retail", "Health", "Finance", "Other"],
      },
      { type: "text", label: "Biggest business challenge?" },
      { type: "text", label: "What inspires your vision?" },
    ],
  },
  {
    id: 17,
    title: "Fitness Lifestyle Survey",
    icon: "🏋️‍♂️",
    description: "Health habits and physical goals.",
    questions: [
      {
        type: "multiple-choice",
        label: "Workout frequency?",
        options: ["Daily", "3–5x/week", "Rarely", "Never"],
      },
      { type: "rating", label: "Current fitness level?" },
      {
        type: "dropdown",
        label: "Workout preference?",
        options: ["Gym", "Yoga", "Running", "Home", "Other"],
      },
      { type: "text", label: "Fitness goal this year?" },
      { type: "text", label: "Do you follow a diet?" },
    ],
  },
  // {
  //   id: 18,
  //   title: "Women's Intimacy & Body Preference Survey",
  //   icon: "💖",
  //   description:
  //     "For adult women to explore body awareness and sexual preferences.",
  //   questions: [
  //     {
  //       type: "dropdown",
  //       label: "What is your age range?",
  //       options: ["18–24", "25–34", "35–44", "45–54", "55+"],
  //     },
  //     {
  //       type: "multiple-choice",
  //       label: "How would you describe your breast size?",
  //       options: ["A (Small)", "B", "C", "D", "DD+", "Prefer not to say"],
  //     },
  //     {
  //       type: "rating",
  //       label: "How confident are you about your breast appearance?",
  //     },
  //     {
  //       type: "multiple-choice",
  //       label: "How would you describe your vulva/vaginal appearance comfort?",
  //       options: [
  //         "Totally comfortable",
  //         "Somewhat self-conscious",
  //         "Curious to learn more",
  //         "Prefer not to say",
  //       ],
  //     },
  //     {
  //       type: "multiple-choice",
  //       label: "Have you noticed variations in vaginal/labial color?",
  //       options: [
  //         "Yes – and comfortable with it",
  //         "Yes – unsure about it",
  //         "Not really",
  //         "Prefer not to say",
  //       ],
  //     },
  //     {
  //       type: "rating",
  //       label:
  //         "How satisfied are you with your vaginal sensitivity during intimacy?",
  //     },
  //     {
  //       type: "multiple-choice",
  //       label: "How would you describe your vaginal sensitivity or tightness?",
  //       options: [
  //         "Very sensitive / tight",
  //         "Moderate",
  //         "Low sensitivity",
  //         "Depends on mood",
  //         "Prefer not to say",
  //       ],
  //     },
  //     {
  //       type: "dropdown",
  //       label: "Preferred penis size (if applicable)?",
  //       options: [
  //         'Small (under 5")',
  //         'Average (5–6.5")',
  //         'Large (7+")',
  //         "Size doesn't matter",
  //         "Not applicable",
  //       ],
  //     },
  //     {
  //       type: "multiple-choice",
  //       label: "Do you have a preference in penis shape or girth?",
  //       options: [
  //         "Yes – prefer thicker",
  //         "Yes – prefer longer",
  //         "No preference",
  //         "Not applicable",
  //       ],
  //     },
  //     {
  //       type: "rating",
  //       label: "How important is a partner’s genital appearance to you?",
  //     },
  //     {
  //       type: "multiple-choice",
  //       label: "Do you care about a partner’s grooming and hygiene?",
  //       options: [
  //         "Yes, very important",
  //         "Somewhat important",
  //         "Not really",
  //         "Not applicable",
  //       ],
  //     },
  //     {
  //       type: "multiple-choice",
  //       label: "Favorite sexual positions?",
  //       options: [
  //         "Missionary",
  //         "Doggy style",
  //         "Cowgirl / on top",
  //         "Reverse cowgirl",
  //         "Oral (receiving)",
  //         "Oral (giving)",
  //         "Side-lying / spooning",
  //         "Standing",
  //         "Other",
  //       ],
  //     },
  //     {
  //       type: "dropdown",
  //       label: "Preferred sexual pace or style?",
  //       options: [
  //         "Slow and sensual",
  //         "Passionate and rough",
  //         "Playful / teasing",
  //         "Dominant / submissive dynamics",
  //         "Depends on mood",
  //         "Other",
  //       ],
  //     },
  //     {
  //       type: "rating",
  //       label: "How adventurous are you in trying new sexual experiences?",
  //     },
  //     {
  //       type: "multiple-choice",
  //       label: "How open are you to exploring new sexual activities?",
  //       options: [
  //         "Very open",
  //         "Open with the right person",
  //         "Cautious / selective",
  //         "Prefer familiar experiences",
  //       ],
  //     },
  //     {
  //       type: "rating",
  //       label: "How confident are you in communicating desires and limits?",
  //     },
  //     {
  //       type: "text",
  //       label:
  //         "What’s one thing you’d like to experience or explore sexually (optional)?",
  //     },
  //   ],
  // },
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
