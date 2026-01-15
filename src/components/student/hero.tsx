export default function StudentHero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-emerald-50 via-white to-emerald-100 py-20">
      <div className="max-w-6xl mx-auto px-4 lg:px-6 flex flex-col lg:flex-row items-start lg:items-center gap-12">
        {/* Left column: text content */}
        <div className="flex-1 flex flex-col items-start text-left">
          {/* New Badge */}
          <span className="inline-flex items-center rounded-full bg-emerald-100 px-4 py-1 text-xs font-semibold text-emerald-700 mb-6">
            New: AI Legal Assistant
          </span>

          {/* Heading */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight text-slate-900 mb-4">
            Your 24/7 personal
            <br />
            <span className="text-emerald-500">Law Tutor.</span>
          </h1>

          {/* Subtext */}
          <p className="text-base md:text-lg text-slate-600 mb-8 max-w-xl">
            Stuck on a concept? Chat with our AI to get instant explanations, case summaries,
            and personalized study help.
          </p>

          {/* Input + button pill */}
          <form className="w-full max-w-xl mb-4">
            <div className="flex items-stretch rounded-full border-2 border-emerald-500 bg-white shadow-md overflow-hidden">
              <div className="relative flex-1 flex items-center">
                <span className="pl-4 pr-2 text-emerald-600">
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
                    />
                  </svg>
                </span>
                <input
                  type="text"
                  placeholder="Ask about a case, term, or exam question..."
                  className="w-full pr-4 py-3 text-sm md:text-base placeholder-slate-400 outline-none border-0"
                  style={{ backgroundColor: "transparent" }}
                />
              </div>
              <button
                type="button"
                className="px-5 md:px-7 py-3 bg-slate-900 text-white text-sm font-semibold flex items-center gap-2 hover:bg-black transition-colors rounded-full md:rounded-full mr-1 my-1"
              >
                Ask AI
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 12h14M13 5l7 7-7 7"
                  />
                </svg>
              </button>
            </div>
          </form>

          {/* Example chips */}
          <div className="mt-2 flex flex-wrap items-center gap-3 text-xs md:text-sm">
            <span className="text-slate-500">Try asking:</span>
            <span className="inline-flex items-center rounded-full bg-slate-100 px-3 py-1 text-slate-600">
              Donoghue v Stevenson facts
            </span>
            <span className="inline-flex items-center rounded-full bg-slate-100 px-3 py-1 text-slate-600">
              What is Mens Rea?
            </span>
          </div>
        </div>

        {/* Right column: illustration */}
        <div className="flex-1 hidden lg:flex justify-center">
          <div className="relative w-80 h-80">
            {/* Large soft card background */}
            <div className="absolute inset-0 rounded-3xl bg-emerald-100/70 shadow-xl flex items-center justify-center">
              <div className="w-24 h-24 rounded-2xl bg-emerald-500 flex items-center justify-center">
                <span className="text-4xl text-white">⚖️</span>
              </div>
            </div>

            {/* Floating small cards */}
            <div className="absolute -bottom-6 left-4 w-24 h-24 rounded-2xl bg-white shadow-md flex items-center justify-center">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center">
                <span className="text-emerald-600 text-xl">L</span>
              </div>
            </div>
            <div className="absolute -top-4 right-0 w-24 h-24 rounded-2xl bg-white shadow-md" />
          </div>
        </div>
      </div>
    </section>
  );
}
