"use client";

import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useAuthStore } from "@/stores/auth.store";

export default function LawyerDashboardPage() {
  const { role } = useAuthStore();

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold tracking-tight">Lawyer Dashboard</h1>
      {role !== "lawyer" && (
        <p className="text-sm text-muted-foreground">
          This view is optimized for lawyers. Some actions may be disabled for your role.
        </p>
      )}
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        <Card className="p-4 space-y-2 md:col-span-2">
          <h2 className="font-medium">Active Cases</h2>
          <Skeleton className="h-40 w-full" />
        </Card>
        <Card className="p-4 space-y-2">
          <h2 className="font-medium">Upcoming Hearings</h2>
          <Skeleton className="h-24 w-full" />
        </Card>
        <Card className="p-4 space-y-2">
          <h2 className="font-medium">Tools & Shortcuts</h2>
          <Skeleton className="h-24 w-full" />
        </Card>
      </div>
    </div>
  );
}
