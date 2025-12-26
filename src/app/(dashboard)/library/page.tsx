"use client";

import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function LibraryPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold tracking-tight">Legal Library</h1>
      <Card className="p-4 space-y-2">
        <h2 className="font-medium">Browse Laws & Regulations</h2>
        <Skeleton className="h-40 w-full" />
      </Card>
    </div>
  );
}
