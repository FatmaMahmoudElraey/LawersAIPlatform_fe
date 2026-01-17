"use client";

import { BookOpen, Brain, FileText, Calculator, MessageCircle, Zap } from "lucide-react";

export default function StudyToolsTab() {
  const tools = [
    {
      id: "ai-tutor",
      title: "AI Tutor",
      description: "Get help with complex legal concepts",
      icon: Brain,
      color: "emerald"
    },
    {
      id: "case-brief",
      title: "Case Brief Builder",
      description: "Create structured case summaries",
      icon: FileText,
      color: "blue"
    },
    {
      id: "flashcards",
      title: "Smart Flashcards",
      description: "Memorize key legal terms and concepts",
      icon: BookOpen,
      color: "purple"
    },
    {
      id: "calculator",
      title: "GPA Calculator",
      description: "Track your academic performance",
      icon: Calculator,
      color: "amber"
    },
    {
      id: "study-groups",
      title: "Study Groups",
      description: "Connect with peers for collaborative learning",
      icon: MessageCircle,
      color: "indigo"
    },
    {
      id: "exam-prep",
      title: "Exam Prep Assistant",
      description: "Personalized exam preparation tools",
      icon: Zap,
      color: "rose"
    }
  ];

  const getColorClasses = (color: string) => {
    const colorMap: { [key: string]: { bg: string; icon: string; hover: string } } = {
      emerald: { bg: "bg-emerald-100", icon: "text-emerald-600", hover: "hover:bg-emerald-50" },
      blue: { bg: "bg-blue-100", icon: "text-blue-600", hover: "hover:bg-blue-50" },
      purple: { bg: "bg-purple-100", icon: "text-purple-600", hover: "hover:bg-purple-50" },
      amber: { bg: "bg-amber-100", icon: "text-amber-600", hover: "hover:bg-amber-50" },
      indigo: { bg: "bg-indigo-100", icon: "text-indigo-600", hover: "hover:bg-indigo-50" },
      rose: { bg: "bg-rose-100", icon: "text-rose-600", hover: "hover:bg-rose-50" }
    };
    return colorMap[color] || colorMap.emerald;
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200 p-8">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-slate-900 mb-2">Study Tools</h2>
        <p className="text-slate-700">
          Enhance your learning experience with our comprehensive suite of legal study tools.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tools.map((tool) => {
          const colors = getColorClasses(tool.color);
          const Icon = tool.icon;
          
          return (
            <div
              key={tool.id}
              className={`border border-slate-200 rounded-xl p-6 cursor-pointer transition-all duration-200 ${colors.hover} hover:shadow-lg hover:-translate-y-1`}
            >
              <div className={`w-12 h-12 ${colors.bg} rounded-lg flex items-center justify-center mb-4`}>
                <Icon className={`h-6 w-6 ${colors.icon}`} />
              </div>
              <h3 className="font-semibold text-slate-900 mb-2">{tool.title}</h3>
              <p className="text-slate-600 text-sm">{tool.description}</p>
            </div>
          );
        })}
      </div>

      <div className="mt-8 p-6 bg-emerald-50 rounded-xl border border-emerald-200">
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 bg-emerald-500 rounded-lg flex items-center justify-center flex-shrink-0">
            <Zap className="h-5 w-5 text-white" />
          </div>
          <div>
            <h3 className="font-semibold text-slate-900 mb-2">Pro Tip</h3>
            <p className="text-slate-700 text-sm">
              Combine multiple tools for maximum effectiveness. Use the AI Tutor to understand concepts, 
              then create flashcards to reinforce your learning.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
