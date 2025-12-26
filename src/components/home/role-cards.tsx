// src/components/home/role-cards.tsx
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { GraduationCap, Scale, Building } from "lucide-react";
import Link from "next/link";

const roles = [
  {
    icon: GraduationCap,
    title: "Law Students",
    role: "student",
    description: "Access educational resources, law summaries, exam questions, and study tools.",
    features: [
      "Educational Summaries",
      "Exam Questions Database",
      "Book Library Access",
      "Study Tools & Flashcards",
      "Personalized Learning Path"
    ],
    color: "border-blue-500/20",
    href: "/student"
  },
  {
    icon: Scale,
    title: "Lawyers",
    role: "lawyer",
    description: "AI-powered case analysis, document automation, and legal research tools.",
    features: [
      "AI Case Analysis",
      "OCR Document Processing",
      "Contract Generator",
      "Legal Research Assistant",
      "Case Management"
    ],
    color: "border-purple-500/20",
    href: "/lawyer"
  },
  {
    icon: Building,
    title: "Law Firms",
    role: "firm",
    description: "Team management, analytics, and firm-wide case management platform.",
    features: [
      "Team Management",
      "Analytics Dashboard",
      "Templates Library",
      "Performance Tracking",
      "Billing Integration"
    ],
    color: "border-green-500/20",
    href: "/firm"
  }
];

export default function RoleCards() {
  return (
    <section className="bg-slate-50 py-20 dark:bg-slate-900/60">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-500">
            Pricing
          </p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-50 lg:text-4xl">
            Simple, transparent plans
          </h2>
          <p className="mt-3 text-sm text-slate-500 dark:text-slate-300">
            Choose the workspace tailored to students, solo practitioners, or growing law firms.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {roles.map((role, index) => {
            const isFeatured = index === 1;

            return (
              <Card
                key={index}
                className={`relative flex h-full flex-col border ${
                  isFeatured
                    ? "border-emerald-400 shadow-xl shadow-emerald-500/10 bg-white"
                    : "border-slate-200 bg-white/80 dark:border-slate-700 dark:bg-slate-900"
                }`}
              >
                <CardHeader className="pb-4">
                  <div className="mb-2 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="rounded-lg bg-slate-50 p-2 dark:bg-slate-800">
                        <role.icon className="h-6 w-6 text-slate-900 dark:text-slate-100" />
                      </div>
                      <CardTitle className="text-xl font-semibold">{role.title}</CardTitle>
                    </div>
                    {isFeatured && (
                      <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300">
                        Most popular
                      </span>
                    )}
                  </div>
                  <CardDescription className="text-xs text-slate-500 dark:text-slate-300">
                    {role.description}
                  </CardDescription>
                </CardHeader>

                <CardContent className="flex-1 text-sm">
                  <ul className="space-y-2">
                    {role.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-slate-700 dark:text-slate-200">
                        <span className="mt-1 h-1.5 w-1.5 rounded-full bg-emerald-500" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>

                <CardFooter className="mt-4 flex flex-col gap-2">
                  <Button
                    asChild
                    size="lg"
                    className={`w-full ${
                      isFeatured ? "bg-emerald-500 text-white hover:bg-emerald-600" : ""
                    }`}
                    variant={isFeatured ? "default" : "outline"}
                  >
                    <Link href={role.href}>Access {role.title}</Link>
                  </Button>
                </CardFooter>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}