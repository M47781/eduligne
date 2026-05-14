// ─── User & Auth Types ───────────────────────────────────────────────────────

export type UserRole = "student" | "teacher" | "parent" | "admin";

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar: string;
  phone?: string;
  subscription: "free" | "pro";
  xp: number;
  level: number;
  badges: string[];
  createdAt: string;
}

// ─── Course Types ────────────────────────────────────────────────────────────

export interface Course {
  id: number;
  title: string;
  instructor: string;
  instructorAvatar: string;
  rating: number;
  students: number;
  duration: string;
  price: string;
  image: string;
  category: string;
  level: string;
  description: string;
  lessons: Lesson[];
  progress?: number;
}

export interface Lesson {
  id: number;
  title: string;
  duration: string;
  videoUrl?: string;
  completed: boolean;
}

// ─── Quiz Types ──────────────────────────────────────────────────────────────

export interface Quiz {
  id: number;
  title: string;
  courseId: number;
  questions: QuizQuestion[];
  timeLimit: number; // minutes
  passingScore: number;
}

export interface QuizQuestion {
  id: number;
  text: string;
  options: string[];
  correctAnswer: number;
}

// ─── Certificate Types ───────────────────────────────────────────────────────

export interface Certificate {
  id: string;
  courseId: number;
  courseTitle: string;
  studentName: string;
  completionDate: string;
  grade: string;
}

// ─── Notification Types ──────────────────────────────────────────────────────

export interface Notification {
  id: number;
  title: string;
  description: string;
  type: "info" | "success" | "warning" | "urgent";
  isRead: boolean;
  createdAt: string;
  userId: string;
}

// ─── Message Types ───────────────────────────────────────────────────────────

export interface Message {
  id: number;
  senderId: string;
  senderName: string;
  senderAvatar: string;
  content: string;
  timestamp: string;
  isRead: boolean;
}

// ─── Leaderboard Types ───────────────────────────────────────────────────────

export interface LeaderboardEntry {
  rank: number;
  userId: string;
  name: string;
  avatar: string;
  xp: number;
  level: number;
  badges: number;
}

// ─── Blog Types ──────────────────────────────────────────────────────────────

export interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  authorAvatar: string;
  image: string;
  category: string;
  date: string;
  readTime: string;
}

// ─── Billing Types ───────────────────────────────────────────────────────────

export interface BillingRecord {
  id: string;
  date: string;
  amount: string;
  description: string;
  status: "paid" | "pending" | "failed";
}

// ─── Child (Parent Dashboard) ────────────────────────────────────────────────

export interface ChildProfile {
  id: number;
  name: string;
  grade: string;
  avatar: string;
  progress: number;
  attendance: number;
  lastGrade: string;
  nextExam: string;
  status: string;
  courses: { name: string; progress: number; grade: string }[];
}

// ─── Admin Report Types ──────────────────────────────────────────────────────

export interface AdminReport {
  id: string;
  title: string;
  type: "users" | "revenue" | "engagement" | "content";
  period: string;
  data: Record<string, number>;
}
