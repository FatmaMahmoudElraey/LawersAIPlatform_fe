export default function StudentFeaturesCards() {
  return (
    <section className="py-16 bg-[#f4f6f8]">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10">
          <div className="mb-4 md:mb-0">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Study Law Smarter</h2>
            <p className="text-slate-600 max-w-2xl">
              Combine the power of AI with expert-verified materials. We break down complex legal concepts into bite-sized pieces.
            </p>
          </div>
          <button className="bg-white text-green-600 px-6 py-3 rounded-full font-semibold shadow-md hover:bg-green-50 transition-colors flex items-center gap-2 whitespace-nowrap">
            Explore Features
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1 - AI Legal Tutor */}
          <div className="bg-white rounded-xl shadow-md p-6 text-left hover:shadow-lg transition-shadow">
            <div className="flex items-center gap-3 mb-3">
              <div className="bg-green-100 text-green-700 rounded-full w-12 h-12 flex items-center justify-center text-2xl">
                🤖
              </div>
              <span className="font-semibold text-lg">AI Legal Tutor</span>
            </div>
            <p className="text-slate-600 text-sm leading-relaxed">
              Get instant, simplified answers to any legal question. It's like having a professor in your pocket, 24/7.
            </p>
          </div>
          
          {/* Card 2 - Smart Summaries */}
          <div className="bg-white rounded-xl shadow-md p-6 text-left hover:shadow-lg transition-shadow">
            <div className="flex items-center gap-3 mb-3">
              <div className="bg-yellow-100 text-yellow-700 rounded-full w-12 h-12 flex items-center justify-center text-2xl">
                📝
              </div>
              <span className="font-semibold text-lg">Smart Summaries</span>
            </div>
            <p className="text-slate-600 text-sm leading-relaxed">
              Skip the jargon. Get to the point with clear, concise case briefs written by top students and verified by AI.
            </p>
          </div>
          
          {/* Card 3 - Exam Prep */}
          <div className="bg-white rounded-xl shadow-md p-6 text-left hover:shadow-lg transition-shadow">
            <div className="flex items-center gap-3 mb-3">
              <div className="bg-blue-100 text-blue-700 rounded-full w-12 h-12 flex items-center justify-center text-2xl">
                ✓
              </div>
              <span className="font-semibold text-lg">Exam Prep</span>
            </div>
            <p className="text-slate-600 text-sm leading-relaxed">
              Practice with real past papers and use our AI to grade your answers instantly with feedback.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
