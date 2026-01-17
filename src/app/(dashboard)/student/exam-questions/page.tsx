"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import StudentNavbar from "@/components/student/navbar";
import Footer from "@/components/student/footer";
import { LocalStorageKeys } from "@/helpers/constants/local-storage.constant";

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
  [key: string]: any;
}

interface FilterState {
  keywords: string;
  subject: string;
  difficulty: string;
  questionTypes: string[];
}

export default function ExamQuestionsPage() {
  const router = useRouter();
  const [questions, setQuestions] = useState<ExamQuestion[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isClient, setIsClient] = useState(false);
  const [revealedAnswers, setRevealedAnswers] = useState<string[]>([]);

  // Filter state
  const [filters, setFilters] = useState<FilterState>({
    keywords: "",
    subject: "All Subject",
    difficulty: "Any Level",
    questionTypes: []
  });

  // Get token from localStorage
  const getAuthToken = () => {
    if (typeof window !== 'undefined') {
      try {
        console.log('=== EXAM QUESTIONS TOKEN DEBUG START ===');
        console.log('LocalStorageKeys.UserAuth:', LocalStorageKeys.UserAuth);

        // Check ALL localStorage items
        const allKeys = Object.keys(localStorage);
        console.log('All localStorage keys:', allKeys);

        for (let i = 0; i < allKeys.length; i++) {
          const key = allKeys[i];
          const value = localStorage.getItem(key);
          console.log(`Key: ${key}, Value:`, value);

          if (value && (key.includes('auth') || key.includes('user') || key.includes('token'))) {
            try {
              const parsed = JSON.parse(value);
              console.log(`Parsed ${key}:`, parsed);

              // Check for token in various possible locations
              const token =
                parsed.token ||
                parsed.accessToken ||
                parsed.access_token ||
                parsed.data?.token ||
                parsed.data?.accessToken;

              if (token) {
                console.log(`Found token in ${key}:`, token);
                return token;
              }
            } catch (e) {
              // If not JSON, maybe it's just a token string
              if (value.startsWith('ey') && value.includes('.')) {
                // Looks like a JWT token
                console.log(`Found JWT token string in ${key}`);
                return value;
              }
            }
          }
        }

        console.log('No token found in any localStorage item');
        console.log('=== EXAM QUESTIONS TOKEN DEBUG END ===');
        return null;
      } catch (error) {
        console.error('Error in getAuthToken:', error);
        return null;
      }
    }
    return null;
  };

  // Define difficulty colors
  const getDifficultyColor = (difficulty: string) => {
    const difficultyColors: Record<string, string> = {
      "Beginner": "bg-blue-100 text-blue-700",
      "Intermediate": "bg-yellow-100 text-yellow-700",
      "Hard": "bg-red-100 text-red-700",
      "Advanced": "bg-purple-100 text-purple-700",
    };

    return difficultyColors[difficulty] || "bg-slate-100 text-slate-700";
  };

  // Define subject colors
  const getSubjectColor = (subject: string) => {
    const subjectColors: Record<string, string> = {
      "Tort Law": "bg-emerald-100 text-emerald-700",
      "Contract Law": "bg-amber-100 text-amber-700",
      "Criminal Law": "bg-rose-100 text-rose-700",
      "Property Law": "bg-indigo-100 text-indigo-700",
      "Constitutional Law": "bg-violet-100 text-violet-700",
      "General": "bg-slate-100 text-slate-700",
    };

    return subjectColors[subject] || "bg-slate-100 text-slate-700";
  };

  useEffect(() => {
    // Set client-side flag
    setIsClient(true);

    const checkAuthAndFetch = async () => {
      console.log('=== EXAM QUESTIONS AUTH CHECK START ===');
      const token = getAuthToken();
      console.log('Token found:', token);

      if (!token) {
        console.log('No token found, redirecting to login');
        setError("Please log in to access exam questions");
        setTimeout(() => {
          router.push('/login?redirect=/student/exam-questions');
        }, 2000);
        setLoading(false);
        return;
      }

      console.log('Token found, fetching exam questions...');
      await fetchQuestions(token);
    };

    if (isClient) {
      checkAuthAndFetch();
    }
  }, [isClient, router, filters]);

  const fetchQuestions = async (token: string) => {
    try {
      setLoading(true);
      setError(null);

      // Demo data for exam questions
      const demoQuestions: ExamQuestion[] = [
        {
          id: 1,
          title: "Contract Formation - Offer and Acceptance",
          description: "Analyze the following scenario:\n\nSarah sends an email to John on Monday offering to sell her car for $10,000. John receives the email on Tuesday and replies by email accepting the offer on Wednesday. Sarah receives John's acceptance on Thursday.\n\nDiscuss when and if a contract was formed between Sarah and John, considering the postal rule and modern communication methods.",
          subject: "Contract Law",
          difficulty: "Intermediate",
          estimatedTime: "15 min",
          questionType: ["Essay Questions"],
          modelAnswer: "A contract was formed when John sent his acceptance email on Wednesday. Under modern contract law principles, email communications are generally considered instantaneous for the purposes of offer and acceptance. The postal rule, which states that acceptance is effective upon posting, does not apply to electronic communications.\n\nKey points:\n1. The offer was effectively communicated when John received it on Tuesday\n2. John's acceptance was effective when sent on Wednesday (instantaneous communication rule)\n3. Sarah's receipt of acceptance on Thursday confirms contract formation\n4. The postal rule is limited to physical mail and does not extend to electronic communications\n\nTherefore, a binding contract was formed on Wednesday when John sent his acceptance email."
        },
        {
          id: 2,
          title: "Negligence - Duty of Care",
          description: "Multiple Choice Question:\n\nA doctor fails to warn a patient about known side effects of a prescribed medication. The patient suffers severe allergic reaction. Which element of negligence is most clearly established?\n\nA) Duty of care\nB) Breach of duty\nC) Causation\nD) Damages",
          subject: "Tort Law",
          difficulty: "Beginner",
          estimatedTime: "5 min",
          questionType: ["Multiple Choice"],
          modelAnswer: "The correct answer is B) Breach of duty.\n\nExplanation: The scenario clearly establishes that the doctor breached their duty by failing to warn about known side effects. While a duty of care exists in doctor-patient relationships (A), and damages occurred (D), the most clearly established element from the facts given is the breach of that duty. Causation would require additional facts about whether the failure to warn actually caused the allergic reaction."
        },
        {
          id: 3,
          title: "Criminal Liability - Mens Rea",
          description: "Case Study:\n\nEmma, aged 16, takes her father's car without permission to drive to a party. She believes she has the right to use the family car whenever needed. On the way, she runs a red light and causes an accident.\n\nDiscuss Emma's criminal liability, focusing on the mens rea requirement for theft and traffic violations.",
          subject: "Criminal Law",
          difficulty: "Advanced",
          estimatedTime: "20 min",
          questionType: ["Case Studies"],
          modelAnswer: "Emma likely lacks the mens rea for theft but may be liable for traffic violations.\n\nTheft Analysis:\n- The actus reus of theft (appropriation of property) is present\n- However, mens rea for theft requires intention to permanently deprive\n- Emma's honest belief that she had right to use the car negates dishonesty\n- R v. Gomez establishes that belief in right negates mens rea for theft\n\nTraffic Violations:\n- Strict liability offenses may not require mens rea\n- Running red light typically requires awareness of the traffic signal\n- Emma's awareness of the red light establishes mens rea for traffic violation\n\nConclusion: Not guilty of theft due to lack of mens rea, but potentially guilty of traffic violations."
        },
        {
          id: 4,
          title: "Property Rights - Adverse Possession",
          description: "Essay Question:\n\nTom has been living in an abandoned house for 12 years, maintaining the property and paying property taxes. The original owner, Jerry, occasionally checks on the property but never objects to Tom's occupation.\n\nAnalyze whether Tom can claim adverse possession of the property under typical common law principles.",
          subject: "Property Law",
          difficulty: "Hard",
          estimatedTime: "25 min",
          questionType: ["Essay Questions"],
          modelAnswer: "Tom likely cannot establish adverse possession due to Jerry's occasional presence and lack of true hostility.\n\nElements of Adverse Possession:\n1. Actual possession - ✓ (Tom lives there and maintains it)\n2. Open and notorious - ✓ (visible possession)\n3. Exclusive - ✗ (Jerry occasionally visits)\n4. Hostile/Adverse - ✗ (Jerry's permission implied by lack of objection)\n5. Continuous for statutory period - ✓ (12 years)\n\nKey Issues:\n- Jerry's occasional visits defeat exclusivity requirement\n- Lack of objection may imply permission, negating hostility\n- True adverse possession requires claim of right inconsistent with owner's rights\n\nConclusion: Tom cannot successfully claim adverse possession because the possession is not truly adverse or exclusive to the owner's rights."
        },
        {
          id: 5,
          title: "Constitutional Law - Freedom of Speech",
          description: "Multiple Choice:\n\nWhich type of speech receives the highest level of First Amendment protection?\n\nA) Commercial speech\nB) Political speech\nC) Obscene material\nD) Fighting words",
          subject: "Constitutional Law",
          difficulty: "Beginner",
          estimatedTime: "5 min",
          questionType: ["Multiple Choice"],
          modelAnswer: "B) Political speech\n\nThe Supreme Court has consistently held that political speech receives the highest level of First Amendment protection. This is based on the fundamental principle that free political discourse is essential to democracy.\n\nLevels of protection (highest to lowest):\n1. Political speech - strict scrutiny\n2. Artistic expression - substantial protection\n3. Commercial speech - intermediate scrutiny\n4. Obscene material - no protection (Miller test)\n5. Fighting words - no protection (Chaplinsky v. New Hampshire)"
        }
      ];

      // Simulate API delay
      setTimeout(() => {
        setQuestions(demoQuestions);
        setLoading(false);
      }, 500);

    } catch (err) {
      console.error("Error loading demo questions:", err);
      const errorMessage = err instanceof Error ? err.message : "Failed to load exam questions";
      setError(errorMessage);
      setQuestions([]);
    } finally {
      setLoading(false);
    }
  };

  // Handle filter changes
  const handleFilterChange = (key: keyof FilterState, value: any) => {
    setFilters(prev => ({
      ...prev,
      [key]: value
    }));
  };

  // Handle question type toggle
  const handleQuestionTypeToggle = (type: string) => {
    setFilters(prev => {
      const newTypes = prev.questionTypes.includes(type)
        ? prev.questionTypes.filter(t => t !== type)
        : [...prev.questionTypes, type];

      return {
        ...prev,
        questionTypes: newTypes
      };
    });
  };

  // Apply filters
  const handleApplyFilters = () => {
    const token = getAuthToken();
    if (token) {
      fetchQuestions(token);
    }
  };

  // Reset filters
  const handleResetFilters = () => {
    setFilters({
      keywords: "",
      subject: "All Subject",
      difficulty: "Any Level",
      questionTypes: []
    });

    const token = getAuthToken();
    if (token) {
      fetchQuestions(token);
    }
  };

  const toggleAnswer = (id: string | number) => {
    const idStr = id.toString();
    setRevealedAnswers(prev =>
      prev.includes(idStr)
        ? prev.filter(answerId => answerId !== idStr)
        : [...prev, idStr]
    );
  };

  // Handle loading state
  if (!isClient) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-500"></div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col bg-slate-50">
        <StudentNavbar />
        <main className="flex-1">
          <section className="bg-white border-b border-slate-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-12">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-slate-900 mb-3 text-center">
                Exam Practice Bank
              </h1>
              <p className="text-sm sm:text-base md:text-lg text-slate-600 max-w-3xl mx-auto text-center mb-8">
                Loading exam questions...
              </p>
            </div>
          </section>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
            <div className="flex justify-center items-center">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-500"></div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  // Handle error state
  if (error && questions.length === 0) {
    return (
      <div className="min-h-screen flex flex-col bg-slate-50">
        <StudentNavbar />
        <main className="flex-1">
          <section className="bg-white border-b border-slate-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-12">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-slate-900 mb-3 text-center">
                Exam Practice Bank
              </h1>
              <p className="text-sm sm:text-base md:text-lg text-slate-600 max-w-3xl mx-auto text-center mb-8">
                {error}
              </p>
              <div className="flex justify-center gap-4">
                <button
                  onClick={() => window.location.reload()}
                  className="rounded-lg bg-emerald-500 px-6 py-3 text-white font-semibold hover:bg-emerald-600"
                >
                  Retry
                </button>
                <button
                  onClick={() => router.push('/login')}
                  className="rounded-lg border border-emerald-500 px-6 py-3 text-emerald-500 font-semibold hover:bg-emerald-50"
                >
                  Login
                </button>
              </div>
            </div>
          </section>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <StudentNavbar />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-white border-b border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-12">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-slate-900 mb-3 text-center">
              Exam Practice Bank
            </h1>
            <p className="text-sm sm:text-base md:text-lg text-slate-600 max-w-3xl mx-auto text-center mb-8">
              Sharpen your legal reasoning. Browse through our database of past exam questions from top law schools, complete with model answers and grading rubrics.
            </p>
          </div>
        </section>

        {/* Main Content Area */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Sidebar Filters - LEFT COLUMN */}
            <aside className="lg:w-1/3 xl:w-1/4">
              <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm sticky top-8">
                <h2 className="text-lg font-semibold text-slate-900 mb-6">Filters</h2>

                {/* Keywords Search */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Keywords...
                  </label>
                  <input
                    type="text"
                    value={filters.keywords}
                    onChange={(e) => handleFilterChange('keywords', e.target.value)}
                    placeholder="Enter keywords..."
                    className="w-full px-4 py-2.5 border border-slate-300 rounded-lg text-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    style={{backgroundColor: "transparent"}}/>
                </div>

                {/* Subject Filter */}
                <div className="mb-6">
                  <h3 className="text-sm font-medium text-slate-700 mb-3">Subject</h3>
                  <div className="space-y-2">
                    <select
                      value={filters.subject}
                      onChange={(e) => handleFilterChange('subject', e.target.value)}
                      className="w-full px-4 py-2.5 border border-slate-300 rounded-lg text-sm text-slate-700 bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    >
                      <option>All Subject</option>
                      <option>Tort Law</option>
                      <option>Contract Law</option>
                      <option>Criminal Law</option>
                      <option>Property Law</option>
                      <option>Constitutional Law</option>
                    </select>
                  </div>
                </div>

                {/* Difficulty Filter */}
                <div className="mb-6">
                  <h3 className="text-sm font-medium text-slate-700 mb-3">Difficulty</h3>
                  <div className="space-y-2">
                    <select
                      value={filters.difficulty}
                      onChange={(e) => handleFilterChange('difficulty', e.target.value)}
                      className="w-full px-4 py-2.5 border border-slate-300 rounded-lg text-sm text-slate-700 bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    >
                      <option>Any Level</option>
                      <option>Beginner</option>
                      <option>Intermediate</option>
                      <option>Advanced</option>
                      <option>Hard</option>
                    </select>
                  </div>
                </div>

                {/* Type Filter */}
                <div className="mb-6">
                  <h3 className="text-sm font-medium text-slate-700 mb-3">Filter by Type</h3>
                  <div className="space-y-2">
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={filters.questionTypes.includes("Multiple Choice")}
                        onChange={() => handleQuestionTypeToggle("Multiple Choice")}
                        className="rounded border-slate-300 text-emerald-600 focus:ring-emerald-500 mr-3"
                      />
                      <span className="text-sm text-slate-700">Multiple Choice</span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={filters.questionTypes.includes("Essay Questions")}
                        onChange={() => handleQuestionTypeToggle("Essay Questions")}
                        className="rounded border-slate-300 text-emerald-600 focus:ring-emerald-500 mr-3"
                      />
                      <span className="text-sm text-slate-700">Essay Questions</span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={filters.questionTypes.includes("Case Studies")}
                        onChange={() => handleQuestionTypeToggle("Case Studies")}
                        className="rounded border-slate-300 text-emerald-600 focus:ring-emerald-500 mr-3"
                      />
                      <span className="text-sm text-slate-700">Case Studies</span>
                    </label>
                  </div>
                </div>

                {/* Filter Actions */}
                <div className="flex gap-3 pt-4 border-t border-slate-200">
                  <button
                    onClick={handleApplyFilters}
                    className="flex-1 px-4 py-2.5 bg-emerald-500 text-white text-sm font-semibold rounded-lg hover:bg-emerald-600 transition-colors"
                  >
                    Apply Filters
                  </button>
                  <button
                    onClick={handleResetFilters}
                    className="flex-1 px-4 py-2.5 bg-slate-100 text-slate-700 text-sm font-semibold rounded-lg hover:bg-slate-200 transition-colors"
                  >
                    Reset
                  </button>
                </div>
              </div>
            </aside>

            {/* Questions List - RIGHT COLUMN */}
            <div className="lg:w-2/3 xl:w-3/4">
              {/* Results count */}
              <div className="mb-6">
                <p className="text-sm text-slate-600">
                  Showing {questions.length} exam questions
                  {filters.subject !== "All Subject" && ` in "${filters.subject}"`}
                  {filters.difficulty !== "Any Level" && ` with difficulty "${filters.difficulty}"`}
                  {filters.keywords && ` for "${filters.keywords}"`}
                </p>
              </div>

              {/* Show message if no results */}
              {questions.length === 0 && (
                <div className="text-center py-10 bg-white rounded-xl border border-slate-200">
                  <p className="text-slate-600 mb-4">
                    No exam questions found with current filters
                  </p>
                  <button
                    onClick={handleResetFilters}
                    className="text-emerald-600 hover:text-emerald-700 font-semibold"
                  >
                    Clear all filters
                  </button>
                </div>
              )}

              {/* Questions List */}
              {questions.length > 0 && (
                <div className="space-y-8">
                  {questions.map((question) => (
                    <div key={question.id} className="bg-white border border-slate-200 rounded-xl overflow-hidden">
                      <div className="p-6">
                        <div className="flex flex-wrap items-start justify-between mb-4">
                          <div className="flex flex-wrap items-center gap-2 mb-3 md:mb-0">
                            <span className={`inline-block px-3 py-1 ${getSubjectColor(question.subject)} text-xs font-semibold rounded-full`}>
                              {question.subject}
                            </span>
                            <span className={`inline-block px-3 py-1 ${getDifficultyColor(question.difficulty)} text-xs font-semibold rounded-full`}>
                              {question.difficulty}
                            </span>
                          </div>
                          <span className="text-sm text-slate-500 font-medium">Est. time: {question.estimatedTime}</span>
                        </div>

                        <h3 className="text-lg font-semibold text-slate-900 mb-3">
                          <a 
                            href={`/student/exam-questions/${question.title.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')}`}
                            className="hover:text-emerald-600 transition-colors"
                          >
                            {question.title}
                          </a>
                        </h3>

                        <p className="text-slate-700 mb-6 leading-relaxed whitespace-pre-line">
                          {question.description}
                        </p>

                        <button
                          onClick={() => toggleAnswer(question.id)}
                          className="inline-flex items-center justify-center px-5 py-2.5 bg-emerald-500 text-white text-sm font-semibold rounded-lg hover:bg-emerald-600 transition-colors shadow-sm"
                        >
                          {revealedAnswers.includes(question.id.toString()) ? 'Hide Model Answer' : 'Reveal Model Answer'}
                        </button>

                        {revealedAnswers.includes(question.id.toString()) && question.modelAnswer && (
                          <div className="mt-6 p-5 bg-slate-50 border border-slate-200 rounded-lg">
                            <h4 className="text-sm font-semibold text-slate-900 mb-3">Model Answer:</h4>
                            <div className="text-sm text-slate-700 whitespace-pre-line">
                              {question.modelAnswer}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}