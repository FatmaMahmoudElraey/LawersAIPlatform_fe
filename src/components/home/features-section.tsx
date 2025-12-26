// src/components/home/features-section.tsx
import { FileText, Zap, ShieldCheck } from "lucide-react";

const features = [
  {
    icon: FileText,
    title: "Contract Review",
    description: "Automatically scan NDAs, MSAs, and other agreements for non-standard clauses and potential pitfalls.",
    iconBg: "bg-emerald-50",
    iconColor: "text-emerald-600"
  },
  {
    icon: Zap,
    title: "Clause Generation",
    description: "Draft perfectly compliant clauses in seconds. Context-aware generation matches your document's tone.",
    iconBg: "bg-blue-50",
    iconColor: "text-blue-600"
  },
  {
    icon: ShieldCheck,
    title: "Risk Detection",
    description: "Spot hidden risks automatically with AI precision trained on millions of legal precedents.",
    iconBg: "bg-purple-50",
    iconColor: "text-purple-600"
  }
];

export default function FeaturesSection() {
  return (
    <section className="border-y border-slate-100 py-16" style={{ backgroundColor: '#F6F8F7' }}>
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center">
          <h2 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
            Powerful Features for Modern Law
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-sm text-slate-600 sm:text-base">
            Everything you need to automate your legal workflows without compromising on security or accuracy.
          </p>
        </div>

        {/* Cards */}
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div 
                key={index}
                className="flex flex-col rounded-[32px] bg-white px-6 py-8 shadow-lg ring-1 ring-slate-100"
              >
                <div className={`mb-5 flex h-10 w-10 items-center justify-center rounded-full ${feature.iconBg}`}>
                  <Icon className={`h-5 w-5 ${feature.iconColor}`} />
                </div>
                <h3 className="text-base font-semibold text-slate-900">
                  {feature.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-slate-600">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}