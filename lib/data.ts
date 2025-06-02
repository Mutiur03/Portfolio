import type { Project, Testimonial } from "@/types";

export const projectsData: Project[] = [
  {
    id: "1",
    title: "Fundit",
    slug: "fundit",
    shortDescription:
      "A full-featured online store with admin panel and payment integration.",
    longDescription:
      "This project involved building a scalable e-commerce solution from scratch. Key features include product management, user authentication, order processing, Stripe integration for payments, and a comprehensive admin dashboard for managing inventory and sales. The frontend was built with Next.js and Tailwind CSS for a responsive and modern user experience, while the backend utilized Node.js with Express and PostgreSQL.",
    technologies: [
      "Next.js",
      "Tailwind CSS",
      "Node.js",
      "Express",
      "PostgreSQL",
      "Stripe",
    ],
    imageUrl: "/bdapps_proj.png",
    dataAiHint: "online shopping",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ", // Placeholder video
    githubUrl: "https://github.com",
    liveUrl: "#",
    category: "web",
    galleryImages: [
      { url: "https://placehold.co/800x600.png", dataAiHint: "product page" },
      { url: "https://placehold.co/800x600.png", dataAiHint: "shopping cart" },
      {
        url: "https://placehold.co/800x600.png",
        dataAiHint: "admin dashboard",
      },
    ],
  },
  {
    id: "2",
    title: "Project Management Tool",
    slug: "project-management-tool",
    shortDescription:
      "A collaborative platform for managing tasks, deadlines, and team communication.",
    longDescription:
      "A web application designed to streamline project workflows. It offers features like task creation and assignment, progress tracking, real-time collaboration through comments and notifications, and file sharing. Built with React, Firebase for real-time database and authentication, and Material UI for the component library. Focused on intuitive UI/UX to enhance productivity.",
    technologies: ["React", "Firebase", "Material UI", "Node.js"],
    imageUrl: "https://placehold.co/600x400.png",
    dataAiHint: "team collaboration",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    githubUrl: "https://github.com",
    liveUrl: "#",
    category: "web",
    galleryImages: [
      { url: "https://placehold.co/800x600.png", dataAiHint: "task board" },
      {
        url: "https://placehold.co/800x600.png",
        dataAiHint: "dashboard analytics",
      },
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
    imageUrl: "https://placehold.co/600x400.png",
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
