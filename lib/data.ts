import type { Project, Testimonial } from "@/types";

export const projectsData: Project[] = [
  {
    id: "1",
    title: "Fundit",
    slug: "fundit",
    shortDescription: "Empowering Student Entrepreneurs Through Crowdfunding.",
    longDescription: `Fundit is one of my proudest creations — a crowdfunding platform tailored for student innovators with bold startup ideas but limited capital. This platform bridges the gap between those visionaries and impact-focused investors.
<h2>My Role:</h2>
I was deeply involved in the backend layer of this project — from planning the user flow and designing database relationships to implementing real-time messaging and secure fund handling using escrow logic. It was both a technical challenge and a rewarding journey.

<h2>Key Features:</h2>
<ul>
<li>Student entrepreneurs can create projects, set funding goals, and manage milestones.</li>
<li>Investors can browse projects, contribute funds, and track progress.</li>
<li>Admin dashboard for overseeing project statuses and user management.</li>
<li>Escrow-based fund flow to ensure secure transactions and milestone approvals.</li>
<li>Real-time chat system for seamless communication between students and investors.</li>
<li>Full-stack architecture using React for the frontend, Node.js for the backend, and PostgreSQL for the database.</li>
</ul>
<h2>Technical Highlights:</h2>
<ul>
<li>Next.js for server-side rendering and static site generation.</li>
<li>Tailwind CSS for responsive and modern UI design.</li>
<li>Prisma ORM for efficient database interactions.</li>
<li>Socket.io for real-time communication features.</li>
<li>REST API for robust data handling and user authentication with NEXT Auth.</li>
</ul>
<h2>Project Management:</h2>
<ul>
<li>Implemented a 3-user role architecture: Student, Investor, Admin.</li>
<li>Admin assignment logic to maintain focused project ownership.</li>
<li>Project lifecycle management from pending → active → funded → completed.</li>
<li>Escrow-based fund flow with milestone tracking and approval.</li>
<li>Real-time chat system with Socket.io.</li>
<li>Full-stack architecture (React + Node.js + PostgreSQL).</li>
</ul>
<h2>Why it Matters:</h2>
We wanted to create more than a platform — we wanted to give student entrepreneurs the tools and support to launch real ventures, while offering investors a meaningful way to contribute and grow their capital.`,
    technologies: [
      "Next.js",
      "Tailwind CSS",
      "Node.js",
      "PostgreSQL",
      "Prisma",
      "Socket.io",
      "REST API",
      "NEXT Auth",
    ],
    imageUrl: "/bdapps_proj.png",
    dataAiHint: "online shopping",
    videoUrl: "https://www.youtube.com/embed/AvoooD7cLzQ?si=PKARw4xVJ7nX34Ul",
    githubUrl: "https://github.com/Mutiur03/bdapps",
    liveUrl: [{ title: "Main Site", url: "https://bdapps.onrender.com/" }],
    category: "web",
    galleryImages: [
      { url: "/fundit/proj_0.png" },
      { url: "/fundit/proj_1.png" },
      { url: "/fundit/proj_2.png" },
      { url: "/fundit/proj_3.png" },
      { url: "/fundit/proj_4.png" },
      { url: "/fundit/proj_5.png" },
      { url: "/fundit/proj_6.png" },
      { url: "/fundit/proj_7.png" },
    ],
  },
  {
    id: "2",
    title: "School Management System",
    slug: "school-management-system",
    shortDescription:
      "A collaborative platform for managing tasks, deadlines, and team communication.",
    longDescription:
      "A web application designed to streamline project workflows. It offers features like task creation and assignment, progress tracking, real-time collaboration through comments and notifications, and file sharing. Built with React, Firebase for real-time database and authentication, and Material UI for the component library. Focused on intuitive UI/UX to enhance productivity.",
    technologies: ["React", "Firebase", "Material UI", "Node.js"],
    imageUrl: "/school_proj.png",
    dataAiHint: "team collaboration",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    githubUrl: "https://github.com",
    liveUrl: [
      {
        title: "Public Site",
        url: "https://school-public-client.onrender.com",
      },
      { title: "Admin Panel", url: "https://school-admin-ae6r.onrender.com" },
      {
        title: "Student Dashboard",
        url: "https://school-students.onrender.com",
      },
    ],
    category: "web",
    galleryImages: [
      { url: "/school/public_1.jpg" },
      { url: "/school/public_2.png" },
      { url: "/school/public_3.png" },
      { url: "/school/public_4.png" },
      { url: "/school/public_5.png" },
      { url: "/school/public_6.png" },
      { url: "/school/public_7.png" },
      { url: "/school/public_8.png" },
      { url: "/school/public_9.png" },
      { url: "/school/admin_1.png" },
      { url: "/school/admin_2.png" },
      { url: "/school/admin_3.png" },
      { url: "/school/admin_4.png" },
      { url: "/school/admin_5.png" },
      { url: "/school/admin_6.png" },
      { url: "/school/admin_7.png" },
      { url: "/school/admin_8.png" },
      { url: "/school/admin_9.png" },
      { url: "/school/admin_10.png" },
      { url: "/school/admin_11.png" },
      { url: "/school/admin_12.png" },
      { url: "/school/admin_13.png" },
      { url: "/school/admin_14.png" },
      { url: "/school/admin_15.png" },
      { url: "/school/admin_16.png" },
      { url: "/school/admin_17.png" },
      { url: "/school/admin_18.png" },
      { url: "/school/student_1.png" },
      { url: "/school/student_2.png" },
      { url: "/school/student_3.png" },
      { url: "/school/student_4.png" },
      { url: "/school/sheet_1.png" },
      { url: "/school/sheet_2.png" },
    ],
  },
  {
    id: "3",
    title: "AI Powered Blog Generator",
    slug: "ai-blog-generator",
    shortDescription:
      "A content creation tool that uses AI to generate blog posts based on user prompts.",
    longDescription:
      "This innovative tool leverages OpenAI's GPT models to assist users in creating engaging blog content. Users can input topics, keywords, and desired tone, and the application generates well-structured articles. The stack includes Python (Flask) for the backend AI integration, Next.js for the frontend, and a custom-trained model for specific content styles.",
    technologies: ["Next.js", "Python", "Flask", "OpenAI API", "Docker"],
    imageUrl: "/portfolio_proj.png",
    dataAiHint: "artificial intelligence writing",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    githubUrl: "https://github.com",
    liveUrl: "#",
    category: "saas",
    galleryImages: [
      { url: "https://placehold.co/800x600.png", dataAiHint: "content editor" },
      {
        url: "https://placehold.co/800x600.png",
        dataAiHint: "generation settings",
      },
    ],
  },
];

export const testimonialsData: Testimonial[] = [
  {
    id: "1",
    quote:
      "Working with this developer was an absolute pleasure. Their expertise and dedication to quality are unmatched. Our project was delivered on time and exceeded all expectations!",
    author: "Jane Doe",
    company: "Tech Solutions Inc.",
    avatarUrl: "https://placehold.co/100x100.png",
    dataAiHint: "professional woman",
  },
  {
    id: "2",
    quote:
      "The level of skill and professionalism brought to our project was outstanding. Complex problems were solved with elegant solutions. Highly recommended!",
    author: "John Smith",
    company: "Innovatech Ltd.",
    avatarUrl: "https://placehold.co/100x100.png",
    dataAiHint: "businessman portrait",
  },
  {
    id: "3",
    quote:
      "From start to finish, the communication was excellent, and the final product was polished and performant. A true expert in the field.",
    author: "Alice Brown",
    company: "Creative Minds Co.",
    avatarUrl: "https://placehold.co/100x100.png",
    dataAiHint: "smiling person",
  },
];

export const getProjectBySlug = (slug: string): Project | undefined => {
  return projectsData.find((project) => project.slug === slug);
};
