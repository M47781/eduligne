"use client";
import DashboardLayout from "@/components/layout/DashboardLayout";
import RouteGuard from "@/components/providers/RouteGuard";

export default function ParentLayout({ children }: { children: React.ReactNode }) {
  return (
    <RouteGuard allowedRoles={["parent"]}>
      <DashboardLayout role="parent">{children}</DashboardLayout>
    </RouteGuard>
  );
}