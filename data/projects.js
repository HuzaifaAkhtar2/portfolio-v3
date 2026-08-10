export const projects = [
  {
    id: "zentry",

    title: "Zentry.com Recreation",
    shortTitle: "Zentry Recreation",
    type: "Website Recreation",
    category: "recreation",
    year: null,
    updated: "August 2026",

    status: "Completed",
    statusTone: "completed",
    featured: true,

    description:
      "A responsive Zentry recreation that began as a guided build and grew into a larger frontend exercise through additional sections, extensive responsive work, and visual refinements.",

    tech: ["HTML", "CSS", "JavaScript"],

    image: "assets/zentry-clone.webp",
    accent: "orange",

    overview:
      "This project began as a tutorial-based recreation of Zentry.com. After following and understanding the initial implementation, I continued developing it independently by adding more sections, expanding the responsive behavior, and refining the interface to more closely match the original site.",

    motivation:
      "The goal was not simply to copy the appearance of the original website. I wanted to challenge myself with a design that forced me to think more carefully about responsive layouts, positioning, visual hierarchy, and interaction.",

    goals: [
      "Recreate the visual character of the original Zentry landing page.",
      "Make complex desktop sections adapt properly to smaller screens.",
      "Practice building interactive elements with vanilla JavaScript.",
      "Improve my ability to translate an existing design into code.",
    ],

    features: [
      "Responsive layouts across desktop, tablet, and mobile",
      "Interactive navigation and page elements",
      "Custom hover interactions",
      "Animated and visually layered sections",
      "Reusable styling patterns across different sections",
      "Responsive typography and spacing",
    ],

    challenge:
      "The biggest challenge was taking a design built around large, cinematic compositions and making it remain readable and usable on smaller screens without losing its visual character.",

    solution:
      "I broke the page into individual sections and handled each layout independently rather than trying to force one responsive strategy across the entire website. I adjusted typography, positioning, spacing, and layout behavior at different breakpoints while keeping the overall visual hierarchy consistent.",

    lessons:
      "This project taught me that recreating a complex design is not only about matching what is visible on a desktop screenshot. Responsive behavior, spacing, hierarchy, and interaction all have to be reconsidered as the available space changes.",

    takeaways: [
      "Complex designs become easier to manage when broken into smaller sections.",
      "Responsive design often requires changing composition, not just shrinking elements.",
      "Visual hierarchy matters even more when a page contains many expressive elements.",
      "Small interaction details can have a large effect on how polished an interface feels.",
    ],

    focusAreas: [
      "Responsive Design",
      "Complex Layouts",
      "CSS",
      "DOM Interaction",
      "Visual Recreation",
    ],

    recreation: true,
    originalSite: "Zentry.com",
    disclaimer:
      "This project began from a guided tutorial and was extended independently. It is an educational frontend recreation of Zentry.com and is not affiliated with or endorsed by Zentry.",

    github: "https://github.com/HuzaifaAkhtar2/zentry-clone",
    demo: "https://huzaifaakhtar2.github.io/zentry-clone/",
    tutorialBased: true,
    tutorialCreator: "MiladiCode",
    tutorialUrl: "https://www.youtube.com/watch?v=ukMPKm3cLns",
  },

  {
    id: "restaurant",

    title: "Britannia Restaurant Website",
    shortTitle: "Restaurant Website",
    type: "Client Website",
    category: "client-work",
    year: 2026,
    updated: "August 2026",

    status: "Client Work",
    statusTone: "client-work",
    featured: true,

    description:
      "A responsive restaurant website created for a real client, focused on presenting the restaurant, its menu, services, opening hours, and contact information clearly across devices.",

    tech: ["HTML", "CSS", "JavaScript"],

    image: "assets/britannia-restaurant-website.webp",
    accent: "green",

    client: "Britannia Restaurant",
    role: "Frontend Developer",

    overview:
      "Britannia Restaurant needed a simple online presence where customers could learn about the restaurant, browse its menu, check opening hours, and find contact information. I built the frontend with a focus on clarity, responsiveness, and making the most important restaurant information easy to find.",

    motivation:
      "Unlike my personal practice projects, this website required me to build around the needs of an actual business and communicate with a client about what the website should contain.",

    goals: [
      "Create a clear and responsive online presence for the restaurant.",
      "Make menu and restaurant information easy to access.",
      "Present opening hours and contact information clearly.",
      "Ensure the website works comfortably across desktop and mobile devices.",
      "Keep the interface simple enough for visitors to navigate without unnecessary complexity.",
    ],

    features: [
      "Responsive homepage",
      "Dedicated menu page",
      "Contact section and restaurant information",
      "Opening hours",
      "Restaurant services and dining information",
      "Customer testimonials",
      "Mobile navigation",
      "Responsive menu layouts",
      "Semantic HTML structure",
      "Structured restaurant data",
    ],

    challenge:
      "The main challenge was balancing visual presentation with practical information. Restaurant visitors often want information such as the menu, opening hours, location, or contact details quickly, so the design could not allow decorative elements to get in the way.",

    solution:
      "I organized the content around the information a potential customer would be most likely to look for and used responsive layouts to keep that information readable across different screen sizes.",

    lessons:
      "Working on a client project showed me that building a website is not only about writing code. Understanding requirements, deciding what information deserves priority, communicating changes, and delivering something useful to another person are equally important parts of the process.",

    takeaways: [
      "Client requirements should guide design decisions.",
      "Practical information needs strong visual priority.",
      "Responsive behavior has to be tested across the entire site, not only the homepage.",
      "Simple interfaces can often serve real businesses better than unnecessary complexity.",
    ],

    focusAreas: [
      "Client Work",
      "Responsive Design",
      "Semantic HTML",
      "Content Structure",
      "SEO",
    ],

    seo: [
      "Meta information",
      "Semantic page structure",
      "Restaurant structured data",
    ],

    recreation: false,

    github: "https://github.com/HuzaifaAkhtar2/britannia-restaurant-website",
    demo: "https://huzaifaakhtar2.github.io/britannia-restaurant-website/",
  },

  {
    id: "portfolio",

    title: "Portfolio V3",
    shortTitle: "Portfolio V3",
    type: "Personal Portfolio",
    category: "personal",
    year: 2026,
    updated: "August 2026",

    status: "Completed",
    statusTone: "completed",
    featured: true,

    description:
      "A personal portfolio designed to present my strongest frontend work while documenting the projects, experiments, and decisions that have shaped how I build for the web.",

    tech: ["HTML", "CSS", "JavaScript"],

    image: "assets/portfolio-v3.webp",
    accent: "blue",

    overview:
      "Portfolio V3 is a project-focused portfolio designed to feel like more than a collection of project cards. It separates my featured work from my broader development history while keeping the interface minimal, responsive, and focused on the projects themselves.",

    motivation:
      "I wanted to replace my previous portfolio with something that better reflects both my current frontend abilities and the way I have developed over time. Rather than copying my resume into a website, the portfolio focuses primarily on my work, process, and personality as a developer.",

    goals: [
      "Make projects the main focus of the website.",
      "Create a visual identity that feels personal without becoming distracting.",
      "Keep navigation and content easy to understand.",
      "Support both light and dark themes.",
      "Provide detailed project information without overcrowding the homepage.",
      "Preserve smaller and older work through The Archive.",
      "Build the website using web-platform fundamentals rather than a frontend framework.",
    ],

    features: [
      "Responsive navigation",
      "Dark and light themes",
      "Persistent theme preference",
      "Data-driven featured projects",
      "Accessible project detail dialog",
      "Detailed project case studies",
      "Separate project Archive",
      "Responsive layouts",
      "Keyboard-accessible interactions",
      "Contact form",
    ],

    challenge:
      "The biggest challenge was creating a portfolio with enough personality to feel recognizably mine while keeping the interface practical, professional, and easy to scan.",

    solution:
      "I kept the core design intentionally minimal and focused most of the personality on smaller decisions: project storytelling, The Archive, typography, copy, interactions, and optional easter eggs rather than overwhelming the site with decorative effects.",

    lessons:
      "Building my own portfolio has made it clear that good design decisions are not necessarily the most visually impressive ones. The strongest choices are often the ones that make the work easier to discover and understand.",

    takeaways: [
      "A portfolio does not need to duplicate a resume.",
      "Project storytelling can communicate more than a technology list.",
      "Personality works better through deliberate details than excessive effects.",
      "Good architecture makes future projects easier to add.",
      "Accessibility and responsiveness are easier to maintain when considered from the beginning.",
    ],

    focusAreas: [
      "UI Design",
      "Responsive Design",
      "Accessibility",
      "JavaScript Architecture",
      "Project Storytelling",
    ],

    accessibility: [
      "Semantic HTML structure",
      "Keyboard-accessible navigation",
      "Accessible project dialog",
      "Visible focus states",
      "Reduced-motion considerations",
    ],

    architecture: [
      "Project information stored as JavaScript data",
      "Reusable project rendering",
      "Separate Archive for smaller and historical projects",
      "Shared theme system",
    ],
    recreation: false,

    github: "https://github.com/HuzaifaAkhtar2/portfolio-v3",

    demo: null,
  },
];
