import { rudraData } from './videos';

export const AI_KNOWLEDGE_BASE = [
  {
    id: 'greeting',
    keywords: ['hi', 'hello', 'hey', 'greetings', 'who are you', 'what are you', 'help', 'start'],
    response: {
      text: `Hello! 👋 I'm **Rudra AI**, the virtual recruiter and technical assistant for **Rudra Prakash Mallick**.

I can answer any questions about Rudra's full-stack MERN expertise, production projects, academic credentials (8.32 CGPA), work availability, or help you schedule an interview.`,
      suggestions: ['Why should we hire Rudra?', 'Show core tech stack', 'Explain WorkEasy architecture', 'Download CV', 'Check availability']
    }
  },
  {
    id: 'why_hire',
    keywords: ['why hire', 'why should we hire', 'strengths', 'why choose', 'value', 'best qualities', 'stand out', 'what makes you special', 'hire you'],
    response: {
      text: `Here is why **Rudra Prakash Mallick** is an exceptional candidate for full-stack & software engineering roles:

1. 🚀 **Full-Stack MERN Mastery**: Builds complete, production-grade applications from React frontends to Node.js/Express REST APIs and MongoDB databases.
2. 🔒 **Real-World Security Focus**: Implements enterprise security features including **JWT Authentication**, bcrypt hashing, and **SendGrid OTP Email Verification**.
3. 🎓 **Strong CS Foundation**: B.Tech in Computer Science from **GIFT Autonomous** with a stellar **8.32 CGPA**, backed by solid Data Structures & REST architectural principles.
4. ⚡ **Fast Learner & Production-Minded**: Proactive problem solver with high-quality, maintainable code standards.`,
      actions: [
        { label: 'Download Official Resume', type: 'download', href: rudraData.resumeUrl || '/Rudra _Prakash.pdf', filename: 'Rudra_Prakash_Resume.pdf' },
        { label: 'Schedule Interview', type: 'email', href: `mailto:${rudraData.email}?subject=Interview%20Invitation%20-%20Rudra%20Prakash%20Mallick` }
      ],
      suggestions: ['Tell me about WorkEasy', 'Check tech stack', 'Availability & notice period']
    }
  },
  {
    id: 'tech_stack',
    keywords: ['skills', 'tech stack', 'technologies', 'technology', 'tools', 'languages', 'react', 'node', 'express', 'mongo', 'mongodb', 'javascript', 'tailwind', 'redux'],
    response: {
      text: `**Rudra's Core Technical Competencies:**

• **Frontend**: React.js, JavaScript (ES6+), Tailwind CSS, Redux, HTML5/CSS3, GSAP, Responsive UI Design.
• **Backend**: Node.js, Express.js, RESTful APIs, JWT Authentication, SendGrid API, Middleware Architecture.
• **Databases**: MongoDB, Mongoose ODM, Schema Design & Indexing.
• **Tools & Workflow**: Git, GitHub, Postman, Vite, VS Code, Netlify, Linux Shell.
• **Core CS**: Data Structures, Object-Oriented Programming, MVC & Clean Code Architecture.`,
      actions: [
        { label: 'View GitHub Profile', type: 'link', href: rudraData.github },
        { label: 'See Live Projects', type: 'query', query: 'Show me projects' }
      ],
      suggestions: ['Explain WorkEasy architecture', 'Why hire Rudra?', 'Education & GPA']
    }
  },
  {
    id: 'workeasy_project',
    keywords: ['workeasy', 'task manager', 'task project', 'sendgrid', 'otp', 'jwt', 'security architecture', 'featured project', 'authentication'],
    response: {
      text: `**WorkEasy — Full-Stack MERN Task & Workflow Platform:**

• **Architecture**: Decoupled React + Tailwind frontend consuming an Express.js / Node.js REST API with a MongoDB database.
• **Authentication & Security**: Integrated with **SendGrid OTP verification** for multi-factor email verification and stateless **JWT session tokens**.
• **Features**: Full CRUD operations for task scheduling, priority tagging, status state machines, and real-time UI updates.
• **Live Deployment**: Hosted on Netlify with live cloud API connectivity.`,
      actions: [
        { label: 'Launch WorkEasy Live Demo 🚀', type: 'link', href: 'https://workeasym.netlify.app/' },
        { label: 'Frontend Repo (GitHub)', type: 'link', href: 'https://github.com/RudraPrakash-m/TaskManager-frontend' },
        { label: 'Backend Repo (GitHub)', type: 'link', href: 'https://github.com/RudraPrakash-m/TaskManagerBackend-backend' }
      ],
      suggestions: ['Other projects', 'Why hire Rudra?', 'Download CV']
    }
  },
  {
    id: 'all_projects',
    keywords: ['projects', 'portfolio projects', 'apps', 'work', 'works', 'applications', 'built', 'showcase'],
    response: {
      text: `**Featured Production Projects by Rudra:**

1. 🌟 **WorkEasy (Task Manager)**: Full-Stack MERN with SendGrid OTP & JWT Auth.
2. 📚 **Mongo Universe**: MongoDB Course E-Learning platform with MailJS API integration.
3. ⚡ **MERN REST API Backend Suite**: Scalable Node.js & Express REST API architecture with JWT authentication.
4. 🎨 **Interactive Portfolio**: Award-winning interactive portfolio with smooth sliding transitions & developer CLI.`,
      actions: [
        { label: 'Launch WorkEasy Demo 🚀', type: 'link', href: 'https://workeasym.netlify.app/' },
        { label: 'Mongo Universe Demo ↗', type: 'link', href: 'https://mongouniverse.netlify.app/' },
        { label: 'View All GitHub Repos', type: 'link', href: rudraData.github }
      ],
      suggestions: ['Tell me about WorkEasy', 'Core skills', 'Download CV']
    }
  },
  {
    id: 'education_gpa',
    keywords: ['education', 'college', 'degree', 'gpa', 'cgpa', 'gift', 'btech', 'university', 'grades', 'school', '10th', '12th'],
    response: {
      text: `**Educational Background:**

🎓 **B.Tech in Computer Science & Engineering (2022 - 2026)**
• **Institution**: Gandhi Institute For Technology (GIFT Autonomous), Bhubaneswar
• **Academic Score**: **CGPA: 8.32 / 10.0**

🏫 **Intermediate (12th Science) — 2020 - 2022**
• Sai Sristi Higher Secondary School, Bhubaneswar • Score: **79.5%**

🏫 **Matriculation (10th Board) — 2020**
• Saraswati Sishu Vidya Mandir, Paradeep • Score: **73.66%**`,
      actions: [
        { label: 'Download Verified Resume', type: 'download', href: rudraData.resumeUrl || '/Rudra _Prakash.pdf', filename: 'Rudra_Prakash_Resume.pdf' }
      ],
      suggestions: ['Why hire Rudra?', 'Core tech stack', 'Availability']
    }
  },
  {
    id: 'availability_notice',
    keywords: ['availability', 'notice period', 'when can you join', 'immediate', 'start date', 'relocate', 'relocation', 'remote', 'full time', 'location', 'open to work', 'joining'],
    response: {
      text: `**Employment Availability & Preferences:**

• **Status**: Open and proactively interviewing for **Full-Time Software Engineer / MERN Developer** positions.
• **Notice Period**: Available for **Immediate Joining**.
• **Location Flexibility**: Based in Paradeep / Bhubaneswar, Odisha. Open to **Remote**, **Hybrid**, or **Relocation** to tech hubs (Bengaluru, Hyderabad, Pune, NCR, etc.).`,
      actions: [
        { label: 'Send Email Directly', type: 'email', href: `mailto:${rudraData.email}?subject=Job%20Opportunity%20-%20Rudra%20Prakash%20Mallick` },
        { label: 'Call Rudra', type: 'link', href: `tel:${rudraData.phone}` }
      ],
      suggestions: ['Schedule an interview', 'Why hire Rudra?', 'Download CV']
    }
  },
  {
    id: 'contact_interview',
    keywords: ['contact', 'email', 'phone', 'call', 'interview', 'schedule', 'reach out', 'hire', 'talk', 'connect', 'linkedin'],
    response: {
      text: `**Contact & Connect with Rudra Prakash:**

• 📧 **Email**: [${rudraData.email}](mailto:${rudraData.email})
• 📱 **Phone**: [${rudraData.phone}](tel:${rudraData.phone})
• 💼 **LinkedIn**: [linkedin.com/in/rudra-prakash-mallick-71b23627b](https://www.linkedin.com/in/rudra-prakash-mallick-71b23627b/)
• 🐙 **GitHub**: [github.com/RudraPrakash-m](https://github.com/RudraPrakash-m)
• 📍 **Location**: Paradeep / Bhubaneswar, Odisha, India`,
      actions: [
        { label: 'Send Email', type: 'email', href: `mailto:${rudraData.email}` },
        { label: 'View LinkedIn', type: 'link', href: rudraData.linkedin },
        { label: 'Download Resume', type: 'download', href: rudraData.resumeUrl || '/Rudra _Prakash.pdf', filename: 'Rudra_Prakash_Resume.pdf' }
      ],
      suggestions: ['Why hire Rudra?', 'Core tech stack', 'WorkEasy architecture']
    }
  },
  {
    id: 'resume',
    keywords: ['resume', 'cv', 'download resume', 'download cv', 'pdf', 'profile document'],
    response: {
      text: `You can download Rudra's official 1-page updated CV covering all MERN projects, technical stack, B.Tech credentials, and security implementations:`,
      actions: [
        { label: '📄 Download Official CV (PDF)', type: 'download', href: rudraData.resumeUrl || '/Rudra _Prakash.pdf', filename: 'Rudra_Prakash_Resume.pdf' }
      ],
      suggestions: ['Why hire Rudra?', 'WorkEasy architecture', 'Contact info']
    }
  }
];

export const processQuery = (rawQuery) => {
  if (!rawQuery || typeof rawQuery !== 'string') {
    return AI_KNOWLEDGE_BASE[0].response;
  }

  const query = rawQuery.toLowerCase().trim();

  let bestMatch = null;
  let highestScore = 0;

  for (const item of AI_KNOWLEDGE_BASE) {
    let score = 0;

    for (const keyword of item.keywords) {
      if (query === keyword) {
        score += 15; // Exact match
      } else if (query.includes(keyword)) {
        score += 8 + keyword.length; // Substring match weighted by length
      } else {
        const queryWords = query.split(/\s+/);
        const keywordWords = keyword.split(/\s+/);
        for (const qw of queryWords) {
          if (qw.length > 2 && keywordWords.includes(qw)) {
            score += 4;
          }
        }
      }
    }

    if (score > highestScore) {
      highestScore = score;
      bestMatch = item;
    }
  }

  if (bestMatch && highestScore >= 4) {
    return bestMatch.response;
  }

  // Fallback response with helpful prompt options
  return {
    text: `I'm specialized in answering questions regarding **Rudra Prakash Mallick's** full-stack development experience, technical skills, projects, and hiring availability.

Here are some popular topics I can assist you with:`,
    suggestions: [
      'Why should we hire Rudra?',
      'Show core tech stack',
      'Explain WorkEasy architecture',
      'Education & 8.32 CGPA',
      'Notice period & availability',
      'Download official CV'
    ]
  };
};
