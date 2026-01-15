"use client";

import StudentNavbar from "@/components/student/navbar";
import Footer from "@/components/student/footer";

export default function StudentAiTutorPage() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <StudentNavbar />

      <main className="flex-1">
        <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-8">
          <div className="grid gap-4 lg:gap-6 lg:grid-cols-[0.9fr,1.6fr,0.9fr]">
            {/* LEFT: sidebar */}
            <aside className="rounded-2xl bg-white border border-slate-200 flex flex-col overflow-hidden">
              {/* New Chat bar */}
              <button className="w-full bg-emerald-500 text-white text-sm font-semibold px-4 py-3 flex items-center justify-center gap-2 hover:bg-emerald-600">
                <span className="text-base leading-none">+</span>
                <span>New Chat</span>
              </button>

              <div className="flex-1 overflow-y-auto text-sm">
                {/* Today */}
                <div className="border-b border-slate-200 px-4 py-3 text-[11px] font-semibold uppercase tracking-wide text-slate-400">
                  Today
                </div>
                <div className="px-3 py-2 space-y-1">
                  <button className="w-full rounded-xl bg-emerald-50 border border-emerald-300 px-3 py-2 text-left text-emerald-800 text-sm flex items-center gap-2">
                    <span className="inline-block h-2 w-2 rounded-full bg-emerald-500" />
                    <span className="truncate">Postal Rule Explain...</span>
                  </button>
                  <button className="w-full rounded-xl px-3 py-2 text-left text-slate-700 hover:bg-slate-50 flex items-center gap-2">
                    <span className="inline-block h-2 w-2 rounded-full bg-slate-300" />
                    <span className="truncate">Tort Law: Negligence</span>
                  </button>
                </div>

                {/* Yesterday */}
                <div className="border-b border-slate-200 px-4 py-3 text-[11px] font-semibold uppercase tracking-wide text-slate-400">
                  Yesterday
                </div>
                <div className="px-3 py-2 space-y-1 text-sm">
                  <button className="w-full rounded-xl px-3 py-2 text-left text-slate-700 hover:bg-slate-50 truncate">
                    Donoghue v Stevenson
                  </button>
                </div>

                {/* Previous 7 days */}
                <div className="border-b border-slate-200 px-4 py-3 text-[11px] font-semibold uppercase tracking-wide text-slate-400">
                  Previous 7 Days
                </div>
                <div className="px-3 py-2 space-y-1 text-sm">
                  <button className="w-full rounded-xl px-3 py-2 text-left text-slate-700 hover:bg-slate-50 truncate">
                    Criminal Liability Act
                  </button>
                  <button className="w-full rounded-xl px-3 py-2 text-left text-slate-700 hover:bg-slate-50 truncate">
                    Exam Prep: Property Law
                  </button>
                </div>
              </div>

              {/* Settings / Help */}
              <div className="border-t border-slate-200 px-4 py-4 text-xs text-slate-500 space-y-2">
                <button className="block w-full text-left text-slate-600 hover:text-emerald-600 text-sm">
                  Settings
                </button>
                <button className="block w-full text-left text-slate-600 hover:text-emerald-600 text-sm">
                  Help &amp; FAQ
                </button>
              </div>
            </aside>

            {/* MIDDLE: chat area */}
            <section className="rounded-2xl bg-white border border-slate-200 flex flex-col overflow-hidden">
              {/* Top bar with title + share icon */}
              <div className="border-b border-slate-200 px-5 py-3 flex items-center justify-between">
                <div>
                  <h1 className="text-sm sm:text-base md:text-lg font-semibold text-slate-900">
                    Contract Law: The Postal Rule
                  </h1>
                  <p className="text-[11px] text-slate-500">
                    AI Tutor · Last active just now
                  </p>
                </div>
                <button className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-slate-200 text-slate-500 hover:bg-slate-50">
                  <svg
                    className="h-4 w-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 12h16M12 4l8 8-8 8"
                    />
                  </svg>
                </button>
              </div>

              {/* Timestamp chip */}
              <div className="border-b border-slate-100 bg-slate-50/60 px-4 py-2 flex justify-center">
                <span className="inline-flex items-center rounded-full bg-white px-3 py-1 text-[10px] font-medium text-slate-500 border border-slate-200">
                  Today, 10:23 AM
                </span>
              </div>

              {/* Messages */}
              <div className="flex-1 px-4 py-4 space-y-4 overflow-y-auto text-sm">
                {/* AI opening message */}
                <div className="flex items-start gap-3">
                  <div className="mt-1 flex h-8 w-8 items-center justify-center rounded-full bg-emerald-500 text-white text-xs font-semibold">
                    AI
                  </div>
                  <div>
                    <p className="text-[11px] text-slate-400 mb-1">LawSimple AI</p>
                    <div className="inline-block max-w-full rounded-2xl bg-slate-50 px-4 py-3 border border-slate-100">
                      <p className="text-xs md:text-sm text-slate-700 leading-relaxed">
                        Hello! I’m ready to help you with your Contract Law studies. What
                        specific topic are we focusing on today?
                      </p>
                    </div>
                  </div>
                </div>

                {/* User question */}
                <div className="flex justify-end">
                  <div className="max-w-full md:max-w-[80%] text-right">
                    <p className="mb-1 flex items-center justify-end gap-2 text-[11px] text-slate-400">
                      <span>You</span>
                      <span className="inline-flex h-6 w-6 items-center justify-center rounded-full border border-slate-300 text-[10px]">
                        👤
                      </span>
                    </p>
                    <div className="inline-flex rounded-2xl bg-emerald-500 px-4 py-3 text-xs md:text-sm font-medium text-white text-left">
                      Can you explain the Postal Rule in simple terms? I’m having trouble
                      understanding when exactly acceptance is valid.
                    </div>
                  </div>
                </div>

                {/* AI answer */}
                <div className="flex items-start gap-3">
                  <div className="mt-1 flex h-8 w-8 items-center justify-center rounded-full bg-emerald-500 text-white text-xs font-semibold">
                    AI
                  </div>
                  <div className="flex-1">
                    <p className="text-[11px] text-slate-400 mb-1">LawSimple AI</p>
                    <div className="rounded-2xl bg-slate-50 px-4 py-3 border border-slate-100 text-left">
                      <p className="text-xs md:text-sm text-slate-800 font-semibold mb-2">
                        Certainly! The Postal Rule (or Posting Rule) is an exception to the
                        general rule that acceptance must be communicated to be effective.
                      </p>
                      <p className="text-xs md:text-sm text-slate-700 leading-relaxed mb-2">
                        In simple terms, acceptance is effective the moment the letter of
                        acceptance is posted (put in the mailbox), not when it arrives.
                      </p>
                      <p className="text-xs md:text-sm text-slate-700 leading-relaxed">
                        This means that even if the letter is delayed or lost, a valid
                        contract can still be formed once you post your acceptance.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick actions + input */}
              <div className="border-t border-slate-200 px-4 py-3 space-y-3 bg-white">
                <div className="flex flex-wrap gap-2 text-[11px]">
                  <button className="rounded-full bg-slate-100 px-3 py-1 text-slate-600 hover:bg-slate-200">
                    Tell me about the exceptions
                  </button>
                  <button className="rounded-full bg-slate-100 px-3 py-1 text-slate-600 hover:bg-slate-200">
                    Give me a quiz on this
                  </button>
                  <button className="rounded-full bg-slate-100 px-3 py-1 text-slate-600 hover:bg-slate-200">
                    Explain revocation
                  </button>
                </div>

                <div className="flex items-center gap-3 rounded-full border border-slate-200 bg-slate-50 px-4 py-2">
                  <input
                    type="text"
                    placeholder="Ask a follow-up question..."
                    className="flex-1 bg-transparent text-xs md:text-sm text-slate-700 placeholder-slate-400 outline-none"
                  />
                  <button
                    type="button"
                    className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-emerald-500 text-white hover:bg-emerald-600"
                  >
                    ▶
                  </button>
                </div>

                <p className="text-[10px] text-slate-400">
                  LawSimple AI can make mistakes. Consider checking important information.
                </p>
              </div>
            </section>

            {/* RIGHT: related resources */}
            <aside className="space-y-4">
              {/* Header row */}
              <div className="flex items-center justify-between px-1 pb-1 text-xs font-semibold text-slate-500">
                <span>Related Resources</span>
                <button className="rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-medium text-emerald-700 border border-emerald-100">
                  Auto-detected
                </button>
              </div>

              {/* Relevant Case Law */}
              <div className="rounded-2xl bg-white border border-slate-200 p-4">
                <p className="text-[11px] font-semibold text-slate-500 mb-2">
                  Relevant Case Law
                </p>
                <div className="flex items-start gap-3">
                  <div className="mt-1 flex h-8 w-8 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
                    <span className="text-lg">§</span>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-slate-800 mb-1">
                      Adams v Lindsell (1818)
                    </p>
                    <p className="text-[11px] text-slate-600">
                      The foundational case establishing the postal rule for acceptance of
                      an offer.
                    </p>
                  </div>
                </div>
              </div>

              {/* Suggested Tools */}
              <div className="rounded-2xl bg-white border border-slate-200 p-4">
                <p className="text-[11px] font-semibold text-slate-500 mb-1">
                  Suggested Tools
                </p>
                <p className="text-xs font-semibold text-slate-800 mb-1">
                  Offer &amp; Acceptance Quiz
                </p>
                <p className="text-[11px] text-slate-600 mb-3">
                  Test your knowledge on the rules of acceptance with 10 questions.
                </p>
                <button className="rounded-full bg-violet-600 px-4 py-2 text-xs font-semibold text-white hover:bg-violet-700">
                  Start Quiz
                </button>
              </div>

              {/* Definition Card */}
              <div className="rounded-2xl bg-white border border-amber-200 p-4">
                <p className="text-[11px] font-semibold text-slate-500 mb-1">
                  Definition Card
                </p>
                <p className="text-xs font-semibold text-amber-800 mb-1">Revocation</p>
                <p className="text-[11px] text-slate-700">
                  “The official cancellation of a decree, decision, or promise.” Must be
                  communicated before acceptance.
                </p>
              </div>

              {/* Generate Case Brief */}
              <div className="rounded-2xl bg-emerald-600 text-white p-4 mt-1">
                <p className="text-sm font-semibold mb-1">Need detailed breakdown?</p>
                <p className="text-[11px] text-emerald-50 mb-3">
                  Generate a structured case brief with facts, issue, rule, and analysis.
                </p>
                <button className="w-full rounded-full bg-white/10 py-2 text-xs font-semibold hover:bg-white/20 transition-colors">
                  Generate Case Brief
                </button>
              </div>
            </aside>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}