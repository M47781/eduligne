import { mockCourses, mockQuizzes, mockNotifications, mockLeaderboard, mockMessages, mockBlogPosts, mockBilling, mockChildren, mockCertificates, mockAdminUsers } from "./mockData";
import type { Course, Quiz, Notification, LeaderboardEntry, Message, BlogPost, BillingRecord, ChildProfile, Certificate } from "./types";

const delay = (ms = 500) => new Promise((r) => setTimeout(r, ms));

// ─── Courses ─────────────────────────────────────────────────────────────────
export const getCourses = async (): Promise<Course[]> => { await delay(400); return mockCourses; };
export const getCourseById = async (id: number): Promise<Course | undefined> => { await delay(300); return mockCourses.find((c) => c.id === id); };

// ─── Quizzes ─────────────────────────────────────────────────────────────────
export const getQuizzes = async (): Promise<Quiz[]> => { await delay(300); return mockQuizzes; };
export const getQuizById = async (id: number): Promise<Quiz | undefined> => { await delay(300); return mockQuizzes.find((q) => q.id === id); };

// ─── Notifications ───────────────────────────────────────────────────────────
export const getNotifications = async (): Promise<Notification[]> => { await delay(200); return [...mockNotifications]; };
export const markNotificationRead = async (id: number): Promise<void> => { await delay(100); const n = mockNotifications.find((x) => x.id === id); if (n) n.isRead = true; };

// ─── Leaderboard ─────────────────────────────────────────────────────────────
export const getLeaderboard = async (): Promise<LeaderboardEntry[]> => { await delay(400); return mockLeaderboard; };

// ─── Messages ────────────────────────────────────────────────────────────────
export const getMessages = async (): Promise<Message[]> => { await delay(300); return mockMessages; };
export const sendMessage = async (content: string): Promise<Message> => { await delay(300); const msg: Message = { id: Date.now(), senderId: "u1", senderName: "أنت", senderAvatar: "", content, timestamp: new Date().toISOString(), isRead: true }; return msg; };

// ─── Blog ────────────────────────────────────────────────────────────────────
export const getBlogPosts = async (): Promise<BlogPost[]> => { await delay(400); return mockBlogPosts; };
export const getBlogPostById = async (id: number): Promise<BlogPost | undefined> => { await delay(300); return mockBlogPosts.find((p) => p.id === id); };

// ─── Billing ─────────────────────────────────────────────────────────────────
export const getBillingRecords = async (): Promise<BillingRecord[]> => { await delay(300); return mockBilling; };

// ─── Children ────────────────────────────────────────────────────────────────
export const getChildren = async (): Promise<ChildProfile[]> => { await delay(300); return mockChildren; };
export const getChildById = async (id: number): Promise<ChildProfile | undefined> => { await delay(300); return mockChildren.find((c) => c.id === id); };

// ─── Certificates ────────────────────────────────────────────────────────────
export const getCertificates = async (): Promise<Certificate[]> => { await delay(300); return mockCertificates; };

// ─── Admin Users ─────────────────────────────────────────────────────────────
export const getAdminUsers = async () => { await delay(400); return mockAdminUsers; };
export const getAdminUserById = async (id: string) => { await delay(300); return mockAdminUsers.find((u) => u.id === id); };

// ─── AI Chat (simulated) ────────────────────────────────────────────────────
export const getAIResponse = async (message: string): Promise<string> => {
  await delay(1000);
  const responses = [
    "سؤال ممتاز! بناءً على ما تعلمته، أنصحك بمراجعة الدرس الثالث من الدورة الحالية.",
    "هذا موضوع مهم جداً. دعني أشرح لك بطريقة مبسطة...",
    "أحسنت! يمكنك تطبيق هذا المفهوم في المشروع العملي القادم.",
    "لفهم هذا المفهوم بشكل أعمق، أنصحك بحل التمارين في نهاية الفصل.",
    "يبدو أنك تتقدم بشكل رائع! استمر في هذا المسار.",
  ];
  return responses[Math.floor(Math.random() * responses.length)];
};

// ─── Video Progress ──────────────────────────────────────────────────────────
export const getVideoProgress = (lessonId: number): number => {
  try { const data = localStorage.getItem(`video_progress_${lessonId}`); return data ? parseFloat(data) : 0; } catch { return 0; }
};
export const saveVideoProgress = (lessonId: number, progress: number): void => {
  try { localStorage.setItem(`video_progress_${lessonId}`, progress.toString()); } catch { /* ignore */ }
};
