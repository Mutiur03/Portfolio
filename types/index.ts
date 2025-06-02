export interface Project {
  id: string;
  title: string;
  slug: string;
  shortDescription: string;
  longDescription: string;
  technologies: string[];
  imageUrl: string;
  dataAiHint?: string;
  category: "web" | "website" | "mobile" | "saas" | "game";
  videoUrl?: string;
  githubUrl?: string;
  liveUrl?: string;
  galleryImages?: { url: string; dataAiHint?: string }[];
}

export interface Testimonial {
  id: string;
  quote: string;
  author: string;
  company?: string;
  avatarUrl?: string;
  dataAiHint?: string;
}
