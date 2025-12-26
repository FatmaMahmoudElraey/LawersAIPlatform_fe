// src/components/home/hero.tsx
import { Button } from "@/components/ui/button";
import { ArrowRight, Shield, BookOpen, Scale, Sparkles } from "lucide-react";
import Link from "next/link";

export default function HomeHero() {
  return (
    <section className="relative overflow-hidden bg-white pb-24 pt-16 lg:pb-32 lg:pt-20" style={{ backgroundColor: '#F6F8F7'}}>

      {/* Gradient orbs */}
      <div className="pointer-events-none absolute -left-40 top-40 h-64 w-64 rounded-full bg-gradient-to-b from-emerald-200 to-sky-200 opacity-50 blur-3xl" />
      <div className="pointer-events-none absolute -right-32 top-10 h-72 w-72 rounded-full bg-gradient-to-b from-emerald-300 to-emerald-100 opacity-60 blur-3xl" />

      <div className="relative mx-auto flex max-w-6xl flex-col items-center px-4 sm:px-6 lg:px-8">

        <div className="w-full space-y-12" >
          <div className="space-y-8 text-center">
            <div className="inline-flex items-center justify-center rounded-full bg-emerald-50 px-4 py-1 text-xs font-semibold text-emerald-700 ring-1 ring-emerald-200">
              <span className="mr-2 inline-flex h-5 w-5 items-center justify-center rounded-full bg-emerald-500 text-[10px] text-white">
                <Sparkles className="h-3 w-3" />
              </span>
              <span>New: AI Document Analysis v2.0</span>
            </div>

            <h1 className="text-balance text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
              Transform Your Legal
              <span className="block">Practice with&nbsp;
                <span className="bg-gradient-to-r from-emerald-500 to-emerald-600 bg-clip-text text-transparent">
                  Intelligence
                </span>
              </span>
            </h1>

            <p className="mx-auto max-w-2xl text-balance text-sm text-slate-600 sm:text-base">
              The all-in-one SaaS platform for legal professionals. Streamline case analysis,
              automate documents, and access comprehensive legal insights with our AI-powered
              engine.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4">
              <Button size="lg" className="h-12 rounded-full bg-emerald-500 px-7 text-sm font-semibold text-white hover:bg-emerald-400">
                Start Free Trial
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="h-12 rounded-full border border-slate-200 bg-white px-7 text-sm font-semibold text-slate-900 hover:bg-slate-50"
                asChild
              >
                <Link href="/login">Sign In</Link>
              </Button>
            </div>

            {/* <div className="flex flex-wrap items-center justify-center gap-4 pt-4 text-xs font-medium text-slate-500">
              <span className="rounded-full bg-white px-4 py-2 shadow-sm ring-1 ring-slate-200">
                For Students
              </span>
              <span className="rounded-full bg-white px-4 py-2 shadow-sm ring-1 ring-slate-200">
                For Lawyers
              </span>
              <span className="rounded-full bg-white px-4 py-2 shadow-sm ring-1 ring-slate-200">
                For Law Firms
              </span>
            </div>

            <div className="mt-4 flex flex-wrap items-center justify-center gap-6 text-left text-slate-700">
              <div className="flex items-center gap-2">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
                  <BookOpen className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm font-semibold">Educational tools</p>
                  <p className="text-xs text-slate-500">Built for law students</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-50 text-indigo-600">
                  <Scale className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm font-semibold">Case analytics</p>
                  <p className="text-xs text-slate-500">For litigation teams</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-sky-50 text-sky-600">
                  <Shield className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm font-semibold">Firm management</p>
                  <p className="text-xs text-slate-500">For admins & partners</p>
                </div>
              </div>
            </div> */}

          </div>

          {/* Mockup */}
          <div className="relative flex justify-center">
            <div className="relative mx-auto w-full max-w-5xl rounded-3xl border border-slate-200 bg-white shadow-2xl ring-1 ring-slate-100">

              {/* Browser bar */}
              <div className="flex items-center justify-between gap-4 border-b border-slate-200 px-5 py-3 text-[10px] text-slate-500">
                <div className="flex items-center gap-1">
                  <span className="h-2.5 w-2.5 rounded-full bg-rose-300" />
                  <span className="h-2.5 w-2.5 rounded-full bg-amber-300" />
                  <span className="h-2.5 w-2.5 rounded-full bg-emerald-300" />
                </div>
                <div className="flex-1 flex justify-center">
                  <div className="flex w-full max-w-xs items-center justify-center rounded-full border border-slate-200 bg-slate-50 px-4 py-1 text-[10px] text-slate-500 shadow-sm">
                    legal-aiplatform/dashboard/case-analysis
                  </div>
                </div>
                <span className="text-slate-400">🔒</span>
              </div>

              <div className="flex">
                {/* Sidebar */}
                <div className="w-32 border-r border-slate-100 bg-emerald-50 px-4 py-5 text-[11px] text-slate-600">
                  <p className="mb-4 text-[10px] font-semibold uppercase tracking-wide text-emerald-600">
                    Insights
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-center gap-1 rounded-lg bg-emerald-50 px-2 py-1.5 text-emerald-700">
                      <span className="text-xs">★</span>
                      Overview
                    </li>
                    <li className="px-2 py-1.5 text-slate-400">Documents</li>
                    <li className="px-2 py-1.5 text-slate-400">Case law</li>
                  </ul>
                  <div className="mt-8 rounded-2xl bg-slate-900 px-3 py-3 text-[10px] text-slate-100 shadow-md">
                    <p className="mb-2 text-slate-300">Storage used</p>
                    <div className="h-1.5 w-full rounded-full bg-slate-700">
                      <div className="h-1.5 w-3/4 rounded-full bg-emerald-400" />
                    </div>
                    <p className="mt-2 text-[9px] text-slate-300">75% Complete</p>
                  </div>
                </div>

                {/* Main content */}
                <div className="flex-1 space-y-4 px-5 py-5">
                  <div className="flex items-start justify-between gap-2 text-[11px] text-slate-600">
                    <div>
                      <p className="text-[10px] font-semibold text-slate-900">Smith v. TechCorp</p>
                      <p className="text-[10px] text-slate-400">Case #2023-8942 · Last updated 2 mins ago</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className="h-7 border-slate-200 bg-white px-3 text-[10px] text-slate-600 hover:bg-slate-50"
                      >
                        Export
                      </Button>
                      <Button
                        size="sm"
                        className="h-7 bg-emerald-500 px-3 text-[10px] font-semibold text-white hover:bg-emerald-400"
                      >
                        Run Analysis
                      </Button>
                    </div>
                  </div>

                  <div className="grid gap-4 md:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)]">
                    {/* Document preview */}
                    <div className="relative rounded-2xl bg-slate-50 p-4 text-[10px] text-slate-600 ring-1 ring-slate-100">
                      <p className="mb-2 text-slate-500">Document Preview</p>
                      <div className="space-y-2">
                        <div className="h-1.5 w-full rounded-full bg-slate-200" />
                        <div className="h-1.5 w-11/12 rounded-full bg-slate-200" />
                        <div className="h-1.5 w-4/5 rounded-full bg-slate-200" />
                        <div className="h-1.5 w-3/5 rounded-full bg-slate-200" />
                        <div className="mt-3 flex items-center justify-between rounded-full bg-slate-900 px-3 py-1 text-[9px] text-slate-50">
                          <span>Scanning Complete</span>
                          <span className="rounded-full bg-emerald-500 px-2 py-0.5 text-[9px] text-white">
                            Analyzed
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* AI Insights */}
                    <div className="rounded-2xl bg-slate-50 p-4 text-[10px] text-slate-600 ring-1 ring-slate-100">
                      <div className="mb-2 flex items-center justify-between text-[11px]">
                        <span className="font-semibold text-slate-900">AI Insights</span>
                      </div>
                      <div className="space-y-4">
                        <div>
                          <p className="text-[10px] text-slate-400">Risk Score</p>
                          <div className="mt-1 flex items-baseline gap-2">
                            <span className="text-lg font-semibold text-slate-900">Low</span>
                            <span className="text-[10px] font-semibold text-emerald-500">12%</span>
                          </div>
                          <div className="mt-2 h-1.5 w-full rounded-full bg-slate-200">
                            <div className="h-1.5 w-1/3 rounded-full bg-emerald-500" />
                          </div>
                        </div>

                        <div className="h-px w-full bg-slate-200" />

                        <div>
                          <p className="text-[10px] text-slate-400">Success Probability</p>
                          <div className="mt-1 flex items-baseline gap-1">
                            <span className="text-xl font-semibold text-slate-900">85</span>
                            <span className="text-[11px] font-semibold text-slate-900">%</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Bottom stats */}
                  <div className="mt-2 grid grid-cols-2 gap-3 text-[10px] md:grid-cols-4">
                    <div className="rounded-2xl bg-slate-50 p-3 text-center ring-1 ring-slate-100">
                      <p className="text-[10px] text-slate-400">Citations</p>
                      <p className="mt-1 text-base font-semibold text-slate-900">24</p>
                    </div>
                    <div className="rounded-2xl bg-slate-50 p-3 text-center ring-1 ring-slate-100">
                      <p className="text-[10px] text-slate-400">Jurisdictions</p>
                      <p className="mt-1 text-base font-semibold text-slate-900">3</p>
                    </div>
                    <div className="rounded-2xl bg-slate-50 p-3 text-center ring-1 ring-slate-100">
                      <p className="text-[10px] text-slate-400">Entities</p>
                      <p className="mt-1 text-base font-semibold text-slate-900">18</p>
                    </div>
                    <div className="rounded-2xl bg-slate-50 p-3 text-center ring-1 ring-slate-100">
                      <p className="text-[10px] text-slate-400">Precedents</p>
                      <p className="mt-1 text-base font-semibold text-slate-900">7</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>

        </div>
      </div>

    </section>
  );
}