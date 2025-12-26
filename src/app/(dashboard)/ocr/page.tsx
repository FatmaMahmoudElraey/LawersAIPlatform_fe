"use client";

import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import Dropzone from "@/components/dropzone/dropzone";

export default function OCRPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold tracking-tight">OCR Upload</h1>
      <div className="grid gap-4 md:grid-cols-2">
        <Card className="p-4 space-y-4">
          <h2 className="font-medium">Upload Document</h2>
          <Dropzone />
        </Card>
        <Card className="p-4 space-y-2">
          <h2 className="font-medium">Recognized Text</h2>
          <Skeleton className="h-40 w-full" />
        </Card>
      </div>
    </div>
  );
}
