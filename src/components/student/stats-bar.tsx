export default function StudentStatsBar() {
  return (
    <section className="flex justify-center py-10 bg-[#f7faf9]">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-10 w-full max-w-4xl text-center">
        <div>
          <div className="text-green-600 text-2xl font-bold">1M+</div>
          <div className="text-slate-500 text-sm">Questions Answered</div>
        </div>
        <div>
          <div className="text-green-600 text-2xl font-bold">24/7</div>
          <div className="text-slate-500 text-sm">AI Tutor Access</div>
        </div>
        <div>
          <div className="text-green-600 text-2xl font-bold">10k+</div>
          <div className="text-slate-500 text-sm">Case Summaries</div>
        </div>
        <div>
          <div className="text-green-600 text-2xl font-bold">4.9/5</div>
          <div className="text-slate-500 text-sm">Student Rating</div>
        </div>
      </div>
    </section>
  );
}

