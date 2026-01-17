"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import StudentNavbar from "@/components/student/navbar";
import Footer from "@/components/student/footer";
import { Clock, CalendarDays, User, ArrowLeft, CheckCircle2, BookOpen, Tag, ThumbsUp, ThumbsDown, Share2, Bookmark } from "lucide-react";

interface ExamQuestion {
  id: string | number;
  title: string;
  description: string;
  subject: string;
  difficulty: string;
  estimatedTime: string;
  questionType?: string[];
  tags?: string[];
  modelAnswer?: string;
  explanation?: string;
  relatedCases?: string[];
  keyPoints?: string[];
  [key: string]: any;
}

export default function ExamQuestionDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [question, setQuestion] = useState<ExamQuestion | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isClient, setIsClient] = useState(false);
  const [revealedAnswer, setRevealedAnswer] = useState(false);
  const [revealedExplanation, setRevealedExplanation] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient) return;

    const fetchQuestion = async () => {
      try {
        setLoading(true);
        setError(null);

        // Demo data - in real app, this would fetch from API
        const demoQuestion: ExamQuestion = {
          id: 1,
          title: "Negligence and Duty of Care",
          description: `Scenario:

Mrs. Chen, an elderly woman with poor eyesight, was shopping at SuperMart grocery store. While walking down the cereal aisle, she slipped on a puddle of milk that had spilled from a broken carton. The puddle had been present for approximately 30 minutes before the incident. An employee had been notified of the spill but had not yet cleaned it up due to being assigned to another task.

Mrs. Chen suffered a broken hip and other injuries. She is now suing SuperMart for negligence.

Question:

Analyze the negligence claim against SuperMart. Discuss each element of negligence (duty of care, breach of duty, causation, and damages) and apply them to the facts. Also consider any potential defenses SuperMart might raise.

In your answer, reference relevant case law and principles discussed in your course materials.`,
          subject: "Tort Law",
          difficulty: "Intermediate",
          estimatedTime: "25 min",
          questionType: ["Essay Questions"],
          modelAnswer: `Negligence Analysis Against SuperMart

1. Duty of Care
SuperMart owed Mrs. Chen a duty of care as a business invitee. Under the principle established in Indermaur v. Dames, businesses owe a duty to take reasonable care to protect their customers from known hazards. As a customer shopping on the premises, Mrs. Chen was clearly within the scope of this duty.

2. Breach of Duty
SuperMart breached this duty through several failures:
- The store failed to maintain reasonably safe premises
- An employee knew about the spill but failed to clean it promptly
- No warning signs were placed to alert customers of the hazard
- The 30-minute delay in addressing a known danger is unreasonable

The breach is clear under the standard of a reasonable business operator.

3. Causation
Actual Cause: The spill directly caused Mrs. Chen's fall and injuries.

Proximate Cause: The injuries were a foreseeable result of failing to clean a known spill hazard. It is reasonably foreseeable that customers might slip on unattended liquid spills.

4. Damages
Mrs. Chen suffered actual damages:
- Medical expenses for treatment
- Pain and suffering from broken hip
- Potential loss of mobility and independence
- These are compensable damages under negligence law

5. Potential Defenses

Contributory Negligence: SuperMart might argue Mrs. Chen was contributorily negligent for not watching where she was walking. However, most jurisdictions have moved to comparative negligence, and even under contributory negligence, elderly customers with poor eyesight may be expected to exercise reasonable care without being hyper-vigilant.

Assumption of Risk: This defense is weak as Mrs. Chen could not have known about the specific spill hazard.

Conclusion
SuperMart is likely liable for negligence. The store breached its duty of care through multiple failures, this breach directly caused foreseeable harm, and Mrs. Chen suffered compensable damages. Any comparative negligence finding would likely reduce but not eliminate damages.`,
          explanation: `This question tests your understanding of the four elements of negligence and their application to a premises liability scenario. Key points to remember:

- Business invitees receive the highest duty of care
- Knowledge of a hazard creates a clear duty to act
- Actual and proximate cause must both be established
- Comparative negligence is the modern approach in most jurisdictions
- Premises liability cases often hinge on notice and opportunity to correct hazards

The scenario involves classic premises liability issues that appear frequently in tort law examinations.`,
          keyPoints: [
            "Business owes highest duty of care to invitees",
            "Knowledge of hazard creates duty to act promptly",
            "Actual and proximate causation both required",
            "Comparative negligence typically applies",
            "Premises liability focuses on notice and correction"
          ],
          relatedCases: [
            "Indermaur v. Dames (1832) - Business invitee duty",
            "Rowland v. Christian (1968) - Modern negligence approach",
            "Baker v. Market Basket Store - Premises liability precedent"
          ]
        };

        // Simulate API delay
        setTimeout(() => {
          setQuestion(demoQuestion);
          setLoading(false);
        }, 500);

      } catch (err) {
        console.error("Error fetching question:", err);
        setError(err instanceof Error ? err.message : "Failed to load question");
        setLoading(false);
      }
    };

    fetchQuestion();
  }, [isClient]);

  const getDifficultyColor = (difficulty: string) => {
    const difficultyColors: Record<string, string> = {
      "Beginner": "bg-blue-100 text-blue-700",
      "Intermediate": "bg-yellow-100 text-yellow-700",
      "Hard": "bg-red-100 text-red-700",
      "Advanced": "bg-purple-100 text-purple-700",
    };
    return difficultyColors[difficulty] || "bg-slate-100 text-slate-700";
  };

  const getSubjectColor = (subject: string) => {
    const subjectColors: Record<string, string> = {
      "Tort Law": "bg-emerald-100 text-emerald-700",
      "Contract Law": "bg-amber-100 text-amber-700",
      "Criminal Law": "bg-rose-100 text-rose-700",
      "Property Law": "bg-indigo-100 text-indigo-700",
      "Constitutional Law": "bg-violet-100 text-violet-700",
    };
    return subjectColors[subject] || "bg-slate-100 text-slate-700";
  };

  if (!isClient) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-500"></div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col bg-white">
        <StudentNavbar />
        <main className="flex-1">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
            <div className="flex justify-center items-center">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-500"></div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (error && !question) {
    return (
      <div className="min-h-screen flex flex-col bg-white">
        <StudentNavbar />
        <main className="flex-1">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
            <div className="text-center">
              <h1 className="text-2xl font-bold text-slate-900 mb-4">Error</h1>
              <p className="text-slate-600 mb-6">{error}</p>
              <div className="flex justify-center gap-4">
                <button 
                  onClick={() => window.location.reload()}
                  className="rounded-lg bg-emerald-500 px-6 py-3 text-white font-semibold hover:bg-emerald-600"
                >
                  Retry
                </button>
                <button 
                  onClick={() => router.push('/student/exam-questions')}
                  className="rounded-lg border border-emerald-500 px-6 py-3 text-emerald-500 font-semibold hover:bg-emerald-50"
                >
                  Back to Questions
                </button>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!question) {
    return (
      <div className="min-h-screen flex flex-col bg-white">
        <StudentNavbar />
        <main className="flex-1">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
            <div className="text-center">
              <h1 className="text-2xl font-bold text-slate-900 mb-4">Question Not Found</h1>
              <p className="text-slate-600 mb-6">The requested question could not be found.</p>
              <button 
                onClick={() => router.push('/student/exam-questions')}
                className="rounded-lg bg-emerald-500 px-6 py-3 text-white font-semibold hover:bg-emerald-600"
              >
                Back to Questions
              </button>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <StudentNavbar />

      {/* Breadcrumbs */}
      <header className="border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <nav className="flex items-center text-sm text-slate-600 space-x-4">
            <a href="/student" className="hover:text-slate-900">Home</a>
            <span>/</span>
            <a href="/student/exam-questions" className="hover:text-slate-900">Exam Questions</a>
            <span>/</span>
            <span className="text-slate-900 font-medium">{question.title}</span>
          </nav>
        </div>
      </header>

      <main className="flex-1">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* LEFT COLUMN - Main Content */}
            <div className="lg:col-span-8">
              {/* Back button */}
              <button 
                onClick={() => router.push('/student/exam-questions')}
                className="mb-6 inline-flex items-center gap-2 text-slate-600 hover:text-slate-900 font-medium"
              >
                <ArrowLeft className="h-4 w-4" />
                Back to Questions
              </button>

              {/* Question Header */}
              <div className="mb-8">
                <div className="flex flex-wrap items-center gap-3 mb-4">
                  <span className={`inline-flex items-center gap-2 px-3 py-1.5 ${getSubjectColor(question.subject)} text-sm font-semibold rounded-full`}>
                    <BookOpen className="h-3 w-3" />
                    {question.subject}
                  </span>
                  <span className={`inline-flex items-center gap-2 px-3 py-1.5 ${getDifficultyColor(question.difficulty)} text-sm font-semibold rounded-full`}>
                    <Tag className="h-3 w-3" />
                    {question.difficulty}
                  </span>
                  <div className="flex items-center gap-4 text-sm text-slate-600">
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      <span>{question.estimatedTime}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <CalendarDays className="h-4 w-4" />
                      <span>Added 2 days ago</span>
                    </div>
                  </div>
                </div>

                <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">
                  {question.title}
                </h1>

                {/* Action buttons */}
                <div className="flex items-center gap-3 mb-8">
                  <button className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-500 text-white text-sm font-semibold rounded-lg hover:bg-emerald-600">
                    <CheckCircle2 className="h-4 w-4" />
                    Start Answering
                  </button>
                  <button className="p-2 rounded-lg border border-slate-200 hover:bg-slate-50">
                    <Bookmark className="h-4 w-4 text-slate-600" />
                  </button>
                  <button className="p-2 rounded-lg border border-slate-200 hover:bg-slate-50">
                    <Share2 className="h-4 w-4 text-slate-600" />
                  </button>
                </div>
              </div>

              {/* Question Content */}
              <div className="bg-white border border-slate-200 rounded-xl p-8 mb-8">
                <div className="prose prose-slate max-w-none">
                  <p className="text-slate-700 leading-relaxed whitespace-pre-line">
                    {question.description}
                  </p>
                </div>
              </div>

              {/* Model Answer Section */}
              <div className="mb-8">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-bold text-slate-900">Model Answer</h2>
                  <button
                    onClick={() => setRevealedAnswer(!revealedAnswer)}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-500 text-white text-sm font-semibold rounded-lg hover:bg-emerald-600"
                  >
                    {revealedAnswer ? 'Hide Answer' : 'Reveal Answer'}
                  </button>
                </div>

                {revealedAnswer && question.modelAnswer && (
                  <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-8">
                    <div className="prose prose-emerald max-w-none">
                      <div className="text-emerald-800 leading-relaxed whitespace-pre-line">
                        {question.modelAnswer}
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Explanation Section */}
              {question.explanation && (
                <div className="mb-8">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-bold text-slate-900">Explanation</h2>
                    <button
                      onClick={() => setRevealedExplanation(!revealedExplanation)}
                      className="inline-flex items-center gap-2 px-4 py-2 bg-slate-500 text-white text-sm font-semibold rounded-lg hover:bg-slate-600"
                    >
                      {revealedExplanation ? 'Hide Explanation' : 'Show Explanation'}
                    </button>
                  </div>

                  {revealedExplanation && (
                    <div className="bg-slate-50 border border-slate-200 rounded-xl p-8">
                      <div className="prose prose-slate max-w-none">
                        <div className="text-slate-700 leading-relaxed whitespace-pre-line">
                          {question.explanation}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Key Points */}
              {question.keyPoints && question.keyPoints.length > 0 && (
                <div className="mb-8">
                  <h2 className="text-xl font-bold text-slate-900 mb-4">Key Points to Remember</h2>
                  <div className="bg-amber-50 border border-amber-200 rounded-xl p-6">
                    <ul className="space-y-3">
                      {question.keyPoints.map((point, index) => (
                        <li key={index} className="flex items-start gap-3">
                          <CheckCircle2 className="h-5 w-5 text-amber-600 mt-0.5 flex-shrink-0" />
                          <span className="text-amber-800 font-medium">{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}

              {/* Related Cases */}
              {question.relatedCases && question.relatedCases.length > 0 && (
                <div className="mb-8">
                  <h2 className="text-xl font-bold text-slate-900 mb-4">Related Cases</h2>
                  <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
                    <ul className="space-y-2">
                      {question.relatedCases.map((caseName, index) => (
                        <li key={index} className="text-blue-800 font-medium">
                          {caseName}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}

              {/* Feedback Section */}
              <div className="border-t border-slate-200 pt-8">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-slate-900 mb-1">Was this question helpful?</h3>
                    <p className="text-slate-600">Your feedback helps us improve our content.</p>
                  </div>
                  <div className="flex gap-2">
                    <button className="inline-flex items-center gap-2 px-3 py-2 rounded-lg border border-slate-200 hover:bg-slate-50">
                      <ThumbsUp className="h-4 w-4" />
                      Helpful
                    </button>
                    <button className="inline-flex items-center gap-2 px-3 py-2 rounded-lg border border-slate-200 hover:bg-slate-50">
                      <ThumbsDown className="h-4 w-4" />
                      Not really
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN - Sidebar */}
            <aside className="lg:col-span-4 space-y-6">
              {/* Question Info Card */}
              <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
                <h3 className="text-base font-semibold text-slate-900 mb-4">Question Info</h3>
                <div className="space-y-3 text-sm text-slate-700">
                  <div className="flex justify-between">
                    <span className="text-slate-500">Subject:</span>
                    <span className="font-medium">{question.subject}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Difficulty:</span>
                    <span className="font-medium">{question.difficulty}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Time:</span>
                    <span className="font-medium">{question.estimatedTime}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Added:</span>
                    <span className="font-medium">2 days ago</span>
                  </div>
                </div>
              </div>

              {/* Progress Card */}
              <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
                <h3 className="text-base font-semibold text-slate-900 mb-4">Your Progress</h3>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-slate-600">Status</span>
                      <span className="text-amber-600 font-medium">Not Started</span>
                    </div>
                    <div className="w-full bg-slate-200 rounded-full h-2">
                      <div className="bg-amber-500 h-2 rounded-full" style={{width: '0%'}}></div>
                    </div>
                  </div>
                  <button className="w-full px-4 py-2 bg-emerald-500 text-white text-sm font-semibold rounded-lg hover:bg-emerald-600">
                    Start Answering
                  </button>
                </div>
              </div>

              {/* Study Tips Card */}
              <div className="bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl p-6 text-white shadow-sm">
                <h3 className="text-lg font-semibold mb-3">Study Tips</h3>
                <ul className="space-y-2 text-sm text-emerald-50">
                  <li>• Read the question carefully</li>
                  <li>• Identify key legal issues</li>
                  <li>• Apply relevant case law</li>
                  <li>• Structure your answer clearly</li>
                  <li>• Manage your time effectively</li>
                </ul>
              </div>
            </aside>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
