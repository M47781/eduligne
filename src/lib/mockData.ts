import type { Course, Quiz, Notification, LeaderboardEntry, Message, BlogPost, BillingRecord, ChildProfile, Certificate } from "./types";

// ─── Mock Courses ────────────────────────────────────────────────────────────
export const mockCourses: Course[] = [
  { id: 1, title: "مقدمة في الجبر الخطي", instructor: "أحمد محمود", instructorAvatar: "Ahmed", rating: 4.8, students: 1200, duration: "12 ساعة", price: "مجاني", image: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&w=400&q=80", category: "رياضيات", level: "متوسط", description: "دورة شاملة في أساسيات الجبر الخطي تشمل المصفوفات والمحددات والفضاءات الشعاعية.", lessons: [{ id: 1, title: "مقدمة في المصفوفات", duration: "45 دقيقة", completed: true }, { id: 2, title: "عمليات المصفوفات", duration: "50 دقيقة", completed: true }, { id: 3, title: "المحددات", duration: "55 دقيقة", completed: false }, { id: 4, title: "الفضاءات الشعاعية", duration: "60 دقيقة", completed: false }], progress: 50 },
  { id: 2, title: "تطوير تطبيقات الويب الحديثة", instructor: "د. سارة علي", instructorAvatar: "Sara", rating: 4.9, students: 850, duration: "20 ساعة", price: "2500 د.ج", image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&w=400&q=80", category: "برمجة", level: "متقدم", description: "تعلم React و Next.js وبناء تطبيقات ويب احترافية من الصفر.", lessons: [{ id: 5, title: "مقدمة في React", duration: "40 دقيقة", completed: true }, { id: 6, title: "إدارة الحالة", duration: "55 دقيقة", completed: true }, { id: 7, title: "Next.js Routing", duration: "50 دقيقة", completed: true }, { id: 8, title: "Server Components", duration: "60 دقيقة", completed: false }], progress: 65 },
  { id: 3, title: "قواعد اللغة الإنجليزية", instructor: "كريم حسن", instructorAvatar: "Karim", rating: 4.7, students: 2100, duration: "15 ساعة", price: "1500 د.ج", image: "https://images.unsplash.com/photo-1546410531-bb4caa6b424d?auto=format&fit=crop&w=400&q=80", category: "لغات", level: "مبتدئ", description: "إتقان قواعد اللغة الإنجليزية من المستوى المبتدئ إلى المتقدم.", lessons: [{ id: 9, title: "الأزمنة الأساسية", duration: "35 دقيقة", completed: false }, { id: 10, title: "الجمل الشرطية", duration: "40 دقيقة", completed: false }], progress: 0 },
  { id: 4, title: "تجارب كيميائية ممتعة", instructor: "جون سميث", instructorAvatar: "John", rating: 4.6, students: 3400, duration: "8 ساعات", price: "مجاني", image: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=400&q=80", category: "علوم", level: "الكل", description: "اكتشف عالم الكيمياء من خلال تجارب عملية مثيرة.", lessons: [{ id: 11, title: "التفاعلات الكيميائية", duration: "30 دقيقة", completed: true }, { id: 12, title: "الحموض والقواعد", duration: "35 دقيقة", completed: false }], progress: 30 },
  { id: 5, title: "التفكير النقدي وحل المشكلات", instructor: "د. وائل أحمد", instructorAvatar: "Wael", rating: 4.8, students: 980, duration: "10 ساعات", price: "مجاني", image: "https://images.unsplash.com/photo-1546410531-bb4caa6b424d?auto=format&fit=crop&w=400&q=80", category: "تطوير ذاتي", level: "متوسط", description: "تعلم مهارات التفكير النقدي وتقنيات حل المشكلات.", lessons: [{ id: 13, title: "مبادئ التفكير النقدي", duration: "45 دقيقة", completed: false }], progress: 0 },
  { id: 6, title: "أساسيات البرمجة بلغة بايثون", instructor: "أ. خالد سعيد", instructorAvatar: "Khaled", rating: 4.7, students: 1650, duration: "18 ساعة", price: "2000 د.ج", image: "https://images.unsplash.com/photo-1516116216624-53e697fedbea?auto=format&fit=crop&w=400&q=80", category: "برمجة", level: "مبتدئ", description: "ابدأ رحلتك في البرمجة مع بايثون من الصفر.", lessons: [{ id: 14, title: "مقدمة في بايثون", duration: "40 دقيقة", completed: false }], progress: 0 },
];

// ─── Mock Quizzes ────────────────────────────────────────────────────────────
export const mockQuizzes: Quiz[] = [
  { id: 1, title: "اختبار الجبر الخطي", courseId: 1, timeLimit: 30, passingScore: 70, questions: [
    { id: 1, text: "ما هي المصفوفة الوحدة؟", options: ["مصفوفة كل عناصرها أصفار", "مصفوفة قطرية عناصر قطرها واحدات", "مصفوفة مربعة فقط", "مصفوفة عشوائية"], correctAnswer: 1 },
    { id: 2, text: "ما هو محدد المصفوفة 2×2؟", options: ["ad + bc", "ad - bc", "ac - bd", "ab - cd"], correctAnswer: 1 },
    { id: 3, text: "متى تكون المصفوفة قابلة للعكس؟", options: ["دائماً", "عندما يكون محددها صفر", "عندما يكون محددها غير صفري", "عندما تكون مربعة فقط"], correctAnswer: 2 },
  ]},
  { id: 2, title: "اختبار React الأساسي", courseId: 2, timeLimit: 20, passingScore: 60, questions: [
    { id: 4, text: "ما هو JSX؟", options: ["لغة برمجة جديدة", "امتداد لـ JavaScript يسمح بكتابة HTML", "مكتبة CSS", "قاعدة بيانات"], correctAnswer: 1 },
    { id: 5, text: "ما هو useState؟", options: ["دالة للتنقل", "هوك لإدارة الحالة المحلية", "مكتبة خارجية", "طريقة لجلب البيانات"], correctAnswer: 1 },
  ]},
];

// ─── Mock Notifications ──────────────────────────────────────────────────────
export const mockNotifications: Notification[] = [
  { id: 1, title: "موعد حصة مباشرة يقترب!", description: "تبدأ حصة الذكاء الاصطناعي خلال 30 دقيقة.", type: "urgent", isRead: false, createdAt: "2026-05-04T15:00:00", userId: "u1" },
  { id: 2, title: "تصحيح الاختبار متاح", description: "تم تصحيح اختبار الرياضيات. لقد حصلت على 18/20!", type: "success", isRead: false, createdAt: "2026-05-04T12:00:00", userId: "u1" },
  { id: 3, title: "مهمة من الأستاذ", description: "أضاف أستاذك واجباً جديداً في قسم الفيزياء.", type: "info", isRead: true, createdAt: "2026-05-03T09:00:00", userId: "u1" },
  { id: 4, title: "ترقية المستوى!", description: "مبروك! لقد وصلت إلى المستوى 12.", type: "success", isRead: true, createdAt: "2026-05-02T18:00:00", userId: "u1" },
];

// ─── Mock Leaderboard ────────────────────────────────────────────────────────
export const mockLeaderboard: LeaderboardEntry[] = [
  { rank: 1, userId: "u10", name: "يوسف العلي", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Youssef", xp: 12500, level: 15, badges: 22 },
  { rank: 2, userId: "u11", name: "فاطمة الزهراء", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Fatima", xp: 11200, level: 14, badges: 19 },
  { rank: 3, userId: "u12", name: "عمر بن خلدون", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Omar", xp: 10800, level: 13, badges: 17 },
  { rank: 4, userId: "u1", name: "أحمد بن علي", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Ahmed", xp: 8450, level: 12, badges: 15 },
  { rank: 5, userId: "u13", name: "مريم حسن", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Meriem", xp: 7800, level: 11, badges: 13 },
  { rank: 6, userId: "u14", name: "كريم محمدي", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=KarimM", xp: 6500, level: 10, badges: 11 },
  { rank: 7, userId: "u15", name: "نور الهدى", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Nour", xp: 5900, level: 9, badges: 9 },
  { rank: 8, userId: "u16", name: "إلياس بوزيد", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Ilyas", xp: 5200, level: 8, badges: 8 },
];

// ─── Mock Messages ───────────────────────────────────────────────────────────
export const mockMessages: Message[] = [
  { id: 1, senderId: "u2", senderName: "د. ليلى عمر", senderAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Leila", content: "مرحباً، لا تنسَ تسليم الواجب قبل نهاية الأسبوع.", timestamp: "2026-05-04T14:30:00", isRead: false },
  { id: 2, senderId: "u17", senderName: "أ. خالد سعيد", senderAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Khaled", content: "أحسنت في الاختبار الأخير! استمر بالعمل الجيد.", timestamp: "2026-05-03T10:00:00", isRead: true },
  { id: 3, senderId: "u3", senderName: "محمد الأمين", senderAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Mohamed", content: "هل يمكنني الاطلاع على تقرير أداء ابني هذا الشهر؟", timestamp: "2026-05-02T16:00:00", isRead: true },
];

// ─── Mock Blog Posts ─────────────────────────────────────────────────────────
export const mockBlogPosts: BlogPost[] = [
  { id: 1, title: "كيف تستفيد من الذكاء الاصطناعي في التعليم؟", excerpt: "اكتشف أحدث تقنيات AI المستخدمة في التعليم الحديث وكيف يمكنها تحسين تجربة التعلم.", content: "الذكاء الاصطناعي يغير وجه التعليم بشكل جذري...", author: "د. أحمد فؤاد", authorAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=DrAhmed", image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=800&q=80", category: "تكنولوجيا", date: "2026-04-28", readTime: "5 دقائق" },
  { id: 2, title: "أفضل 10 عادات دراسية للطلاب المتفوقين", excerpt: "تعرف على العادات التي يتبعها الطلاب الأكثر نجاحاً حول العالم.", content: "النجاح الأكاديمي ليس صدفة بل نتيجة عادات مدروسة...", author: "أ. سمية بن عمر", authorAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Soumia", image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=800&q=80", category: "نصائح", date: "2026-04-25", readTime: "7 دقائق" },
  { id: 3, title: "مشاريع STEM: لماذا هي مستقبل التعليم؟", excerpt: "تعلم كيف تجمع مشاريع STEM بين العلوم والتكنولوجيا والهندسة والرياضيات.", content: "مشاريع STEM تعزز التفكير النقدي والإبداع...", author: "م. ياسين حداد", authorAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Yassine", image: "https://images.unsplash.com/photo-1581092921461-eab62e97a780?auto=format&fit=crop&w=800&q=80", category: "STEM", date: "2026-04-20", readTime: "6 دقائق" },
];

// ─── Mock Billing ────────────────────────────────────────────────────────────
export const mockBilling: BillingRecord[] = [
  { id: "b1", date: "2026-05-01", amount: "2500 د.ج", description: "اشتراك شهري - باقة Pro", status: "paid" },
  { id: "b2", date: "2026-04-01", amount: "2500 د.ج", description: "اشتراك شهري - باقة Pro", status: "paid" },
  { id: "b3", date: "2026-03-01", amount: "2500 د.ج", description: "اشتراك شهري - باقة Pro", status: "paid" },
];

// ─── Mock Children (for parent) ──────────────────────────────────────────────
export const mockChildren: ChildProfile[] = [
  { id: 1, name: "أحمد محمد", grade: "الصف الأول المتوسط", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Ahmed", progress: 85, attendance: 95, lastGrade: "A", nextExam: "الرياضيات - غداً", status: "ممتاز", courses: [{ name: "الرياضيات", progress: 90, grade: "A" }, { name: "العلوم", progress: 80, grade: "B+" }, { name: "البرمجة", progress: 75, grade: "A-" }] },
  { id: 2, name: "سارة محمد", grade: "الصف الخامس الابتدائي", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sara", progress: 60, attendance: 80, lastGrade: "B+", nextExam: "العلوم - الأسبوع القادم", status: "جيد جداً", courses: [{ name: "الرياضيات", progress: 65, grade: "B+" }, { name: "اللغة العربية", progress: 70, grade: "A-" }] },
];

// ─── Mock Certificates ───────────────────────────────────────────────────────
export const mockCertificates: Certificate[] = [
  { id: "cert1", courseId: 4, courseTitle: "تجارب كيميائية ممتعة", studentName: "أحمد بن علي", completionDate: "2026-03-15", grade: "A" },
  { id: "cert2", courseId: 1, courseTitle: "مقدمة في الجبر الخطي", studentName: "أحمد بن علي", completionDate: "2026-02-20", grade: "A+" },
];

// ─── Mock Admin Users ────────────────────────────────────────────────────────
export const mockAdminUsers = [
  { id: "u1", name: "أحمد بن علي", email: "student@edu.dz", role: "student" as const, status: "active" as const, joinDate: "2025-09-01", lastActive: "2026-05-04" },
  { id: "u2", name: "د. ليلى عمر", email: "teacher@edu.dz", role: "teacher" as const, status: "active" as const, joinDate: "2025-08-15", lastActive: "2026-05-04" },
  { id: "u3", name: "محمد الأمين", email: "parent@edu.dz", role: "parent" as const, status: "active" as const, joinDate: "2025-10-01", lastActive: "2026-05-03" },
  { id: "u5", name: "عائشة بن يوسف", email: "aisha@edu.dz", role: "student" as const, status: "active" as const, joinDate: "2025-11-01", lastActive: "2026-05-04" },
  { id: "u6", name: "ياسين حداد", email: "yassine@edu.dz", role: "teacher" as const, status: "suspended" as const, joinDate: "2025-07-01", lastActive: "2026-04-15" },
  { id: "u7", name: "نور الإسلام", email: "nour@edu.dz", role: "student" as const, status: "active" as const, joinDate: "2026-01-15", lastActive: "2026-05-04" },
];
