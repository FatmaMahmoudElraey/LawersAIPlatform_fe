"use client";

import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

interface LawDetailsPageProps {
  params: {
    id: string;
  };
}

export default function LawDetailsPage({ params }: LawDetailsPageProps) {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold tracking-tight">Law Details</h1>
      <Card className="p-4 space-y-2">
        <p className="text-sm text-muted-foreground">Law ID: {params.id}</p>
        <Skeleton className="h-40 w-full" />
      </Card>
    </div>
  );
}
