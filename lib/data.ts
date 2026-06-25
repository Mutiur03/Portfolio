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
    category: "web",
    videoUrl: "https://www.youtube.com/embed/AvoooD7cLzQ?si=PKARw4xVJ7nX34Ul",
    githubUrl: "https://github.com/Mutiur03/Fundit",
    liveUrl: [{ title: "Main Site", url: "https://fundit.mutiurrahman.com/" }],
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
      "A live, production school management platform handling admissions, academics, attendance, and communication for a real institution.",
    longDescription: `
  <h2>School Management System — Full-Stack Web Application</h2>
  <p>
    A complete school management platform built to digitize and streamline core school operations, currently live in production for a real institution at lbphs.gov.bd. It supports academic, administrative, and communication workflows for students, teachers, and administrators end-to-end.
  </p>
  <h3>Project Purpose</h3>
  <p>
    The goal is to minimize manual paperwork, enable transparent record tracking, and provide real-time management of academic and administrative processes — from a student's first admission form to their final report card.
  </p>
  <h3>Main Features</h3>
  <ul>
    <li>Student Management: Add, update, and manage student profiles, academic info, and images.</li>
    <li>Teacher Management: Manage faculty profiles, subject assignments, and permissions.</li>
    <li>Subject & Exam Management: Create/import subjects, schedule exams, input/edit marks, calculate GPA/grades.</li>
    <li>Automated Result Engine: Generate class-wide merit lists and auto-promote students by computing final merit, next-year roll, and next-year section.</li>
    <li>Marksheet & Reports: Auto-generate PDF marksheets, downloadable/printable report cards and routines via server-side Puppeteer rendering.</li>
    <li>Online Admission System: Public admission forms with merit/waiting-list processing and grade-specific registration flows for Class 6, Class 8, and SSC.</li>
    <li>SMS Alerts: Automatic, templated attendance notifications to parents, with delivery status and cost tracking from the dashboard.</li>
    <li>Attendance & Promotion: Record attendance, filter by class/date, analyze trends, promote students based on performance.</li>
    <li>Notice Board: Post notices with PDF attachments, preview/download files, simple notice management.</li>
    <li>Gallery & Event Management: Create events, upload media, approve/publish student submissions.</li>
    <li>Alumni Management: Transition graduated students to alumni records to preserve institutional history.</li>
    <li>Authentication & Security: JWT login, role-based access control, file validation, route protection.</li>
    <li>Bulk Import: Excel-based bulk student and subject import.</li>
    <li>Google Sheets Integration: Sync academic data for staff who prefer working in spreadsheets.</li>
  </ul>
  <h3>Tech Stack</h3>
  <ul>
    <li><strong>Frontend:</strong> React, Vite, Tailwind CSS, Zustand, Framer Motion, Shadcn UI</li>
    <li><strong>Backend:</strong> Node.js with Express</li>
    <li><strong>Database:</strong> PostgreSQL managed with Prisma ORM</li>
    <li><strong>Background Jobs:</strong> Bull + Redis for asynchronous SMS dispatch and image processing</li>
    <li><strong>Authentication:</strong> JWT-based authentication with protected routes and role-based logic</li>
    <li><strong>File Handling:</strong> Multer for file uploads; AWS S3 / Cloudflare R2 for storage with Cloudinary for image optimization</li>
    <li><strong>PDF Reports:</strong> Puppeteer for server-side PDF rendering and formatting</li>
    <li><strong>Excel Handling:</strong> xlsx library for importing bulk data such as subjects and students</li>
  </ul>
  <h3>System Architecture</h3>
  <p>
    Modular RESTful API, scalable deployment, external service integration, client-server separation, secure authentication, type-safe data modeling.
  </p>
  <h3>What I Learned</h3>
  <ul>
    <li>Built a full-stack application from scratch with production-level features, now serving a real school</li>
    <li>Designed an automated promotion/merit engine that has to be correct — there's no room for error in student results</li>
    <li>Implemented complex role-based access controls for secure feature isolation</li>
    <li>Created dynamic and printable PDF reports using headless browsers</li>
    <li>Optimized database schemas for performance and clarity using Prisma ORM</li>
    <li>Handled real-world problems such as bulk data import, file validation, SMS delivery tracking, and asynchronous processes</li>
  </ul>
  `,
    technologies: [
      "React",
      "Express",
      "PostgreSQL",
      "Docker",
      "Redis",
      "Bull",
      "TypeScript",
      "Tailwind CSS",
      "Shadcn",
      "Node.js",
      "Prisma",
      "JWT",
      "Google API",
      "Puppeteer",
      "Multer",
      "xlsx",
      "Zustand",
      "Framer Motion",
      "Cloudinary",
      "AWS S3",
      "Cloudflare R2",
      "REST API",
    ],
    imageUrl: "/school_proj.png",
    category: "web",
    videoUrl: "https://www.youtube.com/embed/EIk6t_aUbpY?si=L3yqah_jcltEogVD",
    githubUrl: "https://github.com/Mutiur03/School",
    liveUrl: [
      {
        title: "Public Site",
        url: "https://lbphs.gov.bd/",
      },
    ],
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
    title: "Karubid",
    slug: "karubid",
    shortDescription:
      "Multi-service platform for Interior, Cleaning, and Technical Solutions.",
    longDescription: `
<h2>Karubid — Multi-Service Business Platform</h2>
<p>
Karubid is a comprehensive web platform designed for a Bangladesh-based company offering premium interior design, cleaning, and technical services. The site showcases service details, team expertise, project portfolios, and client testimonials, all with a modern, responsive UI.
</p>
<h3>Features</h3>
<ul>
<li>Service Pages: Dedicated sections for Interior, Cleaning, and Technical services, each with detailed offerings, process steps, and pricing packages.</li>
<li>Portfolio: Interactive galleries for before/after transformations and completed projects.</li>
<li>Team Showcase: Highlighting key team members and their expertise.</li>
<li>Testimonials: Rotating client reviews with ratings and company info.</li>
<li>Consultation Modal: Multi-step form for booking free consultations, with service-specific options.</li>
<li>Animated UI: Framer Motion-powered transitions and interactive elements.</li>
<li>State Management: Zustand store for dynamic stats and modal control.</li>
<li>Eco-Friendly Commitment: Dedicated section for sustainability initiatives.</li>
</ul>
<h3>Tech Stack</h3>
<ul>
<li><strong>Frontend:</strong> React, TypeScript, Vite, Tailwind CSS, Zustand, Framer Motion, Shadcn UI</li>
<li><strong>Icons:</strong> Lucide React</li>
<li><strong>State:</strong> Zustand for global store</li>
<li><strong>Design:</strong> Responsive, accessible, and visually rich UI</li>
</ul>
<h3>What I Learned</h3>
<ul>
<li>Building a multi-service business site with modular, reusable components</li>
<li>Advanced UI/UX design for service-based businesses</li>
<li>Integrating animated transitions and interactive galleries</li>
<li>Managing global state for dynamic stats and modals</li>
<li>Designing scalable data structures for service offerings and team info</li>
</ul>
`,
    technologies: [
      "React",
      "TypeScript",
      "Tailwind CSS",
      "Zustand",
      "Framer Motion",
      "Shadcn UI",
      "Lucide React",
    ],
    imageUrl: "/karubid_main.png",
    category: "website",
    videoUrl: "",
    githubUrl: "https://github.com/Mutiur03/Karubid",
    liveUrl: [{ title: "Main Site", url: "https://www.karubidtech.com/" }],
    galleryImages: [
      { url: "/karubid/karubid_1.jpg" },
      { url: "/karubid/karubid_2.png" },
      { url: "/karubid/karubid_3.jpg" },
      { url: "/karubid/karubid_4.png" },
      { url: "/karubid/karubid_5.png" },
      { url: "/karubid/karubid_6.png" },
      { url: "/karubid/karubid_7.png" },
      { url: "/karubid/karubid_8.png" },
      { url: "/karubid/karubid_9.png" },
      { url: "/karubid/karubid_10.png" },
      { url: "/karubid/karubid_11.png" },
      { url: "/karubid/karubid_12.png" },
      { url: "/karubid/karubid_13.png" },
      { url: "/karubid/karubid_14.png" },
      { url: "/karubid/karubid_15.png" },
      { url: "/karubid/karubid_16.png" },
      { url: "/karubid/karubid_17.png" },
      { url: "/karubid/karubid_18.png" },
      { url: "/karubid/karubid_19.png" },
    ],
  },
  {
    id: "4",
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
    category: "website",
    videoUrl: "",
    githubUrl: "https://github.com/Mutiur03/Portfolio",
    liveUrl: [{ title: "Main Site", url: "https://www.mutiurrahman.com/" }],
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
//   {
//     id: "5",
//     title: "Altura Call Automation",
//     slug: "altura-call-automation",
//     shortDescription:
//       "AI-powered voice agent platform for automated outbound and inbound call workflows.",
//     longDescription: `
// <h2>Altura Call Automation — AI Voice Agent Platform</h2>
// <p>
// A client project (Alturavent) delivering an end-to-end, multi-tenant call automation system powered by Vapi voice AI agents. The platform orchestrates conversational flows, call routing, billing, and backend services across a Turborepo monorepo architecture. Specific client implementation details are kept general here out of respect for client confidentiality.
// </p>
// <h3>Features</h3>
// <ul>
// <li>AI voice agents for automated call handling and configurable conversation flows</li>
// <li>NestJS backend services for multi-tenant call orchestration, billing, and webhook handling</li>
// <li>Next.js frontend for agent configuration, call analytics, and account management</li>
// <li>Monorepo structure with shared packages and coordinated deployments</li>
// <li>Extensible pipeline for connecting telephony providers and AI models</li>
// </ul>
// <h3>Tech Stack</h3>
// <ul>
// <li><strong>Monorepo:</strong> Turborepo</li>
// <li><strong>Backend:</strong> NestJS, TypeScript, Drizzle ORM</li>
// <li><strong>Frontend:</strong> Next.js, React</li>
// <li><strong>AI:</strong> Vapi voice agents</li>
// <li><strong>Billing:</strong> Stripe</li>
// </ul>
// <h3>What I Learned</h3>
// <ul>
// <li>Integrating real-time voice AI into production backend services</li>
// <li>Structuring multi-app, multi-tenant monorepos with Turborepo for client deliverables</li>
// <li>Designing webhook-driven architectures for telephony and conversational AI</li>
// </ul>
// `,
//     technologies: [
//       "NestJS",
//       "Next.js",
//       "Turborepo",
//       "TypeScript",
//       "Vapi",
//       "React",
//       "Drizzle ORM",
//       "Stripe",
//       "REST API",
//     ],
//     imageUrl: "/projects/placeholder-cover.svg",
//     category: "saas",
//     videoUrl: "",
//     githubUrl: "https://github.com/Mutiur03/call-automation",
//   },
  {
    id: "6",
    title: "Printing Kiosk",
    slug: "printing-kiosk",
    shortDescription:
      "Self-service printing platform with bKash payment integration, splitting a central job server from a user-facing web dashboard.",
    longDescription: `
<h2>Printing Kiosk — Document Printing Platform</h2>
<p>
A client project building a printing-kiosk system split into two independently deployable pieces: a central management server that handles the job queue, payments, and token generation, and a user-facing web dashboard where customers upload documents, choose print options, and pay before printing.
</p>
<h3>Features</h3>
<ul>
<li>Document upload and print-option selection through a React dashboard</li>
<li>bKash payment integration for Bangladesh mobile financial services</li>
<li>Centralized print job queue and token generation handled server-side</li>
<li>Clerk-based authentication for the user dashboard</li>
<li>Dockerized PostgreSQL backend with Alembic-managed schema migrations</li>
</ul>
<h3>Tech Stack</h3>
<ul>
<li><strong>Backend:</strong> FastAPI, PostgreSQL (Docker), SQLAlchemy, Alembic</li>
<li><strong>Frontend:</strong> React, TypeScript, Vite, Tailwind CSS, Clerk (Auth)</li>
<li><strong>Payments:</strong> bKash API integration</li>
</ul>
<h3>What I Learned</h3>
<ul>
<li>Integrating a local payment gateway (bKash) into a transactional job queue</li>
<li>Designing a token-based handoff between a web dashboard and physical print hardware</li>
<li>Splitting a client system into independently deployable server and dashboard services</li>
</ul>
`,
    technologies: [
      "FastAPI",
      "PostgreSQL",
      "SQLAlchemy",
      "Alembic",
      "React",
      "TypeScript",
      "Vite",
      "Tailwind CSS",
      "Clerk",
      "bKash",
    ],
    imageUrl: "/projects/placeholder-cover.svg",
    category: "web",
    videoUrl: "",
    githubUrl: "https://github.com/Mutiur03/Printing-kiosk",
  },
//   {
//     id: "7",
//     title: "OneSource Platform",
//     slug: "one-source",
//     shortDescription:
//       "Multi-tenant analytics platform unifying e-commerce and marketing data across a Turborepo monorepo.",
//     longDescription: `
// <h2>OneSource — Multi-Tenant Analytics Platform</h2>
// <p>
// A client project (Alturavent) delivering a multi-tenant SaaS platform that unifies e-commerce and marketing analytics across 13+ third-party integrations (Shopify, WooCommerce, Google/Meta/TikTok/Amazon Ads, GA4, HubSpot, and more) into a single dashboard. Built as a Turborepo monorepo spanning a NestJS API, a Vue storefront, a React marketing site, and a Python AI microservice. Specific client implementation details are kept general here out of respect for client confidentiality.
// </p>
// <h3>Features</h3>
// <ul>
// <li>Multi-tenant architecture with isolated data per company and configurable workspaces</li>
// <li>NestJS backend services for analytics pipelines, integrations, and tenant management</li>
// <li>Vue and React frontends tailored to different user roles and dashboards</li>
// <li>AI-generated insights and reporting powered by an integrated language model</li>
// <li>Shared packages for types, utilities, and API clients across apps</li>
// </ul>
// <h3>Tech Stack</h3>
// <ul>
// <li><strong>Monorepo:</strong> Turborepo</li>
// <li><strong>Backend:</strong> NestJS, TypeORM, TypeScript</li>
// <li><strong>Frontends:</strong> Vue 3, React</li>
// <li><strong>AI Microservice:</strong> Python</li>
// <li><strong>Architecture:</strong> Multi-tenant SaaS</li>
// </ul>
// <h3>What I Learned</h3>
// <ul>
// <li>Designing tenant isolation strategies for analytics platforms at scale</li>
// <li>Coordinating multiple frontend frameworks within a single monorepo</li>
// <li>Building modular NestJS services that aggregate many third-party data sources reliably</li>
// </ul>
// `,
//     technologies: [
//       "Turborepo",
//       "NestJS",
//       "TypeORM",
//       "Vue",
//       "React",
//       "TypeScript",
//       "Python",
//       "REST API",
//     ],
//     imageUrl: "/projects/placeholder-cover.svg",
//     category: "saas",
//     videoUrl: "",
//     githubUrl: "https://github.com/Mutiur03/one-source",
//   },
  {
    id: "8",
    title: "Observa",
    slug: "observa",
    shortDescription:
      "An open-source, self-hosted observability platform for tracking errors, events, requests, and uptime.",
    longDescription: `
<h2>Observa — Self-Hosted Observability Platform</h2>
<p>
Observa is an open-source, self-hosted observability and analytics platform for product and engineering teams — tracking frontend users, backend requests, errors, sessions, custom events, background jobs, webhooks, and API uptime in a single dashboard.
</p>
<h3>Features</h3>
<ul>
<li>Organization and project management with public/secret API keys per project</li>
<li>SDK-facing ingestion endpoints for events, errors, requests, sessions, jobs, and webhooks</li>
<li>Dashboard APIs for overview metrics, error lists, API request logs, sessions, and user timelines</li>
<li>API uptime monitoring with stored historical checks</li>
<li>Alert rules for error thresholds, monitor downtime, slow endpoints, and failed jobs/webhooks</li>
<li>Minimal JavaScript and Python SDKs for easy integration into other apps</li>
</ul>
<h3>Tech Stack</h3>
<ul>
<li><strong>Backend:</strong> FastAPI, SQLAlchemy, Alembic, PostgreSQL</li>
<li><strong>Frontend:</strong> Next.js, React, TypeScript, Tailwind CSS</li>
<li><strong>Auth:</strong> JWT for the dashboard, scoped API keys for ingestion</li>
<li><strong>Infra:</strong> Docker Compose, Redis-ready queue/realtime hooks</li>
</ul>
<h3>What I Learned</h3>
<ul>
<li>Designing ingestion APIs that need to handle high write volume from many SDKs at once</li>
<li>Structuring a FastAPI backend with clear API/service/repository layering</li>
<li>Building SDKs simple enough for other developers to drop into their own apps</li>
</ul>
`,
    technologies: [
      "FastAPI",
      "Next.js",
      "React",
      "TypeScript",
      "PostgreSQL",
      "SQLAlchemy",
      "Redis",
      "Docker",
      "JWT",
    ],
    imageUrl: "/projects/placeholder-cover.svg",
    category: "saas",
    videoUrl: "",
    githubUrl: "https://github.com/Mutiur03/observa",
    liveUrl: [
      { title: "Live Demo", url: "https://observa-seven.vercel.app" },
    ],
  },
  {
    id: "9",
    title: "QSync",
    slug: "qsync",
    shortDescription:
      "Healthcare queue management built twice — as an Android app and as a JavaFX desktop app.",
    longDescription: `
<h2>QSync — Healthcare Queue Management (Android + Desktop)</h2>
<p>
QSync tackles the same healthcare queue-management problem through two independent client implementations: an Android app for patients and on-the-go staff, and a separate JavaFX desktop app for clinic front-desk workstations. Each has its own backend and data layer.
</p>
<h3>Android App</h3>
<ul>
<li>Dual-portal experience (patient + admin) built in Java with Fragment-based navigation and MVVM.</li>
<li>Priority-based queuing (Normal/Urgent/Emergency) with live, expandable admin queue views.</li>
<li>Firebase Authentication and Realtime Database for role-based access and live sync.</li>
</ul>
<h3>Desktop App (JavaFX)</h3>
<ul>
<li>Separate Java/JavaFX desktop client for clinic admin and front-desk workstations, backed by a local SQLite database via the DAO pattern.</li>
<li>Tree-view live queue monitoring, full CRUD for departments/doctors/users, and built-in reporting views.</li>
<li>Session-based authentication with a service layer separating business logic from data access.</li>
</ul>
<h3>What I Learned</h3>
<ul>
<li>Solving the same domain problem across genuinely different platforms (mobile vs. desktop) and backends (Firebase vs. SQLite)</li>
<li>Modeling priority-queue logic and live status transitions consistently across both implementations</li>
<li>Structuring desktop apps with DAO/service layering vs. mobile apps with MVVM</li>
</ul>
`,
    technologies: [
      "Java",
      "Android SDK",
      "Firebase Authentication",
      "Firebase Realtime Database",
      "JavaFX",
      "SQLite",
      "Maven",
      "MVVM",
    ],
    imageUrl: "/projects/placeholder-cover.svg",
    category: "mobile",
    videoUrl: "",
    githubUrl: "https://github.com/Mutiur03/QSync_2207097_Android",
    liveUrl: [
      {
        title: "Desktop App (JavaFX)",
        url: "https://github.com/Mutiur03/QSync_2207097_Desktop",
      },
    ],
  },
  {
    id: "10",
    title: "Hall Management",
    slug: "hall-management",
    shortDescription:
      "Academic hall management system for student housing allocation and administration.",
    longDescription: `
<h2>Hall Management — Student Housing Administration</h2>
<p>
An academic web application built with Laravel 12 for managing university hall operations, including room allocation, student records, and administrative workflows for residential facilities.
</p>
<h3>Features</h3>
<ul>
<li>Student and room record management with allocation tracking</li>
<li>Administrative dashboards for hall officers and staff</li>
<li>Application and approval workflows for room assignments</li>
<li>Role-based access for students, hall admins, and system operators</li>
</ul>
<h3>Tech Stack</h3>
<ul>
<li><strong>Framework:</strong> Laravel 12, PHP</li>
<li><strong>Database:</strong> SQLite (local dev)</li>
<li><strong>Frontend:</strong> Blade templates, Vite, Tailwind CSS</li>
</ul>
<h3>What I Learned</h3>
<ul>
<li>Modeling academic housing domains with Laravel Eloquent relationships</li>
<li>Implementing approval workflows for institutional data management</li>
<li>Building secure CRUD systems within a coursework timeline</li>
</ul>
`,
    technologies: ["Laravel", "PHP", "SQLite", "Blade", "Vite", "Tailwind CSS"],
    imageUrl: "/projects/placeholder-cover.svg",
    category: "web",
    videoUrl: "",
    githubUrl: "https://github.com/Mutiur03/CSE3120_Hall_Management",
  },
  {
    id: "11",
    title: "ScrumLab",
    slug: "scrumlab",
    shortDescription:
      "Agile project management platform for academic team collaboration and sprint tracking.",
    longDescription: `
<h2>ScrumLab — Agile Project Management Platform</h2>
<p>
An academic Laravel application for managing agile software projects with sprint boards, backlog management, and team collaboration features. Developed as part of a software project management coursework module.
</p>
<h3>Features</h3>
<ul>
<li>Database-backed authentication with password reset flow</li>
<li>Sprint planning with backlog grooming and task assignment</li>
<li>Kanban-style boards for tracking work in progress</li>
<li>Team member roles and project workspace management</li>
</ul>
<h3>Tech Stack</h3>
<ul>
<li><strong>Framework:</strong> Laravel, PHP</li>
<li><strong>Database:</strong> MySQL</li>
<li><strong>Frontend:</strong> Blade templates, JavaScript</li>
</ul>
<h3>What I Learned</h3>
<ul>
<li>Translating Scrum ceremonies into software workflows and data models</li>
<li>Building collaborative project tools with role-based permissions</li>
<li>Applying agile principles through full-stack Laravel development</li>
</ul>
`,
    technologies: ["Laravel", "PHP", "MySQL", "Blade", "JavaScript"],
    imageUrl: "/projects/placeholder-cover.svg",
    category: "web",
    videoUrl: "",
    githubUrl:
      "https://github.com/Mutiur03/CSE3110_Project_Management_2207097",
  },
  {
    id: "12",
    title: "Research & Thesis Management",
    slug: "research-thesis-management",
    shortDescription:
      "Academic platform for managing research proposals, thesis submissions, and faculty reviews.",
    longDescription: `
<h2>Research & Thesis Management — Academic Research Platform</h2>
<p>
A Laravel-based academic platform for streamlining research and thesis workflows at the university level. Supports proposal submission, advisor assignment, review cycles, and progress tracking for graduate research.
</p>
<h3>Features</h3>
<ul>
<li>Research proposal submission and document upload workflows</li>
<li>Faculty advisor assignment and review feedback loops</li>
<li>Thesis milestone tracking from proposal to final submission</li>
<li>Role-based portals for students, advisors, and administrators</li>
</ul>
<h3>Tech Stack</h3>
<ul>
<li><strong>Framework:</strong> Laravel, PHP</li>
<li><strong>Database:</strong> MySQL</li>
<li><strong>Frontend:</strong> Blade templates, Bootstrap</li>
</ul>
<h3>What I Learned</h3>
<ul>
<li>Modeling multi-stage academic approval pipelines in web applications</li>
<li>Designing document-centric workflows for research administration</li>
<li>Building institutional platforms with Laravel's authentication and policies</li>
</ul>
`,
    technologies: ["Laravel", "PHP", "MySQL", "Blade", "Bootstrap"],
    imageUrl: "/projects/placeholder-cover.svg",
    category: "web",
    videoUrl: "",
    githubUrl:
      "https://github.com/Mutiur03/CSE3100_Research_and_Thesis_Management_Platform_2207097",
  },
  {
    id: "13",
    title: "Bit2Byte",
    slug: "bit2byte",
    shortDescription:
      "Club website for a university computing organization with events, members, and resources.",
    longDescription: `
<h2>Bit2Byte — University Computing Club Website</h2>
<p>
An academic club website built with PHP and MySQL to showcase a university computing organization's events, membership, and resources. Provides a public-facing portal for community engagement and club administration.
</p>
<h3>Features</h3>
<ul>
<li>Event listings and announcements for club activities</li>
<li>Member profiles and organizational structure pages</li>
<li>Resource sections for tutorials, links, and club materials</li>
<li>Admin panel for content updates and member management</li>
</ul>
<h3>Tech Stack</h3>
<ul>
<li><strong>Backend:</strong> PHP</li>
<li><strong>Database:</strong> MySQL</li>
<li><strong>Frontend:</strong> HTML, CSS, JavaScript</li>
</ul>
<h3>What I Learned</h3>
<ul>
<li>Building content-driven websites with classic LAMP stack patterns</li>
<li>Designing admin workflows for non-technical club organizers</li>
<li>Creating maintainable PHP applications for small organizational needs</li>
</ul>
`,
    technologies: ["PHP", "MySQL", "HTML", "CSS", "JavaScript"],
    imageUrl: "/projects/placeholder-cover.svg",
    category: "website",
    videoUrl: "",
    githubUrl: "https://github.com/Mutiur03/CSE3100_Bit2Byte_2207097",
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
