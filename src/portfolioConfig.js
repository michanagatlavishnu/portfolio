/**
 * Portfolio Configuration Data for Michanagatla Vishnu
 * Updated with details from resume
 */
export const portfolioConfig = {
  personal: {
    name: "Michanagatla Vishnu",
    tagline: "Passionate Cybersecurity Engineer & Programmer",
    // These roles will cycle in the typewriter animation
    roles: [
      "Cybersecurity Engineer",
      "Programmer",
      "Full Stack Architect"
    ],
    bio: "A fast learner and smart worker, willing to join as a fresher and eager to develop my skills. Passionate cybersecurity engineer with a strong background in blockchain technology. Skilled in Python, SQL, HTML, and CSS. Possess excellent problem-solving, research, and collaboration abilities.",
    email: "michanagatlavishnu@gmail.com",
    location: "India",
    resumeUrl: "/resume.html", // Link to the printable web resume
  },
  
  socials: {
    github: "https://github.com/michanagatlavishnu",
    linkedin: "https://www.linkedin.com/in/michanagatla-vishnu-396a59350/",
    email: "michanagatlavishnu@gmail.com"
  },

  // Academic and skill-focused statistics for a fresher portfolio
  stats: [
    { label: "B.Tech CGPA", value: "8.87" },
    { label: "Certifications", value: "3" },
    { label: "Core Technologies", value: "8" },
    { label: "Security Projects", value: "2" }
  ],

  // Technical skills listed on the resume
  skills: {
    backend: [
      { name: "Python", level: 88 },
      { name: "JAVA", level: 82 },
      { name: "MySQL", level: 85 },
      { name: "C Programming", level: 80 }
    ],
    frontend: [
      { name: "JavaScript", level: 85 },
      { name: "HTML", level: 90 },
      { name: "CSS", level: 90 }
    ],
    tools: [
      { name: "Data Structures", level: 85 }
    ]
  },

  // Education history and certifications mapped to the timeline
  experience: [
    {
      role: "B.Tech in Computer Science & Engineering",
      company: "Koneru Lakshmaiah University",
      duration: "2023 - 2027 (Present)",
      description: "Focusing on core computer science subjects, algorithms, data structures, blockchain tech, and cybersecurity. Maintaining a high academic standing.",
      tech: ["CGPA: 8.87", "Cybersecurity", "Blockchain", "Data Structures"]
    },
    {
      role: "Intermediate (MPC)",
      company: "Resonance Junior College",
      duration: "2021 - 2023",
      description: "Completed secondary education specializing in Mathematics, Physics, and Chemistry.",
      tech: ["CGPA: 6.94", "MPC"]
    },
    {
      role: "Salesforce AI Associate",
      company: "Salesforce Certification",
      duration: "Credential",
      description: "Certified in fundamental artificial intelligence concepts, ethical considerations in AI, and customer relationship management solutions.",
      tech: ["AI Concepts", "Salesforce Ecosystem", "Ethics in AI"]
    },
    {
      role: "Oracle Cloud Infrastructure Architect Associate",
      company: "Oracle Certification",
      duration: "Credential",
      description: "Certified in cloud computing fundamentals, architecting infrastructure solutions, network security, and database deployment on Oracle Cloud.",
      tech: ["OCI Services", "Cloud Architecture", "Identity & Access Management"]
    },
    {
      role: "Microsoft Azure Fundamentals",
      company: "Microsoft Certification",
      duration: "Credential",
      description: "Certified in foundational cloud concepts, core Azure services, security, privacy, compliance, and trust, as well as Azure pricing and support.",
      tech: ["Azure Concepts", "Cloud Services", "Security & Compliance"]
    }
  ],

  // Major projects detailed on the resume
  projects: [
    {
      title: "Text To Image Generation with Generative Ai",
      description: "Developed an end-to-end text-to-image generation system using Python, Stable Diffusion, and Hugging Face to generate high-quality images from natural language prompts. Implemented model loading, configuration setup, image generation, resizing, and float32 precision optimization to ensure efficient and accurate image synthesis.",
      category: "AI & Generative",
      tech: ["Python", "Stable Diffusion", "Hugging Face", "Generative AI"],
      githubLink: "https://github.com/michanagatlavishnu",
      liveLink: "#"
    },
    {
      title: "AI-Driven Web Application Security Suite (WAF + Scanner)",
      description: "Developed a secure web application using React (Vite), Node.js, and Express.js to identify common vulnerabilities such as SQL Injection. Built an integrated Web Application Firewall (WAF) with AI-based threat analysis to monitor requests, block malicious traffic in real time, and provide actionable security recommendations.",
      category: "Cybersecurity",
      tech: ["React (Vite)", "Node.js", "Express.js", "AI WAF", "SQL Injection"],
      githubLink: "https://github.com/michanagatlavishnu",
      liveLink: "#"
    }

  ]
};
