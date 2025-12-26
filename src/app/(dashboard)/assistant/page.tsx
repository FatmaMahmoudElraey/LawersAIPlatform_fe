"use client";

import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function AssistantPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold tracking-tight">AI Legal Assistant</h1>
      <Card className="p-4 space-y-2">
        <h2 className="font-medium">Conversation</h2>
        <Skeleton className="h-64 w-full" />
      </Card>
    </div>
  );
}
