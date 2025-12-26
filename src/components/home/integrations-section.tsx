// src/components/home/integrations-section.tsx
import { Cloud } from "lucide-react";

export default function IntegrationsSection() {
  return (
    <section className="py-16 bg-white">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Header row */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">
              Seamless Integration
            </h2>
            <p className="mt-2 text-sm sm:text-base text-slate-500">
              Works where you work. Connect with your existing ecosystem.
            </p>
          </div>

          <a
            href="#"
            className="mt-1 inline-flex items-center text-sm font-medium text-emerald-500 hover:text-emerald-600"
          >
            View all integrations →
          </a>
        </div>

        {/* Cards row */}
        <div className="mt-10 grid gap-4 sm:gap-6 md:grid-cols-4">
          {/* Card 1 */}
          <div className="flex items-center justify-center rounded-3xl border border-slate-100 bg-white py-10 shadow-sm">
            <div className="flex h-14 w-14 items-center justify-center rounded-md bg-[#1292B4] text-xs font-semibold tracking-wide text-white">
              Up
            </div>
          </div>

          {/* Card 2 */}
          <div className="flex items-center justify-center rounded-3xl border border-slate-100 bg-white py-10 shadow-sm">
            <div className="flex h-14 w-14 items-center justify-center rounded-md bg-[#007C99] text-xs font-semibold tracking-wide text-white">
              Go
            </div>
          </div>

          {/* Card 3 */}
          <div className="flex items-center justify-center rounded-3xl border border-slate-100 bg-white py-10 shadow-sm">
            <div className="flex h-14 w-14 items-center justify-center rounded-md bg-[#22B1A1] text-xs font-semibold tracking-wide text-white">
              Run
            </div>
          </div>

          {/* Card 4 - Cloud Storage */}
          <div className="flex flex-col items-center justify-center rounded-3xl border border-slate-100 bg-white py-10 shadow-sm">
            <div className="flex h-14 w-14 items-center justify-center rounded-md bg-[#E5F0FF]">
              <Cloud className="h-6 w-6 text-[#2563EB]" />
            </div>
            <p className="mt-3 text-sm font-semibold text-slate-800">
              Cloud Storage
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}