export default function StudentCTA() {
  return (
    <section className="py-20 bg-transparent">
      <div className="max-w-6xl mx-auto px-4">
        <div className="rounded-3xl bg-gradient-to-br from-emerald-500 via-emerald-600 to-emerald-700 px-6 sm:px-10 lg:px-16 py-12 sm:py-16 text-center shadow-xl">
          {/* Free to start badge */}
          <div className="mb-4 flex justify-center">
            <span className="inline-flex items-center gap-2 text-xs font-medium text-emerald-50/90">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z"
                  clipRule="evenodd"
                />
              </svg>
              Free to start
            </span>
          </div>

          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-white mb-4 leading-tight">
            Ready to chat with your new
            <br className="hidden sm:block" /> study buddy?
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-emerald-50/90 mb-10 max-w-2xl mx-auto">
            Join thousands of law students using AI to cut study time in half.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button className="inline-flex items-center gap-2 rounded-full bg-white px-7 sm:px-8 py-3 sm:py-3.5 text-sm sm:text-base font-semibold text-emerald-700 shadow-md hover:bg-emerald-50 transition-colors">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              Try AI for Free
            </button>
            <button className="inline-flex items-center justify-center rounded-full border border-emerald-100/70 px-7 sm:px-8 py-3 sm:py-3.5 text-sm sm:text-base font-semibold text-emerald-50 bg-transparent hover:bg-emerald-50 hover:text-emerald-700 transition-colors">
              View Pricing
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
