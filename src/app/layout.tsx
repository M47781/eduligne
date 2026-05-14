import "@/index.css";

export const metadata = {
  title: "Eduligne — منصة تعليمية ذكية مدعومة بالذكاء الاصطناعي",
  description: "Eduligne — منظومة تعليمية ذكية مدعومة بالذكاء الاصطناعي، تُمكّن الطلاب وتدعم مسيرتهم في علوم STEM من الجزائر. برج الكيفان، الجزائر.",
  keywords: "Eduligne, تعليم, STEM, الجزائر, ذكاء اصطناعي, برج الكيفان",
  authors: [{ name: "سارة صحراوي", url: "https://eduligne.dz" }],
  icons: {
    icon: "/logo.png",
    apple: "/logo.png",
  },
  openGraph: {
    title: "Eduligne — منصة تعليمية ذكية",
    description: "منظومة تعليمية مدعومة بالذكاء الاصطناعي ومنهجية 4MAT من الجزائر",
    siteName: "Eduligne",
    locale: "ar_DZ",
    type: "website",
  },
};

import AuthProvider from "@/components/providers/AuthProvider";
import ToastProvider from "@/components/providers/ToastProvider";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ar" dir="rtl">
      <body>
        <AuthProvider>
          <ToastProvider>
            {children}
          </ToastProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
