"use client";

import { BookOpen, Award, Calendar, Clock } from "lucide-react";

export default function ActivityTab() {
  return (
    <div className="bg-white rounded-xl border border-slate-200 p-8">
      <h2 className="text-2xl font-bold text-slate-900 mb-8">Recent Activity</h2>
      
      <div className="space-y-6">
        {/* Activity 1 */}
        <div className="flex items-start gap-4 pb-6 border-b border-slate-200">
          <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center flex-shrink-0">
            <BookOpen className="h-5 w-5 text-emerald-600" />
          </div>
          <div className="flex-1">
            <h4 className="font-semibold text-slate-900 mb-1">Completed Contract Law Module</h4>
            <p className="text-sm text-slate-600 mb-2">Finished all lessons and quizzes with 95% score</p>
            <p className="text-xs text-slate-500">2 hours ago</p>
          </div>
        </div>
        
        {/* Activity 2 */}
        <div className="flex items-start gap-4 pb-6 border-b border-slate-200">
          <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
            <Award className="h-5 w-5 text-blue-600" />
          </div>
          <div className="flex-1">
            <h4 className="font-semibold text-slate-900 mb-1">Earned "Legal Research" Badge</h4>
            <p className="text-sm text-slate-600 mb-2">Completed advanced research training course</p>
            <p className="text-xs text-slate-500">1 day ago</p>
          </div>
        </div>
        
        {/* Activity 3 */}
        <div className="flex items-start gap-4 pb-6 border-b border-slate-200">
          <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
            <Calendar className="h-5 w-5 text-purple-600" />
          </div>
          <div className="flex-1">
            <h4 className="font-semibold text-slate-900 mb-1">Joined Study Group</h4>
            <p className="text-sm text-slate-600 mb-2">Torts & Contracts study group created</p>
            <p className="text-xs text-slate-500">3 days ago</p>
          </div>
        </div>
        
        {/* Activity 4 */}
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center flex-shrink-0">
            <Clock className="h-5 w-5 text-amber-600" />
          </div>
          <div className="flex-1">
            <h4 className="font-semibold text-slate-900 mb-1">Study Streak: 15 Days</h4>
            <p className="text-sm text-slate-600 mb-2">Consistent daily study progress</p>
            <p className="text-xs text-slate-500">5 days ago</p>
          </div>
        </div>
      </div>
    </div>
  );
}