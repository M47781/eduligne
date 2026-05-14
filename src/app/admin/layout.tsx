"use client";
import DashboardLayout from "@/components/layout/DashboardLayout";
import RouteGuard from "@/components/providers/RouteGuard";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <RouteGuard allowedRoles={["admin"]}>
      <DashboardLayout role="admin">{children}</DashboardLayout>
    </RouteGuard>
  );
}