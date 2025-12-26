"use client";

import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useAuthStore } from "@/stores/auth.store";

export default function StudentDashboardPage() {
  const { role } = useAuthStore();

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold tracking-tight">Student Dashboard</h1>
      {role !== "student" && (
        <p className="text-sm text-muted-foreground">
          This view is optimized for students. Some actions may be disabled for your role.
        </p>
      )}
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        <Card className="p-4 space-y-2">
          <h2 className="font-medium">Recent Topics</h2>
          <Skeleton className="h-24 w-full" />
        </Card>
        <Card className="p-4 space-y-2">
          <h2 className="font-medium">Saved Laws & Articles</h2>
          <Skeleton className="h-24 w-full" />
        </Card>
        <Card className="p-4 space-y-2 md:col-span-2 xl:col-span-1">
          <h2 className="font-medium">Learning Path</h2>
          <Skeleton className="h-24 w-full" />
        </Card>
      </div>
    </div>
  );
}
