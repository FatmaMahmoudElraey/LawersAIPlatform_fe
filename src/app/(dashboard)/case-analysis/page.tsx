"use client";

import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function CaseAnalysisPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold tracking-tight">Case Analysis</h1>
      <Card className="p-4 space-y-2">
        <h2 className="font-medium">Upload or Select a Case</h2>
        <Skeleton className="h-40 w-full" />
      </Card>
    </div>
  );
}
