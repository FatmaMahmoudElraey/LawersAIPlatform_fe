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
  }, [isClient, router]);

  const fetchQuestions = async (token: string) => {
    try {
      setLoading(true);
      setError(null);

      // Build query parameters based on filters
      const params = new URLSearchParams();

      if (filters.keywords) {
        params.append('search', filters.keywords);
      }

      if (filters.subject && filters.subject !== "All Subject") {
        params.append('subject', filters.subject);
      }

      if (filters.difficulty && filters.difficulty !== "Any Level") {
        params.append('difficulty', filters.difficulty);
      }

      if (filters.questionTypes.length > 0) {
        params.append('questionTypes', filters.questionTypes.join(','));
      }

      console.log("Fetching exam questions with params:", params.toString());

      // Use mock data for now - replace with actual API when available
      // const response = await fetch(`/api/exam-questions?${params.toString()}`, {
      //   headers: {
      //     'Authorization': `Bearer ${token}`,
      //     'Content-Type': 'application/json',
      //   },
      // });

      // const data = await response.json();

      // if (!response.ok) {
      //   if (response.status === 401) {
      //     localStorage.removeItem(LocalStorageKeys.UserAuth);
      //     setError("Your session has expired. Redirecting to login...");
      //     setTimeout(() => {
      //       router.push('/login?redirect=/student/exam-questions');
      //     }, 2000);
      //     return;
      //   }
      //   throw new Error(data.message || `Failed to fetch: ${response.status}`);
      // }

      // Mock data matching the image
      const mockQuestions: ExamQuestion[] = [
        {
          id: 1,
          title: "Negligence and Duty of Care",
          description: "Explain the 'Caparo Test' for establishing a duty of care. How has recent case law (e.g., Robinson v Chief Constable of West Yorkshire Police) modified the approach courts take when determining if a duty of care exists in novel situations?",
          subject: "Tort Law",
          difficulty: "Beginner",
          estimatedTime: "30 mins",
          questionType: ["Essay Questions"],
          tags: ["negligence", "duty of care", "caparo test"],
          modelAnswer: `The Caparo test, established in Caparo Industries plc v Dickman [1990], requires three elements for a duty of care: (1) foreseeability of harm, (2) proximity between parties, and (3) that imposing a duty is fair, just, and reasonable.

Recent case law, particularly Robinson v Chief Constable of West Yorkshire Police [2018], has refined this approach by emphasizing that courts should not apply the Caparo test mechanistically in all novel situations. Instead, they should consider established categories of duty and develop the law incrementally rather than creating entirely new duties from scratch.`
        },
        {
          id: 2,
          title: "Offer and Acceptance in Digital Markets",
          description: "Discuss the implications of the Carilli v Carbolic Smoke Ball Co ruling in the context of modern click-wrap agreements. How does the concept of unilateral contracts apply when the acceptor is an automated algorithm rather than a human agent?",
          subject: "Contract Law",
          difficulty: "Intermediate",
          estimatedTime: "45 mins",
          questionType: ["Essay Questions"],
          tags: ["contract law", "offer and acceptance", "digital contracts"],
          modelAnswer: `The Carilli v Carbolic Smoke Ball Co [1893] case established that a unilateral offer can be accepted by performing the required act, without need for communication of acceptance. In modern digital markets, click-wrap agreements operate on similar principles where acceptance occurs by clicking "I Agree."

When automated algorithms are involved, the key question becomes whether the algorithm's actions can constitute acceptance. Courts generally consider whether the algorithm was programmed to act on behalf of a human principal and whether the terms were reasonably brought to the principal's attention.`
        },
        {
          id: 3,
          title: "Mens Rea and Intoxication",
          description: `"A defendant who voluntarily becomes intoxicated cannot rely on that intoxication as a defence to a crime of basic intent." Critically analyse this statement with reference to DPP v Majewski. Does the current law strike a fair balance between public policy and individual culpability?`,
          subject: "Criminal Law",
          difficulty: "Hard",
          estimatedTime: "60 mins",
          questionType: ["Essay Questions"],
          tags: ["criminal law", "mens rea", "intoxication"],
          modelAnswer: `The rule in DPP v Majewski [1977] establishes that voluntary intoxication cannot negate mens rea for crimes of basic intent (such as assault or manslaughter) but may be relevant for specific intent crimes (such as murder). This reflects a policy choice prioritizing public protection over individual fault principles.

Critics argue this creates a legal fiction by attributing intent where none existed. Supporters contend it serves deterrence and protects the public from intoxicated individuals. The current law arguably favors public policy at the expense of strict adherence to the principle of subjective mens rea.`
        }
      ];

      // Filter mock data based on filters
      let filteredQuestions = mockQuestions;

      if (filters.keywords) {
        const searchLower = filters.keywords.toLowerCase();
        filteredQuestions = filteredQuestions.filter(q =>
          q.title.toLowerCase().includes(searchLower) ||
          q.description.toLowerCase().includes(searchLower) ||
          (q.tags && q.tags.some(tag => tag.toLowerCase().includes(searchLower)))
        );
      }

      if (filters.subject && filters.subject !== "All Subject") {
        filteredQuestions = filteredQuestions.filter(q => q.subject === filters.subject);
      }

      if (filters.difficulty && filters.difficulty !== "Any Level") {
        filteredQuestions = filteredQuestions.filter(q => q.difficulty === filters.difficulty);
      }

      if (filters.questionTypes.length > 0) {
        filteredQuestions = filteredQuestions.filter(q =>
          q.questionType && filters.questionTypes.every(type => q.questionType?.includes(type))
        );
      }

      setQuestions(filteredQuestions);

    } catch (err) {
      console.error("Error fetching exam questions:", err);
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
                          {question.title}
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