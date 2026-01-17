"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import StudentNavbar from "@/components/student/navbar";
import Footer from "@/components/student/footer";
import { LocalStorageKeys } from "@/helpers/constants/local-storage.constant";
import {
  Bookmark,
  Share2,
  MoreHorizontal,
  ThumbsUp,
  ThumbsDown,
  Download,
  CheckCircle2,
  BookOpen,
  Tag,
  Clock,
  CalendarDays,
} from "lucide-react";


interface SummaryDetail {
  id: string | number;
  title: string;
  author: string;
  date: string;
  readTime: string;
  category: string;
  subcategory: string;
  concepts: string[];
  keyTakeaway: string;
  content: {
    sections: Array<{
      title: string;
      content: string[];
    }>;
    quotes: Array<{
      text: string;
      citation: string;
    }>;
  };
}

export default function SummaryDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [summary, setSummary] = useState<SummaryDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isClient, setIsClient] = useState(false);
  const [newComment, setNewComment] = useState("");

  const getAuthToken = () => {
    if (typeof window !== 'undefined') {
      try {
        console.log('=== DETAIL PAGE TOKEN DEBUG START ===');
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
        console.log('=== DETAIL PAGE TOKEN DEBUG END ===');
        return null;
      } catch (error) {
        console.error('Error in getAuthToken:', error);
        return null;
      }
    }
    return null;
  };

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient) return;

    const fetchSummary = async () => {
      const token = getAuthToken();

      if (!token) {
        setError("Please log in to access this summary");
        setTimeout(() => {
          router.push('/login?redirect=/student/library');
        }, 2000);
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);

        // Mock data matching the image
        const mockSummary: SummaryDetail = {
          id: 1,
          title: "Understanding the Postal Acceptance Rule",
          author: "Sarah Jenkins",
          date: "Oct 24, 2023",
          readTime: "5 min read",
          category: "Contract Law",
          subcategory: "Offer and Acceptance",
          concepts: ["TortLaw", "Negligence", "DutyOfCare", "DonoghueVStevenson", "CaseStudy"],
          keyTakeaway: "The postal rule acts as an exception to the general rule that acceptance must be communicated. It states that acceptance takes effect the moment a letter is posted, not when it is received, provided that the post is a reasonable means of communication.",
          content: {
            sections: [
              {
                title: "Historical Context",
                content: [
                  "Originating from the landmark case of Adams v Lindsell (1818), the rule was established to provide certainty in business transactions conducted by mail. At the time, mail was the primary method of long-distance communication, and without such a rule, a never-ending cycle of confirmation could occur.",
                  "The court held that if the parties contemplated the use of the post as a means of communication, the contract is formed as soon as the letter of acceptance is placed in the hands of the postal service."
                ]
              },
              {
                title: "Limitations and Exceptions",
                content: [
                  "The rule is strict but has several notable exceptions where it will not apply:",
                  "- Instantaneous Communication: It does not apply to email, fax, or telephone (Entores Ltd v Miles Far East Corp).",
                  "- Ouster of the Rule: The offerer can expressly state that acceptance must be received to be valid (Holwell Securities v Hughes).",
                  "- Unreasonable Conduct: If the letter is misaddressed or not properly stamped due to the offeree's carelessness."
                ]
              },
              {
                title: "Modern Application",
                content: [
                  "In the digital age, the relevance of the postal rule has diminished. Most modern communication is considered instantaneous. However, it remains a favorite topic for examiners testing the boundaries of 'when' a contract is formed. Understanding the distinction between instantaneous and non-instantaneous communication is vital for legal analysis."
                ]
              }
            ],
            quotes: [
              {
                text: "The acceptors had done all that was possible for them to do... the contract was complete when the letter was posted.",
                citation: "Adams v Lindsell (1818)"
              }
            ]
          }
        };

        // Simulate API delay
        setTimeout(() => {
          setSummary(mockSummary);
          setLoading(false);
        }, 500);

      } catch (err) {
        console.error("Error fetching summary:", err);
        setError(err instanceof Error ? err.message : "Failed to load summary");
        setLoading(false);
      }
    };

    fetchSummary();
  }, [isClient, router]);

  const handleSubmitComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (newComment.trim()) {
      console.log("New comment:", newComment);
      setNewComment("");
    }
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

  if (error && !summary) {
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
                  onClick={() => router.push('/student/library')}
                  className="rounded-lg border border-emerald-500 px-6 py-3 text-emerald-500 font-semibold hover:bg-emerald-50"
                >
                  Back to Library
                </button>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!summary) {
    return (
      <div className="min-h-screen flex flex-col bg-white">
        <StudentNavbar />
        <main className="flex-1">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
            <div className="text-center">
              <h1 className="text-2xl font-bold text-slate-900 mb-4">Summary Not Found</h1>
              <p className="text-slate-600 mb-6">The requested summary could not be found.</p>
              <button
                onClick={() => router.push('/student/library')}
                className="rounded-lg bg-emerald-500 px-6 py-3 text-white font-semibold hover:bg-emerald-600"
              >
                Back to Library
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
            <a href="#" className="hover:text-slate-900">
              Home
            </a>
            <span>/</span>
            <a href="#" className="hover:text-slate-900">
              {summary.category}
            </a>
            <span>/</span>
            <a href="#" className="hover:text-slate-900">
              {summary.subcategory}
            </a>
          </nav>
        </div>
      </header>

      <main className="flex-1">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* LEFT COLUMN – Article */}
            <article className="lg:col-span-8">
              {/* Title + meta + actions */}
              <div className="mb-6">
                <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-3">
                  {summary.title}
                </h1>

                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center text-slate-600 text-sm">
                    <div className="h-8 w-8 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mr-3 text-xs font-semibold">
                      {summary.author
                        ?.split(" ")
                        .map((n) => n[0])
                        .slice(0, 2)
                        .join("")}
                    </div>
                    <span className="font-medium text-slate-900 mr-2">
                      {summary.author}
                    </span>
                    <span className="mx-2">•</span>
                    <CalendarDays className="h-4 w-4 mr-1" />
                    <span>{summary.date}</span>
                    <span className="mx-2">•</span>
                    <Clock className="h-4 w-4 mr-1" />
                    <span>{summary.readTime}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button className="p-2 rounded-lg border border-slate-200 hover:bg-slate-50">
                      <Bookmark className="h-4 w-4" />
                    </button>
                    <button className="p-2 rounded-lg border border-slate-200 hover:bg-slate-50">
                      <Share2 className="h-4 w-4" />
                    </button>
                    <button className="p-2 rounded-lg border border-slate-200 hover:bg-slate-50">
                      <MoreHorizontal className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-8">
                {summary.concepts.map((concept, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-slate-200 bg-white text-slate-700 text-xs"
                  >
                    <Tag className="h-3 w-3 text-emerald-600" />
                    {concept}
                  </span>
                ))}
              </div>

              {/* Key takeaway card */}
              <div className="mb-8 rounded-xl border border-emerald-200 bg-emerald-50 p-5">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-emerald-600 mt-0.5" />
                  <div>
                    <h3 className="font-semibold text-emerald-900 mb-2">
                      Key Takeaway
                    </h3>
                    <p className="text-emerald-800 leading-relaxed">
                      {summary.keyTakeaway}
                    </p>
                  </div>
                </div>
              </div>

              {/* Intro paragraph */}
              <p className="text-slate-700 text-lg leading-relaxed mb-8">
                In contract law, the general rule is that acceptance of an offer
                is not effective until it is communicated to the offeror. However,
                the Postal Acceptance Rule (or simply the "Postal Rule") is a
                significant historical exception that law students must master.
              </p>

              {/* Sections */}
              <div className="space-y-10">
                {summary.content.sections.map((section, idx) => (
                  <section key={idx}>
                    <h2 className="text-2xl font-bold text-slate-900 mb-4 flex items-center">
                      <BookOpen className="h-5 w-5 text-emerald-600 mr-3" />
                      {section.title}
                    </h2>
                    <div className="space-y-4">
                      {section.content.map((paragraph, pIdx) => (
                        <p
                          key={pIdx}
                          className="text-slate-700 leading-relaxed"
                        >
                          {paragraph}
                        </p>
                      ))}
                    </div>

                    {idx === 0 && summary.content.quotes[0] && (
                      <blockquote className="my-6 pl-6 border-l-4 border-emerald-500">
                        <p className="text-slate-700 italic">
                          "{summary.content.quotes[0].text}"
                        </p>
                        <cite className="block mt-2 text-slate-600 not-italic">
                          — {summary.content.quotes[0].citation}
                        </cite>
                      </blockquote>
                    )}
                  </section>
                ))}
              </div>

              {/* Helpful feedback */}
              <div className="mt-12 pt-8 border-t border-slate-200">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <h3 className="text-lg font-semibold text-slate-900 mb-1">
                      Was this summary helpful?
                    </h3>
                    <p className="text-slate-600">
                      Your feedback helps us improve our content.
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <button className="inline-flex items-center gap-2 px-3 py-2 rounded-lg border border-slate-200 hover:bg-slate-50 text-sm">
                      <ThumbsUp className="h-4 w-4" />
                      Helpful
                    </button>
                    <button className="inline-flex items-center gap-2 px-3 py-2 rounded-lg border border-slate-200 hover:bg-slate-50 text-sm">
                      <ThumbsDown className="h-4 w-4" />
                      Not really
                    </button>
                    <button className="inline-flex items-center gap-2 px-3 py-2 rounded-lg border border-slate-200 hover:bg-slate-50 text-sm">
                      <Share2 className="h-4 w-4" />
                      Share
                    </button>
                  </div>
                </div>
              </div>

              {/* Discussion */}
              <div className="mt-12 pt-8 border-t border-slate-200">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-lg font-semibold text-slate-900">
                    Discussion (3)
                  </h3>
                  <select className="px-3 py-1.5 border border-slate-300 rounded text-sm text-slate-700 bg-transparent">
                    <option>Sort by Best</option>
                    <option>Sort by Newest</option>
                    <option>Sort by Oldest</option>
                  </select>
                </div>

                <div className="bg-slate-50 border border-slate-200 rounded-lg p-4 mb-6">
                  <p className="text-sm text-slate-600">
                    Be respectful and constructive.
                  </p>
                </div>

                {/* Example comments */}
                <div className="space-y-6 mb-8">
                  <div className="border border-slate-200 rounded-lg p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <span className="font-semibold text-slate-900">
                          Sarah Jenkins
                        </span>
                        <span className="ml-2 text-xs px-2 py-1 bg-emerald-100 text-emerald-700 rounded">
                          Author
                        </span>
                        <span className="ml-2 text-sm text-slate-500">
                          1 day ago
                        </span>
                      </div>
                    </div>
                    <p className="text-slate-700">
                      Excellent question, Marcus! The general consensus (though
                      still debated) is that email is largely treated as
                      instantaneous. However, the exact moment of effectiveness
                      usually depends on when it reaches the recipient's server…
                    </p>
                  </div>

                  <div className="border border-slate-200 rounded-lg p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <span className="font-semibold text-slate-900">
                          Anna Lee
                        </span>
                        <span className="ml-2 text-sm text-slate-500">
                          2 days ago
                        </span>
                      </div>
                    </div>
                    <p className="text-slate-700">
                      Does the postal rule apply if I use a private courier
                      service instead of the Royal Mail?
                    </p>
                  </div>
                </div>

                <form onSubmit={handleSubmitComment}>
                  <textarea
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder="Add to the discussion..."
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent bg-transparent"
                    rows={3}
                  />
                  <div className="flex justify-end">
                    <button
                      type="submit"
                      className="px-4 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600"
                      disabled={!newComment.trim()}
                    >
                      Reply
                    </button>
                  </div>
                </form>
              </div>
            </article>

            {/* RIGHT COLUMN – Sidebar */}
            <aside className="lg:col-span-4 space-y-6">
              {/* Challenge card */}
              <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm">
                <h3 className="text-base font-semibold text-slate-900 mb-4">
                  Challenge
                </h3>
                <ul className="space-y-3 text-sm text-slate-700">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-emerald-600 mt-0.5" />
                    Outline an acceptance letter in 3 minutes
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-emerald-600 mt-0.5" />
                    Identify one limitation to the postal rule
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-emerald-600 mt-0.5" />
                    Explain its modern application
                  </li>
                </ul>
              </div>

              {/* Related information card */}
              <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm">
                <h3 className="text-base font-semibold text-slate-900 mb-4">
                  Related Information
                </h3>
                <div className="space-y-4 text-sm text-slate-700">
                  <div>
                    <h4 className="font-semibold text-slate-900 mb-2">
                      Basic Information
                    </h4>
                    <ul className="space-y-1">
                      <li>
                        <span className="text-slate-500">Category: </span>
                        {summary.category}
                      </li>
                      <li>
                        <span className="text-slate-500">Subcategory: </span>
                        {summary.subcategory}
                      </li>
                      <li>
                        <span className="text-slate-500">Concepts: </span>
                        {summary.concepts.length}
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-900 mb-2">
                      Leading Cases
                    </h4>
                    <ul className="list-disc list-inside space-y-1">
                      <li>Adams v Lindsell (1818)</li>
                      <li>Holwell Securities v Hughes (1974)</li>
                      <li>Entores Ltd v Miles Far East Corp (1955)</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Study offline card */}
              <div className="rounded-xl p-6 bg-gradient-to-br from-emerald-500 to-emerald-600 text-white shadow-sm">
                <h3 className="text-lg font-semibold mb-2">Study Offline</h3>
                <p className="text-emerald-50 mb-4 text-sm">
                  Download this summary as a PDF to study without internet.
                </p>
                <button className="inline-flex items-center gap-2 rounded-lg bg-white/10 px-4 py-2 text-white hover:bg-white/20 border border-white/20 text-sm">
                  <Download className="h-4 w-4" />
                  Download PDF
                </button>
              </div>
            </aside>
          </div>
        </div>
      </main>

      {/* Footer – keep as is */}
      <footer className="bg-slate-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <div>
              <h3 className="text-sm font-semibold text-slate-400 mb-4">Legal</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-slate-300 hover:text-white">
                    Privacy
                  </a>
                </li>
                <li>
                  <a href="#" className="text-slate-300 hover:text-white">
                    Terms
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-slate-400 mb-4">
                Company
              </h3>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-slate-300 hover:text-white">
                    About Us
                  </a>
                </li>
                <li>
                  <a href="#" className="text-slate-300 hover:text-white">
                    Careers
                  </a>
                </li>
                <li>
                  <a href="#" className="text-slate-300 hover:text-white">
                    Blog
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-slate-400 mb-4">
                Platform
              </h3>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-slate-300 hover:text-white">
                    AI Tutor
                  </a>
                </li>
                <li>
                  <a href="#" className="text-slate-300 hover:text-white">
                    Summaries
                  </a>
                </li>
                <li>
                  <a href="#" className="text-slate-300 hover:text-white">
                    Flashcards
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="pt-8 border-t border-slate-800 text-center text-sm text-slate-400">
            <p>© 2024 LawSimple Inc. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}