/**
 * Navigation Link
 */
export interface NavLink {
  label: string;
  href: string;
  description?: string;
}

/**
 * Dropdown Navigation Item
 */
export interface DropdownNavItem {
  label: string;
  items: NavLink[];
}

/**
 * Position types for maritime roles
 */
export type Position = "kaptein" | "styrmann" | "maskinist" | "eto" | "matros" | "kokk";

/**
 * Job Position (for future job board)
 */
export interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  type: "full-time" | "part-time" | "contract" | "temporary";
  salary?: {
    min: number;
    max: number;
    currency: "NOK";
  };
  description: string;
  requirements: string[];
  certificates: string[];
  experience: number; // Years of experience required
  postedAt: Date;
  expiresAt: Date;
  contactEmail: string;
  featured?: boolean;
}

/**
 * Job Application Status
 */
export type ApplicationStatus =
  | "draft"
  | "submitted"
  | "under_review"
  | "interview"
  | "accepted"
  | "rejected";

/**
 * Job Application (for future applicant tracking)
 */
export interface JobApplication {
  id: string;
  jobId: string;
  applicant: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    dateOfBirth: string;
    nationality: string;
  };
  certificates: string[];
  experience: number;
  availability: Date;
  cvUrl: string;
  coverLetter?: string;
  status: ApplicationStatus;
  submittedAt: Date;
  updatedAt: Date;
}

/**
 * Contact Form Submission
 */
export interface ContactSubmission {
  id: string;
  name: string;
  email: string;
  phone?: string;
  company?: string;
  message: string;
  submittedAt: Date;
  status: "new" | "read" | "responded";
}

/**
 * Statistics (for homepage)
 */
export interface Statistic {
  value: string | number;
  label: string;
  suffix?: string;
  prefix?: string;
}

/**
 * Feature Card
 */
export interface Feature {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
}

/**
 * Testimonial
 */
export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  content: string;
  avatar?: string;
  rating?: number;
}

/**
 * SEO Meta Props
 */
export interface SEOProps {
  title: string;
  description: string;
  keywords?: string[];
  ogImage?: string;
  canonicalUrl?: string;
}

/**
 * FAQ Item (for FAQ sections and schema markup)
 */
export interface FAQItem {
  question: string;
  answer: string;
}
