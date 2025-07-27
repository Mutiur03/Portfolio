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
      "PostgreSQL",
      "Prisma",
      "Socket.io",
      "Tailwind CSS",
      "Node.js",
      "REST API",
      "NEXT Auth",
    ],
    imageUrl: "/bdapps_proj.png",
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
      "A web app for managing school operations and student data.",
    longDescription: `  <h2>School Management System — Full-Stack Web Application</h2>
  <p>
    This project is a complete school management platform that I designed and developed entirely by myself. It is built to support the academic, administrative, and operational workflows of educational institutions by digitizing manual processes, streamlining communication, and centralizing data access for students, teachers, and administrators.
  </p>
  <h3>Project Purpose</h3>
  <p>
    The main goal of this system is to reduce administrative overhead and enable a transparent, real-time academic management experience. With user-specific dashboards, automated report generation, secure file management, and integrated attendance and grading systems, it provides all the tools necessary to operate a modern school efficiently.
  </p>

  <h3>Main Features</h3>
  <ul>
    <li>Student Management: Add, update, and delete student profiles, including personal and academic details, class assignments, and profile pictures.</li>
    <li>Teacher Management: Manage faculty records with qualifications, subject assignments, and profile images. Teachers have access to student lists, exams, and attendance based on permissions.</li>
    <li>Subject Management: Create and assign subjects to specific classes. Supports bulk import via Excel sheets.</li>
    <li>Exam and Marks Management: Schedule exams, input and edit marks, calculate GPA and grades, and generate marksheets automatically as printable PDFs.</li>
    <li>Notice Board: Post and publish notices to specific user groups. Admins can upload attachments which are hosted securely on Google Drive with preview and download links.</li>
    <li>Event and Gallery Management: Admins can create events and manage media uploads. Students can also upload event-related images which require admin approval before publication.</li>
    <li>Attendance System: Daily or subject-wise attendance tracking with filters by class, subject, or date. Includes student promotion logic based on attendance and academic performance.</li>
    <li>Authentication and Authorization: Role-based access control using secure JWT authentication. Admins and teachers have different access scopes throughout the platform.</li>
    <li>PDF Generation: Marksheet and report generation with server-side rendering using Puppeteer.</li>
    <li>Google Drive Integration: All uploaded PDF and notice files are stored in a specified Drive folder using a secure service account with download and preview links stored in the database.</li>
  </ul>

  <h3>Tech Stack</h3>
  <ul>
    <li><strong>Frontend:</strong> React, Vite, Tailwind CSS, Zustand, Framer Motion, Shadcn UI</li>
    <li><strong>Backend:</strong> Node.js with Express</li>
    <li><strong>Database:</strong> PostgreSQL managed with Prisma ORM</li>
    <li><strong>Authentication:</strong> JWT-based authentication with protected routes and role-based logic</li>
    <li><strong>File Handling:</strong> Multer for file uploads; Google Drive API for cloud storage</li>
    <li><strong>PDF Reports:</strong> Puppeteer for server-side PDF rendering and formatting</li>
    <li><strong>Excel Handling:</strong> xlsx library for importing bulk data such as subjects and students</li>
  </ul>

  <h3>System Architecture</h3>
  <p>
    The architecture follows a modular, RESTful API design pattern. It supports scalable deployment, integrates external services like Google Drive, and includes client-server separation with secure authentication. It also uses Prisma’s type-safe data modeling for clean and efficient database operations.
  </p>

  <h3>What I Learned</h3>
  <ul>
    <li>Built a full-stack application from scratch with production-level features</li>
    <li>Learned how to integrate external APIs like Google Drive for real-time file hosting</li>
    <li>Implemented complex role-based access controls for secure feature isolation</li>
    <li>Created dynamic and printable PDF reports using headless browsers</li>
    <li>Optimized database schemas for performance and clarity using Prisma ORM</li>
    <li>Handled real-world problems such as bulk data import, file validation, and asynchronous processes</li>
  </ul>`,
    technologies: [
      "React",
      "TypeScript",
      "Express",
      "PostgreSQL",
      "Tailwind CSS",
      "Shadcn",
      "Node.js",
      "Prisma",
      "JWT",
      "Google API",
      "Puppeteer",
      "Multer",
      "xlsx",
    ],
    imageUrl: "/school_proj.png",
    videoUrl: "https://www.youtube.com/embed/EIk6t_aUbpY?si=L3yqah_jcltEogVD",
    githubUrl: "https://github.com/Mutiur03/School",
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
    title: "Portfolio Website",
    slug: "portfolio-website",
    shortDescription:
      "A modern, responsive portfolio website to showcase my projects, skills, and testimonials.",
    longDescription: `<h2>Portfolio Website — Personal Branding Platform</h2>
      <p>
        This portfolio website is designed and developed to present my professional journey, highlight key projects, and provide a central hub for potential clients and collaborators to learn more about my work. It features a clean, accessible UI, dynamic project galleries, and integrated testimonials.
      </p>
      <h3>Features</h3>
      <ul>
        <li>Responsive design for seamless experience on all devices</li>
        <li>Interactive project gallery with detailed views and media</li>
        <li>Testimonials section with client feedback</li>
        <li>Contact form with email integration</li>
        <li>SEO optimized and fast-loading</li>
        <li>Dark/light mode toggle</li>
      </ul>
      <h3>Tech Stack</h3>
      <ul>
        <li><strong>Frontend:</strong> Next.js, React, Tailwind CSS</li>
        <li><strong>Backend:</strong> Static site (no backend required)</li>
        <li><strong>Deployment:</strong> Vercel</li>
        <li><strong>Other:</strong> Framer Motion for animations, EmailJS for contact form</li>
      </ul>
      <h3>What I Learned</h3>
      <ul>
        <li>Best practices in modern frontend development</li>
        <li>UI/UX design for personal branding</li>
        <li>Performance optimization and accessibility</li>
        <li>SEO strategies for personal websites</li>
      </ul>`,
    technologies: [
      "Next.js",
      "React",
      "Tailwind CSS",
      "Framer Motion",
      "NodeMailer",
    ],
    imageUrl: "/portfolio_proj.png",
    dataAiHint: "personal portfolio website screenshot",
    videoUrl: "",
    githubUrl: "https://github.com/Mutiur03/Portfolio",
    liveUrl: "https://www.mutiurrahman.com/",
    category: "website",
    galleryImages: [
      { url: "/portfolio/portfolio_1.png" },
      { url: "/portfolio/portfolio_2.png" },
      { url: "/portfolio/portfolio_3.png" },
      { url: "/portfolio/portfolio_4.png" },
      { url: "/portfolio/portfolio_5.png" },
      { url: "/portfolio/portfolio_6.png" },
      { url: "/portfolio/portfolio_7.png" },
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
