// Single source of truth. Edit values here; the page renders from this object.
const portfolioData = {
  name: "Pravin A",
  role: "Full Stack & AI/ML Developer",
  location: "Dindigul, Tamil Nadu, India",
  email: "pravin.hari1234@gmail.com",
  phone: "+91 80723 60535",
  resume: "assets/Pravin_A_Resume.pdf",
  // Live contact-form endpoint. The first submission triggers FormSubmit email activation.
  formEndpoint:
    "https://formsubmit.co/ajax/pravin.hari123@gmail.com",
  formSubject:
      "New Portfolio Contact Message",
  socialLinks: {
    LinkedIn: "https://www.linkedin.com/in/a-pravin-694593293",
    GitHub: "https://github.com/pravin-hari"
  },
  intro: "I build practical software across the full stack, from REST APIs and React interfaces to machine learning models that solve real problems.",
  about: [
    "I'm a Computer Science Engineering student focused on practical, scalable and intelligent software. My work combines full stack development, machine learning, data analysis and cybersecurity.",
    "I like working across the whole lifecycle: understanding the problem, designing the solution, building APIs and responsive interfaces, connecting databases and testing the result.",
    "I aim for software that is functional, reliable, maintainable, secure and easy to use."
  ],
  statistics: [
    { value: 3, label: "Internships" },
    { value: 4, label: "Projects built" },
    { value: 15, label: "Technologies" }
  ],
  services: [
    { title: "Full Stack Development", tags: ["React", "Flask", "FastAPI", "SQL", "MongoDB"], text: "Responsive web applications with frontend, backend APIs, databases and integrations." },
    { title: "AI & Machine Learning", tags: ["Scikit-learn", "Pandas", "NumPy"], text: "Prediction, classification and analysis models built on real datasets." },
    { title: "Cybersecurity Solutions", tags: ["Phishing detection", "URL analysis"], text: "Security tools that flag suspicious activity and give risk-based insight." },
    { title: "Data Analysis", tags: ["Matplotlib", "Seaborn", "Pandas"], text: "Cleaning, feature engineering, visualization and predictive modeling." },
    { title: "Backend & APIs", tags: ["REST", "Flask", "FastAPI"], text: "Structured services that connect apps, databases and ML models." },
    { title: "Software Development", tags: ["Clean code", "Debugging", "Git"], text: "Maintainable software with attention to performance and real-world usability." }
  ],
  experience: [
    { org: "Orvionar Tech Pvt. Ltd.", role: "Full Stack Developer Intern", place: "Bengaluru", text: "React.js, REST API integration, database operations, Git and GitHub." },
    { org: "Ekhai Business Services",role: "Data Science Intern",place: "Coimbatore",text: "Worked on data preprocessing, exploratory data analysis, feature engineering, and machine learning workflows. Gained practical experience in analyzing datasets, building predictive models, evaluating results, and deriving meaningful insights from data."},
    { org: "Oneyes InfoTech", role: "Data Science Trainee", place: "Chennai", text: "Preprocessing, EDA, feature engineering and ML models with Python, Pandas, NumPy and Scikit-learn." }
  ],
  projects: [
    { title: "AI Phishing Detection System", category: "AI / Cybersecurity", year: "2026", stack: ["Python", "Flask", "FastAPI", "Scikit-learn", "Pandas"], size: "xl",
      description: "An ML-based system that detects malicious URLs and suspicious websites.",
      problem: "Phishing links are hard to spot by eye and rule lists go stale.",
      solution: "Extracts URL features, scores risk with a trained model and keeps a prediction history.",
      features: ["Feature extraction", "Risk scoring", "Prediction history"], github: "https://github.com/pravin-hari/pishing-dection.git", demo: "" },
    { title: "Medical Insurance Cost Prediction", category: "Machine Learning", year: "2026", stack: ["Python", "Pandas", "Scikit-learn", "NumPy"], size: "s",
      description: "Predictive model for medical insurance charges, built during the Oneyes InfoTech traineeship.",
      problem: "Insurance costs depend on several interacting personal factors.",
      solution: "Cleaned the data, engineered features, then trained and evaluated regression models.",
      features: ["Data cleaning", "Exploratory analysis", "Model evaluation"], github: "https://github.com/pravin-hari/medical-prediction.git", demo: "" },
    { title: "AI Virtual Assistant (JARVIS)", category: "Python Automation", year: "2026", stack: ["Python", "SpeechRecognition", "pyttsx3", "REST APIs"], size: "wide",
      description: "A voice assistant that automates everyday desktop tasks.",
      problem: "Routine tasks like search, weather and launching apps take repeated manual steps.",
      solution: "Speech input is parsed into commands that call local actions and web APIs.",
      features: ["Speech recognition", "Web search and weather", "App launching", "Reminders"], github: "https://github.com/pravin-hari/JARVIS.git", demo: "" },
    { title: "Password Strength Analyzer", category: "Cybersecurity", year: "2026", stack: ["Python", "Flask", "Machine Learning"], size: "m",
      description: "Analyzes password strength and estimates crack time.",
      problem: "People rarely know why a password is weak.",
      solution: "Checks common weaknesses and reports estimated crack time with feedback.",
      features: ["Strength scoring", "Crack-time estimate", "Weakness detection"], github: "https://github.com/pravin-hari/password-security-analyzer.git", demo: "" }
  ],
  skills: ["Python", "JavaScript", "React.js", "Node.js", "Flask", "FastAPI", "MySQL", "MongoDB", "Pandas", "NumPy", "Scikit-learn", "Git", "GitHub", "Postman", "Tailwind CSS"],
  words: ["Design", "Development", "AI", "Web", "Data", "Cybersecurity"],
};
