// Mock API for demo purposes when backend is not available
const mockCourses = [
  {
    _id: "1",
    title: "JavaScript Fundamentals",
    description: "Learn JavaScript basics from freeCodeCamp",
    instructorId: { name: "Dr. Sarah Wilson" },
    externalUrl: "https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/"
  },
  {
    _id: "2", 
    title: "Python for Beginners",
    description: "Complete Python course from Codecademy",
    instructorId: { name: "Dr. Sarah Wilson" },
    externalUrl: "https://www.codecademy.com/learn/learn-python-3"
  },
  {
    _id: "3",
    title: "HTML & CSS Basics", 
    description: "Web development fundamentals from MDN",
    instructorId: { name: "Dr. Sarah Wilson" },
    externalUrl: "https://developer.mozilla.org/en-US/docs/Learn/Getting_started_with_the_web"
  },
  {
    _id: "4",
    title: "React Development",
    description: "React tutorial from official React docs", 
    instructorId: { name: "Dr. Sarah Wilson" },
    externalUrl: "https://react.dev/learn"
  },
  {
    _id: "5",
    title: "Git & GitHub",
    description: "Version control with Git from GitHub Learning Lab",
    instructorId: { name: "Dr. Sarah Wilson" },
    externalUrl: "https://skills.github.com/"
  }
];

const mockQuiz = {
  _id: "quiz1",
  title: "Sample Quiz",
  questions: [
    {
      text: "What is React?",
      options: ["A database", "A JavaScript library", "A CSS framework", "A server"],
      correctIndex: 1
    },
    {
      text: "What is JSX?", 
      options: ["JavaScript XML", "Java Syntax", "JSON Extended", "JavaScript eXtended"],
      correctIndex: 0
    }
  ]
};

export const mockApi = {
  get: async (path) => {
    await new Promise(resolve => setTimeout(resolve, 500)); // Simulate network delay
    
    if (path === "/courses") {
      return mockCourses;
    }
    if (path.includes("/assessments/course/")) {
      return mockQuiz;
    }
    throw new Error("Endpoint not found");
  },
  
  post: async (path, data) => {
    await new Promise(resolve => setTimeout(resolve, 500));
    
    if (path === "/auth/login") {
      return {
        token: "mock-token",
        user: { id: "1", name: "Demo User", email: data.email, role: "learner" }
      };
    }
    if (path.includes("/submit")) {
      return { score: 85, passed: true };
    }
    throw new Error("Endpoint not found");
  }
};