"use client";

import { BookOpen, Award, Clock, Users, TrendingUp, Calendar } from "lucide-react";

export default function DashboardTab() {
  return (
    <div className="bg-white rounded-xl border border-slate-200 p-8">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-bold text-slate-900">Dashboard</h2>
        <div className="flex items-center gap-2 text-sm text-slate-600">
          <Calendar className="h-4 w-4" />
          <span>January 17, 2026</span>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 border border-emerald-200 rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-emerald-500 rounded-lg flex items-center justify-center">
              <BookOpen className="h-6 w-6 text-white" />
            </div>
            <span className="text-xs font-medium text-emerald-700 bg-emerald-200 px-2 py-1 rounded-full">+12%</span>
          </div>
          <h3 className="text-2xl font-bold text-emerald-900 mb-1">24</h3>
          <p className="text-sm text-emerald-700">Courses Completed</p>
        </div>

        <div className="bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-200 rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center">
              <Clock className="h-6 w-6 text-white" />
            </div>
            <span className="text-xs font-medium text-blue-700 bg-blue-200 px-2 py-1 rounded-full">5 days</span>
          </div>
          <h3 className="text-2xl font-bold text-blue-900 mb-1">156</h3>
          <p className="text-sm text-blue-700">Study Hours</p>
        </div>

        <div className="bg-gradient-to-br from-purple-50 to-purple-100 border border-purple-200 rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-purple-500 rounded-lg flex items-center justify-center">
              <Award className="h-6 w-6 text-white" />
            </div>
            <span className="text-xs font-medium text-purple-700 bg-purple-200 px-2 py-1 rounded-full">New</span>
          </div>
          <h3 className="text-2xl font-bold text-purple-900 mb-1">8</h3>
          <p className="text-sm text-purple-700">Achievements</p>
        </div>

        <div className="bg-gradient-to-br from-amber-50 to-amber-100 border border-amber-200 rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-amber-500 rounded-lg flex items-center justify-center">
              <TrendingUp className="h-6 w-6 text-white" />
            </div>
            <span className="text-xs font-medium text-amber-700 bg-amber-200 px-2 py-1 rounded-full">3.8</span>
          </div>
          <h3 className="text-2xl font-bold text-amber-900 mb-1">92%</h3>
          <p className="text-sm text-amber-700">Average Score</p>
        </div>
      </div>

      {/* Recent Activity and Progress */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Activity */}
        <div className="bg-slate-50 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-slate-900 mb-4">Recent Activity</h3>
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                <BookOpen className="h-4 w-4 text-emerald-600" />
              </div>
              <div className="flex-1">
                <h4 className="font-medium text-slate-900 text-sm">Completed Contract Law Module</h4>
                <p className="text-xs text-slate-600">2 hours ago • Score: 95%</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                <Award className="h-4 w-4 text-blue-600" />
              </div>
              <div className="flex-1">
                <h4 className="font-medium text-slate-900 text-sm">Earned Research Badge</h4>
                <p className="text-xs text-slate-600">1 day ago</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                <Users className="h-4 w-4 text-purple-600" />
              </div>
              <div className="flex-1">
                <h4 className="font-medium text-slate-900 text-sm">Joined Study Group</h4>
                <p className="text-xs text-slate-600">3 days ago</p>
              </div>
            </div>
          </div>
        </div>

        {/* Progress Overview */}
        <div className="bg-slate-50 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-slate-900 mb-4">Progress Overview</h3>
          <div className="space-y-4">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-slate-700">Contract Law</span>
                <span className="text-sm text-slate-600">85%</span>
              </div>
              <div className="w-full bg-slate-200 rounded-full h-2">
                <div className="bg-emerald-500 h-2 rounded-full" style={{ width: '85%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-slate-700">Torts</span>
                <span className="text-sm text-slate-600">72%</span>
              </div>
              <div className="w-full bg-slate-200 rounded-full h-2">
                <div className="bg-blue-500 h-2 rounded-full" style={{ width: '72%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-slate-700">Criminal Law</span>
                <span className="text-sm text-slate-600">90%</span>
              </div>
              <div className="w-full bg-slate-200 rounded-full h-2">
                <div className="bg-purple-500 h-2 rounded-full" style={{ width: '90%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-slate-700">Constitutional Law</span>
                <span className="text-sm text-slate-600">68%</span>
              </div>
              <div className="w-full bg-slate-200 rounded-full h-2">
                <div className="bg-amber-500 h-2 rounded-full" style={{ width: '68%' }}></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Upcoming Deadlines */}
      <div className="mt-8">
        <h3 className="text-lg font-semibold text-slate-900 mb-4">Upcoming Deadlines</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="border border-red-200 bg-red-50 rounded-xl p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-medium text-red-700 bg-red-200 px-2 py-1 rounded-full">Tomorrow</span>
              <Calendar className="h-4 w-4 text-red-600" />
            </div>
            <h4 className="font-semibold text-slate-900 mb-1">Contract Law Essay</h4>
            <p className="text-sm text-slate-600">Due: 11:59 PM</p>
          </div>
          <div className="border border-amber-200 bg-amber-50 rounded-xl p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-medium text-amber-700 bg-amber-200 px-2 py-1 rounded-full">3 days</span>
              <Calendar className="h-4 w-4 text-amber-600" />
            </div>
            <h4 className="font-semibold text-slate-900 mb-1">Torts Quiz</h4>
            <p className="text-sm text-slate-600">Due: Friday 5:00 PM</p>
          </div>
          <div className="border border-blue-200 bg-blue-50 rounded-xl p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-medium text-blue-700 bg-blue-200 px-2 py-1 rounded-full">1 week</span>
              <Calendar className="h-4 w-4 text-blue-600" />
            </div>
            <h4 className="font-semibold text-slate-900 mb-1">Case Study Analysis</h4>
            <p className="text-sm text-slate-600">Due: Next Monday</p>
          </div>
        </div>
      </div>
    </div>
  );
}
