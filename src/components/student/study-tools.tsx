export default function StudentStudyTools() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4">
        {/* Section heading - left aligned */}
        <div className="mb-10 text-left">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-3">Study Tools</h2>
          <p className="text-slate-600 text-base md:text-lg max-w-xl">
            Everything you need to ace your law exams, powered by AI.
          </p>
        </div>

        {/* Main card */}
        <div className="rounded-3xl border border-slate-200 bg-white shadow-sm overflow-hidden">
          <div className="grid md:grid-cols-[0.9fr,1.6fr]">
            {/* Left column - Interactive AI Tutor */}
            <div className="bg-emerald-50 px-8 py-10 flex flex-col justify-between border-r border-emerald-100/80">
              <div>
                <div className="mb-6 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-emerald-500 flex items-center justify-center text-white text-xl">
                    💬
                  </div>
                  <h3 className="text-lg font-semibold text-slate-900">
                    Interactive AI Tutor
                  </h3>
                </div>

                <p className="text-sm text-slate-600 leading-relaxed mb-8 max-w-xs">
                  Ask complex legal questions and get simple, cited answers instantly.
                  Perfect for clarifying case law or understanding statutes.
                </p>

                <p className="text-xs font-semibold uppercase tracking-wide text-slate-400 mb-3">
                  Try asking about:
                </p>

                <div className="flex flex-col gap-3">
                  <button className="w-full rounded-full bg-white px-5 py-3 text-sm font-medium text-slate-800 flex items-center justify-between shadow-sm hover:bg-slate-50 transition-colors">
                    <span>Contract Law Basics</span>
                    <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-slate-900 text-white text-xs">
                      →
                    </span>
                  </button>

                  <button className="w-full rounded-full bg-white px-5 py-3 text-sm font-medium text-slate-800 flex items-center justify-between shadow-sm hover:bg-slate-50 transition-colors">
                    <span>Criminal Liability</span>
                    <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-slate-900 text-white text-xs">
                      →
                    </span>
                  </button>
                </div>
              </div>
            </div>

            {/* Right column - Chat interface */}
            <div className="bg-[#f9fbfa] px-6 md:px-8 py-8">
              <div className="space-y-4">
                {/* Top AI bubble */}
                <div className="flex items-start gap-3">
                  <div className="mt-1 flex h-7 w-7 items-center justify-center rounded-full bg-emerald-500 text-white text-xs font-semibold">
                    AI
                  </div>
                  <div className="flex-1">
                    <div className="mb-1 flex items-center justify-between text-[11px] text-slate-400">
                      <span>LawBot AI</span>
                    </div>
                    <div className="inline-block rounded-2xl bg-white px-4 py-3 shadow-sm border border-slate-100 max-w-full md:max-w-[90%]">
                      <p className="text-xs md:text-sm text-slate-700 leading-relaxed">
                        Hello! I'm your AI study assistant. I can help you summarize cases,
                        explain legal principles, or create practice quizzes. What are you
                        studying today?
                      </p>
                    </div>
                  </div>
                </div>

                {/* User bubble */}
                <div className="flex justify-end">
                  <div className="max-w-full md:max-w-[80%]">
                    <div className="mb-1 flex items-center justify-end gap-2 text-[11px] text-slate-400">
                      <span>You</span>
                      <span className="inline-flex h-6 w-6 items-center justify-center rounded-full border border-slate-300 text-[10px]">
                        👤
                      </span>
                    </div>
                    <div className="inline-flex rounded-2xl bg-emerald-500 px-4 py-3 text-xs md:text-sm font-medium text-white">
                      Can you explain the "Eggshell Skull" rule?
                    </div>
                  </div>
                </div>

                {/* AI answer bubble */}
                <div className="flex items-start gap-3">
                  <div className="mt-1 flex h-7 w-7 items-center justify-center rounded-full bg-emerald-500 text-white text-xs font-semibold">
                    AI
                  </div>
                  <div className="flex-1">
                    <div className="mb-1 flex items-center justify-between text-[11px] text-slate-400">
                      <span>LawBot AI</span>
                    </div>
                    <div className="rounded-2xl bg-white px-4 py-3 shadow-sm border border-slate-100">
                      <p className="text-xs md:text-sm text-slate-800 font-semibold mb-2">
                        Absolutely! The Eggshell Skull rule (or thin skull rule) is a legal
                        doctrine in tort law.
                      </p>
                      <p className="text-xs md:text-sm text-slate-700 leading-relaxed mb-3">
                        It states that a defendant must "take their victim as they find
                        them". This means if you injure someone, you are responsible for all
                        the consequences, even if the victim had a pre-existing condition
                        that made the injury much worse than expected.
                      </p>

                      <div className="mt-2 flex flex-wrap gap-2">
                        <span className="inline-flex items-center rounded-full bg-emerald-500/10 px-3 py-1 text-[11px] font-medium text-emerald-700 border border-emerald-200">
                          Tort Law
                        </span>
                        <span className="inline-flex items-center rounded-full bg-emerald-500/10 px-3 py-1 text-[11px] font-medium text-emerald-700 border border-emerald-200">
                          Negligence
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom input bar */}
              <div className="mt-6 rounded-b-2xl border-t border-slate-200 pt-4">
                <div className="flex items-center gap-3 rounded-full bg-white px-4 py-2 shadow-sm border border-slate-200">
                  <input
                    type="text"
                    placeholder="Ask a follow-up question..."
                    className="flex-1 bg-transparent text-xs md:text-sm text-slate-700 placeholder-slate-400 outline-none"
                  />
                  <button
                    type="button"
                    className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-emerald-500 text-white hover:bg-emerald-600 transition-colors"
                  >
                    ▶
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
