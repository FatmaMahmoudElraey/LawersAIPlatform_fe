"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import StudentNavbar from "@/components/student/navbar";
import Footer from "@/components/student/footer";
import {
  Star,
  ChevronRight,
  HelpCircle,
  FileText,
  BookMarked,
  Brain,
  Zap,
  MessageSquare,
  Target,
  TrendingUp,
  Play
} from "lucide-react";

export default function InteractiveAITutorPage() {
  const router = useRouter();
  const [rating, setRating] = useState(5);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <StudentNavbar />

      <main className="flex-1">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Hero Section */}
          <div className="mb-10">
            <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-3">
              Interactive AI Tutor
            </h1>
            <p className="text-lg text-slate-600 mb-6">
              Your personal legal assistant available 24/7 to clarify concepts.
            </p>
            <div className="flex flex-wrap gap-3">
              <button className="inline-flex items-center px-6 py-3 bg-emerald-500 text-white font-semibold rounded-lg hover:bg-emerald-600 transition-colors">
                Start Session
              </button>
              <button className="inline-flex items-center px-6 py-3 border border-slate-300 text-slate-700 font-semibold rounded-lg hover:bg-slate-50 transition-colors">
                Configure
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Main Content (2/3 width) */}
            <div className="lg:col-span-2 space-y-8">
              {/* About this Tool */}
              <div className="mb-8">
                <h1 className="text-2xl font-bold text-slate-900 mb-4">About this Tool</h1>
                <div className="space-y-4 text-slate-700">
                  <p>
                    The Interactive AI Tutor is designed to help law students bridge the gap between complex legal theory and practical understanding. Unlike a static textbook, this tool adapts to your questions, providing simplified explanations, analogies, and hypothetical scenarios to reinforce your learning.
                  </p>
                  <p>
                    It draws from a vast database of case law, statutes, and legal principles to give you accurate, citation-backed answers. Whether you're struggling with the Rule Against Perpetuities or need a quick refresher on Torts, the AI Tutor is here to help.
                  </p>
                </div>
              </div>

              <div className="h-px bg-slate-200 my-8"></div>

              {/* How to Use */}
              <div>
                <h2 className="text-2xl font-bold text-slate-900 mb-6">How to Use</h2>
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 mb-2">1. Ask a Question</h3>
                    <p className="text-slate-700 ml-0">
                      Type your legal question in natural language. Be as specific as possible for the best results.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 mb-2">2. Review the Answer</h3>
                    <p className="text-slate-700 ml-0">
                      The AI will provide a structured response with definitions, examples, and relevant case citations.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 mb-2">3. Request Examples</h3>
                    <p className="text-slate-700 ml-0">
                      Ask for "hypotheticals" to test your understanding of the concept in different scenarios.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 mb-2">4. Save to Notes</h3>
                    <p className="text-slate-700 ml-0">
                      Bookmark useful explanations directly to your study notes for later review.
                    </p>
                  </div>
                </div>
              </div>
              {/* Student Reviews Section - Matching the image exactly */}
              <div className="bg-white rounded-xl border border-slate-200 p-6">
                <h3 className="text-lg font-semibold text-slate-900 mb-4">Student Reviews</h3>

                {/* Rating Summary */}
                <div className="flex items-center mb-6">
                  <div className="flex mr-3">
                    {[1, 2, 3, 4].map((star) => (
                      <Star key={star} className="h-5 w-5 text-amber-400 fill-current" />
                    ))}
                    <Star key={5} className="h-5 w-5 text-amber-400" />
                  </div>
                  <span className="text-slate-600">Based on 128 student reviews</span>
                </div>

                {/* Review Form */}
                <div className="mb-8">
                  <h4 className="text-sm font-medium text-slate-900 mb-3">Share your experience</h4>

                  {/* Rating Input */}
                  <div className="mb-4">
                    <h5 className="text-sm font-medium text-slate-900 mb-2">Your Rating</h5>
                    <div className="flex space-x-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          onClick={() => setRating(star)}
                          className="text-2xl text-slate-300 hover:text-amber-400 focus:outline-none"
                        >
                          {star <= rating ? '★' : '☆'}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Textarea */}
                  <textarea
                    placeholder="What did you find most helpful? How could we improve?"
                    className="w-full px-3 py-2 border border-slate-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent bg-transparent"
                    rows={3}
                  />

                  {/* Submit Button */}
                  <button className="w-full mt-3 py-2 bg-emerald-500 text-white font-semibold rounded hover:bg-emerald-600 transition-colors">
                    Submit Review
                  </button>
                </div>

                {/* Individual Reviews */}
                <div className="space-y-6">
                  {/* Review 1 - Jane Doe */}
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center flex-shrink-0">
                        <span className="text-xs font-semibold text-slate-700">JD</span>
                      </div>
                      <div>
                        <h4 className="font-medium text-slate-900">Jane Doe</h4>
                        <div className="flex items-center text-sm text-slate-600">
                          <span>1L Student</span>
                          <span className="mx-1">+</span>
                          <span>2 days ago</span>
                        </div>
                      </div>
                    </div>
                    <p className="text-slate-700 text-sm leading-relaxed pl-10">
                      This tool saved me during finals week! The way it breaks down complex Torts concepts into simple, digestible pieces is incredible. I especially love the "Request Examples" feature - it really helps solidify the abstract rules with concrete scenarios.
                    </p>
                  </div>

                  {/* Review 2 - Michael Smith */}
                  <div className="pt-6 border-t border-slate-200">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center flex-shrink-0">
                        <span className="text-xs font-semibold text-slate-700">MS</span>
                      </div>
                      <div>
                        <h4 className="font-medium text-slate-900">Michael Smith</h4>
                        <div className="flex items-center text-sm text-slate-600">
                          <span>2L Student</span>
                          <span className="mx-1">+</span>
                          <span>1 week ago</span>
                        </div>
                      </div>
                    </div>
                    <p className="text-slate-700 text-sm leading-relaxed pl-10">
                      Great tool overall. The citations are usually accurate which is a huge plus compared to generic chatbots. My only feedback would be to improve the mobile view a bit, sometimes the chat window feels a bit cramped on smaller screens.
                    </p>
                  </div>

                  {/* Review 3 - Sarah Jenkins */}
                  <div className="pt-6 border-t border-slate-200">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center flex-shrink-0">
                        <span className="text-xs font-semibold text-slate-700">SJ</span>
                      </div>
                      <div>
                        <h4 className="font-medium text-slate-900">Sarah Jenkins</h4>
                        <div className="flex items-center text-sm text-slate-600">
                          <span>3L Student</span>
                          <span className="mx-1">+</span>
                          <span>3 weeks ago</span>
                        </div>
                      </div>
                    </div>
                    <p className="text-slate-700 text-sm leading-relaxed pl-10">
                      Absolutely essential for quick refreshers. I use it alongside my case briefs to make sure I didn't miss the black letter law. Highly recommend!
                    </p>
                  </div>
                </div>

                {/* View All Button */}
                <div className="pt-6 border-t border-slate-200 mt-6">
                  <button className="w-full py-2.5 border border-slate-300 text-slate-700 font-medium rounded hover:bg-slate-50 transition-colors">
                    View all 128 reviews
                  </button>
                </div>
              </div>

            </div>

            {/* Right Column - Sidebar (1/3 width) */}
            <div className="space-y-8">
              {/* Live Demo Preview */}
              <div className="bg-white rounded-xl border border-slate-200 p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold text-slate-900">Live Demo Preview</h2>
                  <span className="px-3 py-1 bg-slate-100 text-slate-600 text-sm font-medium rounded">
                    Read Only
                  </span>
                </div>

                {/* Demo Chat */}
                <div className="space-y-4 mb-6">
                  {/* User Question */}
                  <div className="flex justify-end">
                    <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4 max-w-[80%]">
                      <p className="text-slate-900">
                        Can you explain the concept of 'Res Ipsa Loquitur'?
                      </p>
                    </div>
                  </div>

                  {/* AI Response */}
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center">
                        <Brain className="h-4 w-4 text-purple-600" />
                      </div>
                    </div>
                    <div className="ml-3 flex-1">
                      <div className="bg-slate-50 border border-slate-200 rounded-lg p-4">
                        <p className="text-slate-900 mb-2">
                          <span className="font-semibold">Res Ipsa Loquitur is Latin for "the thing speaks for itself."</span>
                        </p>
                        <p className="text-slate-700 mb-2">
                          It's a doctrine in tort law that allows a plaintiff to prove negligence based on circumstantial evidence if:
                        </p>

                        <p className="text-sm text-slate-600">
                          See Case Example: <span className="text-emerald-600 font-medium">Byrne v. Boadle</span>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Start Session Button */}
                <button className="w-full py-3 border-2 border-emerald-500 text-emerald-600 font-semibold rounded-lg hover:bg-emerald-50 transition-colors">
                  Start full session to chat...
                </button>
              </div>
              {/* Similar Tools */}
              <div className="bg-white rounded-xl border border-slate-200 p-6">
                <h3 className="text-lg font-semibold text-slate-900 mb-4">Similar Tools</h3>
                <div className="space-y-4">
                  {/* Smart Flashcards */}
                  <div className="flex items-center justify-between p-3 hover:bg-slate-50 rounded-lg transition-colors cursor-pointer">
                    <div className="flex items-center">
                      <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center mr-3">
                        <FileText className="h-5 w-5 text-blue-600" />
                      </div>
                      <div>
                        <h4 className="font-medium text-slate-900">Smart Flashcards</h4>
                        <p className="text-sm text-slate-600">Memorize definitions</p>
                      </div>
                    </div>
                    <ChevronRight className="h-5 w-5 text-slate-400" />
                  </div>

                  {/* Case Brief Builder */}
                  <div className="flex items-center justify-between p-3 hover:bg-slate-50 rounded-lg transition-colors cursor-pointer">
                    <div className="flex items-center">
                      <div className="w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center mr-3">
                        <BookMarked className="h-5 w-5 text-purple-600" />
                      </div>
                      <div>
                        <h4 className="font-medium text-slate-900">Case Brief Builder</h4>
                        <p className="text-sm text-slate-600">Summarize cases fast</p>
                      </div>
                    </div>
                    <ChevronRight className="h-5 w-5 text-slate-400" />
                  </div>
                </div>
              </div>

              {/* Need Help? */}
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
                <div className="flex items-start mb-4">
                  <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center mr-4 flex-shrink-0">
                    <HelpCircle className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-slate-900">Need Help?</h3>
                    <p className="text-slate-700 mt-1">
                      Check out our guide on how to write effective prompts for legal AI tutors.
                    </p>
                  </div>
                </div>
                <button className="w-full py-2.5 bg-white border border-blue-300 text-blue-600 font-semibold rounded-lg hover:bg-blue-50 transition-colors">
                  Read Prompting Guide →
                </button>
              </div>


            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}