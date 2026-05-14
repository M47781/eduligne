"use client";
import DashboardLayout from "@/components/layout/DashboardLayout";
import RouteGuard from "@/components/providers/RouteGuard";

export default function TeacherLayout({ children }: { children: React.ReactNode }) {
  return (
    <RouteGuard allowedRoles={["teacher"]}>
      <DashboardLayout role="teacher">{children}</DashboardLayout>
    </RouteGuard>
  );
}