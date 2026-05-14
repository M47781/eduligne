"use client";
import DashboardLayout from "@/components/layout/DashboardLayout";
import RouteGuard from "@/components/providers/RouteGuard";

export default function StudentLayout({ children }: { children: React.ReactNode }) {
  return (
    <RouteGuard allowedRoles={["student"]}>
      <DashboardLayout role="student">{children}</DashboardLayout>
    </RouteGuard>
  );
}