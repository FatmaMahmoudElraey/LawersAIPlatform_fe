"use client";

import { ArrowLeft, Calendar, Clock, BookOpen, User, FileText, Award, TrendingUp } from "lucide-react";

interface CourseDetailsTabProps {
  courseName: string;
  courseCode: string;
  professor: string;
  credits: number;
  progress: number;
  onBack: () => void;
}

export default function CourseDetailsTab({ 
  courseName, 
  courseCode, 
  professor, 
  credits, 
  progress, 
  onBack 
}: CourseDetailsTabProps) {
  return (
    <div className="bg-white rounded-xl border border-slate-200 p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <button 
            onClick={onBack}
            className="flex items-center gap-2 px-4 py-2 border border-slate-300 text-slate-700 font-medium rounded-lg hover:bg-slate-50 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Courses
          </button>
          <div className="h-8 w-px bg-slate-300"></div>
          <div>
            <h2 className="text-2xl font-bold text-slate-900">{courseName}</h2>
            <p className="text-slate-600">{courseCode}</p>
          </div>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-emerald-500 text-white font-medium rounded-lg hover:bg-emerald-600 transition-colors">
          <BookOpen className="h-4 w-4" />
          View Materials
        </button>
      </div>

      {/* Course Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 border border-emerald-200 rounded-xl p-6 text-center">
          <div className="w-12 h-12 bg-emerald-500 rounded-lg flex items-center justify-center mx-auto mb-4">
            <User className="h-6 w-6 text-white" />
          </div>
          <h3 className="text-lg font-bold text-emerald-900 mb-1">{professor}</h3>
          <p className="text-sm text-emerald-700">Professor</p>
        </div>

        <div className="bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-200 rounded-xl p-6 text-center">
          <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center mx-auto mb-4">
            <Award className="h-6 w-6 text-white" />
          </div>
          <h3 className="text-lg font-bold text-blue-900 mb-1">{credits}</h3>
          <p className="text-sm text-blue-700">Credits</p>
        </div>

        <div className="bg-gradient-to-br from-purple-50 to-purple-100 border border-purple-200 rounded-xl p-6 text-center">
          <div className="w-12 h-12 bg-purple-500 rounded-lg flex items-center justify-center mx-auto mb-4">
            <TrendingUp className="h-6 w-6 text-white" />
          </div>
          <h3 className="text-lg font-bold text-purple-900 mb-1">{progress}%</h3>
          <p className="text-sm text-purple-700">Progress</p>
        </div>

        <div className="bg-gradient-to-br from-amber-50 to-amber-100 border border-amber-200 rounded-xl p-6 text-center">
          <div className="w-12 h-12 bg-amber-500 rounded-lg flex items-center justify-center mx-auto mb-4">
            <Clock className="h-6 w-6 text-white" />
          </div>
          <h3 className="text-lg font-bold text-amber-900 mb-1">A-</h3>
          <p className="text-sm text-amber-700">Current Grade</p>
        </div>
      </div>

      {/* Course Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-8">
          {/* Modules */}
          <div>
            <h3 className="text-lg font-semibold text-slate-900 mb-4">Course Modules</h3>
            <div className="space-y-4">
              <div className="border border-slate-200 rounded-xl p-4 hover:shadow-lg transition-shadow">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h4 className="font-semibold text-slate-900">Module 1: Introduction to Corporate Law</h4>
                    <p className="text-sm text-slate-600">8 lessons • 2 assignments</p>
                  </div>
                  <span className="px-2 py-1 bg-emerald-100 text-emerald-700 text-xs font-medium rounded-full">Completed</span>
                </div>
                <div className="w-full bg-slate-200 rounded-full h-2">
                  <div className="bg-emerald-500 h-2 rounded-full" style={{ width: '100%' }}></div>
                </div>
              </div>

              <div className="border border-slate-200 rounded-xl p-4 hover:shadow-lg transition-shadow">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h4 className="font-semibold text-slate-900">Module 2: Corporate Structure</h4>
                    <p className="text-sm text-slate-600">6 lessons • 1 quiz</p>
                  </div>
                  <span className="px-2 py-1 bg-emerald-100 text-emerald-700 text-xs font-medium rounded-full">Completed</span>
                </div>
                <div className="w-full bg-slate-200 rounded-full h-2">
                  <div className="bg-emerald-500 h-2 rounded-full" style={{ width: '100%' }}></div>
                </div>
              </div>

              <div className="border border-slate-200 rounded-xl p-4 hover:shadow-lg transition-shadow">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h4 className="font-semibold text-slate-900">Module 3: Mergers and Acquisitions</h4>
                    <p className="text-sm text-slate-600">10 lessons • 3 assignments</p>
                  </div>
                  <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs font-medium rounded-full">In Progress</span>
                </div>
                <div className="w-full bg-slate-200 rounded-full h-2">
                  <div className="bg-blue-500 h-2 rounded-full" style={{ width: '65%' }}></div>
                </div>
              </div>

              <div className="border border-slate-200 rounded-xl p-4 hover:shadow-lg transition-shadow opacity-60">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h4 className="font-semibold text-slate-900">Module 4: Securities Regulation</h4>
                    <p className="text-sm text-slate-600">8 lessons • 2 assignments</p>
                  </div>
                  <span className="px-2 py-1 bg-slate-100 text-slate-600 text-xs font-medium rounded-full">Locked</span>
                </div>
                <div className="w-full bg-slate-200 rounded-full h-2">
                  <div className="bg-slate-400 h-2 rounded-full" style={{ width: '0%' }}></div>
                </div>
              </div>
            </div>
          </div>

          {/* Assignments */}
          <div>
            <h3 className="text-lg font-semibold text-slate-900 mb-4">Upcoming Assignments</h3>
            <div className="space-y-4">
              <div className="border border-red-200 bg-red-50 rounded-xl p-4">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h4 className="font-semibold text-slate-900">M&A Case Study Analysis</h4>
                    <p className="text-sm text-slate-600">Module 3 Assignment</p>
                  </div>
                  <span className="px-2 py-1 bg-red-100 text-red-700 text-xs font-medium rounded-full">Due Tomorrow</span>
                </div>
                <div className="flex items-center gap-4 text-sm text-slate-600">
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    <span>Oct 25, 2024</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    <span>11:59 PM</span>
                  </div>
                </div>
              </div>

              <div className="border border-amber-200 bg-amber-50 rounded-xl p-4">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h4 className="font-semibold text-slate-900">Securities Regulation Quiz</h4>
                    <p className="text-sm text-slate-600">Module 4 Quiz</p>
                  </div>
                  <span className="px-2 py-1 bg-amber-100 text-amber-700 text-xs font-medium rounded-full">Due in 3 days</span>
                </div>
                <div className="flex items-center gap-4 text-sm text-slate-600">
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    <span>Oct 27, 2024</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    <span>5:00 PM</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Course Info */}
          <div className="bg-slate-50 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-slate-900 mb-4">Course Information</h3>
            <div className="space-y-4">
              <div>
                <p className="text-sm text-slate-600 mb-1">Schedule</p>
                <p className="font-medium text-slate-900">Mon, Wed, Fri • 10:00 AM</p>
              </div>
              <div>
                <p className="text-sm text-slate-600 mb-1">Location</p>
                <p className="font-medium text-slate-900">Room 204, Law Building</p>
              </div>
              <div>
                <p className="text-sm text-slate-600 mb-1">Office Hours</p>
                <p className="font-medium text-slate-900">Tue, Thu • 2:00 PM - 4:00 PM</p>
              </div>
            </div>
          </div>

          {/* Resources */}
          <div className="bg-slate-50 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-slate-900 mb-4">Course Resources</h3>
            <div className="space-y-3">
              <button className="w-full flex items-center gap-3 p-3 border border-slate-200 rounded-lg hover:bg-white transition-colors text-left">
                <FileText className="h-5 w-5 text-slate-400" />
                <div>
                  <p className="font-medium text-slate-900">Syllabus</p>
                  <p className="text-xs text-slate-600">PDF • 2.3 MB</p>
                </div>
              </button>
              <button className="w-full flex items-center gap-3 p-3 border border-slate-200 rounded-lg hover:bg-white transition-colors text-left">
                <BookOpen className="h-5 w-5 text-slate-400" />
                <div>
                  <p className="font-medium text-slate-900">Textbook</p>
                  <p className="text-xs text-slate-600">Corporate Law, 5th Ed.</p>
                </div>
              </button>
              <button className="w-full flex items-center gap-3 p-3 border border-slate-200 rounded-lg hover:bg-white transition-colors text-left">
                <FileText className="h-5 w-5 text-slate-400" />
                <div>
                  <p className="font-medium text-slate-900">Study Guide</p>
                  <p className="text-xs text-slate-600">PDF • 1.8 MB</p>
                </div>
              </button>
            </div>
          </div>

          {/* Progress Overview */}
          <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 border border-emerald-200 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-emerald-900 mb-4">Overall Progress</h3>
            <div className="space-y-4">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-emerald-700">Course Completion</span>
                  <span className="text-sm text-emerald-900 font-semibold">{progress}%</span>
                </div>
                <div className="w-full bg-emerald-200 rounded-full h-3">
                  <div className="bg-emerald-500 h-3 rounded-full" style={{ width: `${progress}%` }}></div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 text-center">
                <div>
                  <p className="text-2xl font-bold text-emerald-900">12</p>
                  <p className="text-xs text-emerald-700">Lessons Completed</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-emerald-900">3</p>
                  <p className="text-xs text-emerald-700">Assignments Done</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
