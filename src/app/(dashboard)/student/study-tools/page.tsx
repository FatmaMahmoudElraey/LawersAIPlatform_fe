"use client";

import { useState } from "react";
import StudentNavbar from "@/components/student/navbar";
import Footer from "@/components/student/footer";
import { 
  Brain, 
  FileText, 
  BookOpen, 
  MessageSquare, 
  TrendingUp, 
  Users, 
  Star,
  ArrowRight,
  Zap,
  Target,
  Lightbulb,
  Award,
  Clock,
  CheckCircle2
} from "lucide-react";

interface StudyTool {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  category: string;
  stats?: {
    users?: string;
    rating?: number;
    time?: string;
    progress?: number;
  };
  features?: string[];
  color: string;
  trending?: boolean;
  popular?: boolean;
}

export default function StudyToolsPage() {
  const [activeTab, setActiveTab] = useState("all");

  const studyTools: StudyTool[] = [
    {
      id: "ai-tutor",
      title: "AI Tutor",
      description: "Get personalized help with your legal studies from our AI assistant. Ask questions, get explanations, and receive tailored guidance.",
      icon: <Brain className="h-6 w-6" />,
      category: "ai",
      stats: {
        users: "2.5k students",
        rating: 4.8,
        time: "24/7"
      },
      features: [
        "Instant answers to legal questions",
        "Case law analysis",
        "Exam preparation help",
        "Writing assistance"
      ],
      color: "from-emerald-500 to-teal-600",
      trending: true
    },
    {
      id: "summaries",
      title: "Summaries",
      description: "Access concise summaries of complex legal topics, cases, and concepts. Perfect for quick revision and exam preparation.",
      icon: <FileText className="h-6 w-6" />,
      category: "content",
      stats: {
        users: "5.2k students",
        rating: 4.9,
        time: "Updated daily"
      },
      features: [
        "Comprehensive case summaries",
        "Key legal principles",
        "Exam-focused content",
        "Downloadable PDFs"
      ],
      color: "from-emerald-500 to-teal-600",
      popular: true
    },
    {
      id: "flashcards",
      title: "Flashcards",
      description: "Test your knowledge with interactive flashcards covering all major legal topics and cases. Track your progress and identify weak areas.",
      icon: <BookOpen className="h-6 w-6" />,
      category: "practice",
      stats: {
        users: "3.1k students",
        rating: 4.7,
        time: "10 min sessions"
      },
      features: [
        "Spaced repetition system",
        "Progress tracking",
        "Custom decks",
        "Images and diagrams"
      ],
      color: "from-emerald-500 to-teal-600"
    },
    {
      id: "practice-exams",
      title: "Practice Exams",
      description: "Take timed practice exams with real questions from past papers. Get instant feedback and detailed grading.",
      icon: <FileText className="h-6 w-6" />,
      category: "assessment",
      stats: {
        users: "4.7k students",
        rating: 4.8,
        time: "2-3 hour exams"
      },
      features: [
        "Real exam questions",
        "Timer functionality",
        "Detailed grading rubric",
        "Performance analytics"
      ],
      color: "from-emerald-500 to-teal-600"
    },
    {
      id: "discussion-forum",
      title: "Discussion Forum",
      description: "Connect with fellow law students, discuss cases, share study notes, and get help from peers and tutors.",
      icon: <MessageSquare className="h-6 w-6" />,
      category: "community",
      stats: {
        users: "6.3k students",
        rating: 4.6,
        time: "Active community"
      },
      features: [
        "Study groups",
        "Q&A forums",
        "Note sharing",
        "Tutor connections"
      ],
      color: "from-emerald-500 to-teal-600"
    },
    {
      id: "progress-tracker",
      title: "Progress Tracker",
      description: "Monitor your study progress, set goals, and track your improvement across all legal subjects.",
      icon: <TrendingUp className="h-6 w-6" />,
      category: "productivity",
      stats: {
        users: "2.8k students",
        rating: 4.5,
        time: "Real-time updates"
      },
      features: [
        "Goal setting",
        "Progress visualization",
        "Study streaks",
        "Performance insights"
      ],
      color: "from-emerald-500 to-teal-600"
    }
  ];

  const categories = [
    { id: "all", label: "All Tools", icon: <Grid className="h-4 w-4" /> },
    { id: "ai", label: "AI Tools", icon: <Brain className="h-4 w-4" /> },
    { id: "content", label: "Content", icon: <FileText className="h-4 w-4" /> },
    { id: "practice", label: "Practice", icon: <BookOpen className="h-4 w-4" /> },
    { id: "assessment", label: "Assessment", icon: <Target className="h-4 w-4" /> },
    { id: "community", label: "Community", icon: <Users className="h-4 w-4" /> },
    { id: "productivity", label: "Productivity", icon: <Zap className="h-4 w-4" /> }
  ];

  const filteredTools = activeTab === "all" 
    ? studyTools 
    : studyTools.filter(tool => tool.category === activeTab);

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <StudentNavbar />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-emerald-50 to-teal-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
              Study Tools
            </h1>
            <p className="text-xl text-slate-600 mb-8 max-w-3xl mx-auto leading-relaxed">
              Everything you need to excel in law school. AI-powered tools, comprehensive content, and a supportive community.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-8 py-3 bg-emerald-600 text-white font-semibold rounded-lg hover:bg-emerald-700 transition-colors">
                Browse All Tools
              </button>
              <button className="px-8 py-3 border border-emerald-600 text-emerald-600 font-semibold rounded-lg hover:bg-emerald-50 transition-colors">
                Get Started Free
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Category Tabs */}
      <section className="bg-white border-b border-slate-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8 overflow-x-auto">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveTab(category.id)}
                className={`flex items-center gap-2 py-4 border-b-2 transition-colors whitespace-nowrap ${
                  activeTab === category.id
                    ? 'border-emerald-500 text-emerald-600'
                    : 'border-transparent text-slate-600 hover:text-slate-900'
                }`}
              >
                {category.icon}
                <span className="font-medium">{category.label}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Tools Grid */}
      <section className="flex-1 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredTools.map((tool) => (
              <a 
                key={tool.id} 
                href={`/student/study-tools/${tool.id}`}
                className="group block"
              >
                <div className={`bg-white rounded-2xl border border-slate-200 p-8 h-full hover:shadow-lg transition-all duration-300 hover:border-emerald-300 relative overflow-hidden cursor-pointer`}>
                  {/* Trending Badge */}
                  {tool.trending && (
                    <div className="absolute top-4 right-4 px-2 py-1 bg-amber-100 text-amber-700 text-xs font-semibold rounded-full flex items-center gap-1">
                      <TrendingUp className="h-3 w-3" />
                      Trending
                    </div>
                  )}

                  {/* Popular Badge */}
                  {tool.popular && (
                    <div className="absolute top-4 right-4 px-2 py-1 bg-blue-100 text-blue-700 text-xs font-semibold rounded-full flex items-center gap-1">
                      <Star className="h-3 w-3" />
                      Popular
                    </div>
                  )}

                  {/* Tool Icon */}
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${tool.color} flex items-center justify-center mb-6 text-white shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                    {tool.icon}
                  </div>

                  {/* Tool Title */}
                  <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-emerald-600 transition-colors">
                    {tool.title}
                  </h3>

                  {/* Tool Description */}
                  <p className="text-slate-600 leading-relaxed mb-6">
                    {tool.description}
                  </p>

                  {/* Stats */}
                  {tool.stats && (
                    <div className="space-y-3 mb-6">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-slate-500">Users:</span>
                        <span className="font-semibold text-slate-900">{tool.stats.users}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-slate-500">Rating:</span>
                        <div className="flex items-center gap-1">
                          <Star className="h-4 w-4 text-amber-400 fill-current" />
                          <span className="font-semibold text-slate-900">{tool.stats.rating}</span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-slate-500">Availability:</span>
                        <span className="font-semibold text-slate-900">{tool.stats.time}</span>
                      </div>
                    </div>
                  )}

                  {/* Features List */}
                  {tool.features && (
                    <div className="mb-6">
                      <h4 className="text-sm font-semibold text-slate-900 mb-3">Key Features:</h4>
                      <ul className="space-y-2">
                        {tool.features.map((feature, index) => (
                          <li key={index} className="flex items-start gap-2 text-sm text-slate-600">
                            <CheckCircle2 className="h-4 w-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Progress Bar for tools with progress */}
                  {tool.stats?.progress !== undefined && (
                    <div className="mb-6">
                      <div className="flex justify-between text-sm mb-2">
                        <span className="text-slate-600">Your Progress</span>
                        <span className="font-semibold text-slate-900">{tool.stats.progress}%</span>
                      </div>
                      <div className="w-full bg-slate-200 rounded-full h-2">
                        <div 
                          className="bg-emerald-500 h-2 rounded-full transition-all duration-500" 
                          style={{width: `${tool.stats.progress}%`}}
                        ></div>
                      </div>
                    </div>
                  )}

                  {/* Call to Action Button */}
                  <button className={`w-full py-3 bg-gradient-to-r ${tool.color} text-white font-semibold rounded-lg hover:shadow-lg transition-all duration-300 group-hover:scale-105 flex items-center justify-center gap-2`}>
                    {tool.category === 'ai' ? (
                      <>
                        <Zap className="h-4 w-4" />
                        Launch {tool.title}
                      </>
                    ) : (
                      <>
                        <ArrowRight className="h-4 w-4" />
                        Open {tool.title}
                      </>
                    )}
                  </button>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-emerald-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="mb-8">
            <h2 className="text-3xl font-bold mb-4">Ready to Excel in Law School?</h2>
            <p className="text-xl text-emerald-100 mb-8 max-w-2xl mx-auto">
              Join thousands of students who are already using our AI-powered study tools to ace their exams.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-8 py-4 bg-white text-emerald-600 font-bold rounded-lg hover:bg-slate-100 transition-colors text-lg">
              Start Free Trial
            </button>
            <button className="px-8 py-4 border-2 border-white text-white font-semibold rounded-lg hover:bg-white/10 transition-colors text-lg">
              View Pricing
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

// Missing Grid icon - let me add it
function Grid({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <rect x="3" y="3" width="7" height="7" rx="1" />
      <rect x="14" y="3" width="7" height="7" rx="1" />
      <rect x="3" y="14" width="7" height="7" rx="1" />
      <rect x="14" y="14" width="7" height="7" rx="1" />
    </svg>
  );
}
