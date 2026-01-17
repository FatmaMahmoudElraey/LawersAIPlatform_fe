"use client";

import { useState } from "react";
import { GraduationCap, Award, TrendingUp, Calendar, BookOpen, Target, Plus } from "lucide-react";
import CourseDetailsTab from "./CourseDetailsTab";
import AddModuleTab from "./AddModuleTab";

interface Course {
  name: string;
  code: string;
  professor: string;
  credits: number;
  progress: number;
}

export default function AcademicInfoTab() {
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [showAddModule, setShowAddModule] = useState(false);

  const courses: Course[] = [
    { name: "Corporate Law", code: "LAW-401", professor: "Professor Smith", credits: 3, progress: 78 },
    { name: "Intellectual Property", code: "LAW-405", professor: "Professor Johnson", credits: 3, progress: 65 },
    { name: "Tax Law", code: "LAW-408", professor: "Professor Davis", credits: 2, progress: 82 },
    { name: "Legal Ethics", code: "LAW-410", professor: "Professor Wilson", credits: 2, progress: 71 }
  ];

  const handleCourseClick = (course: Course) => {
    setSelectedCourse(course);
  };

  const handleBackToCourses = () => {
    setSelectedCourse(null);
  };

  const handleAddModuleClick = () => {
    setShowAddModule(true);
  };

  const handleBackFromAddModule = () => {
    setShowAddModule(false);
  };

  if (selectedCourse) {
    return (
      <CourseDetailsTab
        courseName={selectedCourse.name}
        courseCode={selectedCourse.code}
        professor={selectedCourse.professor}
        credits={selectedCourse.credits}
        progress={selectedCourse.progress}
        onBack={handleBackToCourses}
      />
    );
  }

  if (showAddModule) {
    return (
      <AddModuleTab
        onBack={handleBackFromAddModule}
      />
    );
  }

  return (
    <div className="">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-bold text-slate-900">Academic Progress</h2>
        <button className="flex items-center gap-2 px-4 py-2 bg-emerald-500 text-white font-medium rounded-lg hover:bg-emerald-600 transition-colors">
          <Award className="h-4 w-4" />
          View Transcript
        </button>
      </div>

      {/* Academic Overview */}
      {/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 border border-emerald-200 rounded-xl p-6 text-center">
          <div className="w-12 h-12 bg-emerald-500 rounded-lg flex items-center justify-center mx-auto mb-4">
            <GraduationCap className="h-6 w-6 text-white" />
          </div>
          <h3 className="text-2xl font-bold text-emerald-900 mb-1">3L</h3>
          <p className="text-sm text-emerald-700">Current Year</p>
        </div>

        <div className="bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-200 rounded-xl p-6 text-center">
          <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center mx-auto mb-4">
            <TrendingUp className="h-6 w-6 text-white" />
          </div>
          <h3 className="text-2xl font-bold text-blue-900 mb-1">3.8</h3>
          <p className="text-sm text-blue-700">Current GPA</p>
        </div>

        <div className="bg-gradient-to-br from-purple-50 to-purple-100 border border-purple-200 rounded-xl p-6 text-center">
          <div className="w-12 h-12 bg-purple-500 rounded-lg flex items-center justify-center mx-auto mb-4">
            <BookOpen className="h-6 w-6 text-white" />
          </div>
          <h3 className="text-2xl font-bold text-purple-900 mb-1">24</h3>
          <p className="text-sm text-purple-700">Courses Completed</p>
        </div>

        <div className="bg-gradient-to-br from-amber-50 to-amber-100 border border-amber-200 rounded-xl p-6 text-center">
          <div className="w-12 h-12 bg-amber-500 rounded-lg flex items-center justify-center mx-auto mb-4">
            <Target className="h-6 w-6 text-white" />
          </div>
          <h3 className="text-2xl font-bold text-amber-900 mb-1">92%</h3>
          <p className="text-sm text-amber-700">Class Rank</p>
        </div>
      </div> */}




      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

        {/* Current Semester Courses */}
        <div className="lg:col-span-2 mb-8 bg-white rounded-xl border border-slate-200 p-8">
          <h3 className="text-lg font-semibold text-slate-900 mb-4">Current Semester Courses</h3>
          <div className="space-y-4">
            {courses.map((course, index) => {
              const progressColors = ['emerald', 'blue', 'purple', 'amber'];
              const color = progressColors[index % progressColors.length];

              return (
                <div
                  key={course.code}
                  className="border border-slate-200 rounded-xl p-4 hover:shadow-lg transition-shadow cursor-pointer"
                  onClick={() => handleCourseClick(course)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className={`w-12 h-12 bg-${color}-100 rounded-lg flex items-center justify-center`}>
                        <BookOpen className={`h-6 w-6 text-${color}-600`} />
                      </div>
                      <div>
                        <h4 className="font-semibold text-slate-900">{course.name}</h4>
                        <p className="text-sm text-slate-600">{course.code}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="px-2 py-1 bg-emerald-100 text-emerald-700 text-xs font-medium rounded-full">In Progress</span>
                      <p className="text-sm text-slate-600 mt-1">{course.professor}</p>
                    </div>
                  </div>
                  <div className="mt-4">
                    <div className="flex items-center justify-between text-xs text-slate-600 mb-2">
                      <span>Progress</span>
                      <span>{course.progress}%</span>
                    </div>
                    <div className="w-full bg-slate-200 rounded-full h-2">
                      <div className={`bg-${color}-500 h-2 rounded-full`} style={{ width: `${course.progress}%` }}></div>
                    </div>
                  </div>
                </div>
              );
            })}

            {/* Add New Module Button */}
            <button 
              onClick={handleAddModuleClick}
              className="w-full border-2 border-dashed border-slate-300 rounded-xl p-6 hover:border-emerald-400 hover:bg-emerald-50 transition-colors group"
            >
              <div className="flex items-center justify-center gap-3">
                <div className="w-12 h-12 bg-slate-100 rounded-lg flex items-center justify-center group-hover:bg-emerald-100 transition-colors">
                  <Plus className="h-6 w-6 text-slate-400 group-hover:text-emerald-600 transition-colors" />
                </div>
                <div className="text-left">
                  <h4 className="font-semibold text-slate-900 group-hover:text-emerald-700 transition-colors">Add New Module</h4>
                  <p className="text-sm text-slate-600 group-hover:text-emerald-600 transition-colors">Enroll in a new course or module</p>
                </div>
              </div>
            </button>
          </div>
        </div>
        {/* Right Column - Sidebar */}
        <div className="space-y-6">
          {/* Exam Readiness */}
          <div className="mb-8 bg-slate-900 rounded-xl p-6">
            {/* Title */}
            <h1 className="text-2xl font-bold text-white mb-6">Exam Readiness</h1>

            {/* Content Container - Centered */}
            <div className="flex flex-col items-center text-center">
              {/* Progress Circle */}
              <div className="mb-6">
                <div className="relative w-24 h-24 mb-4 mx-auto">
                  {/* Background circle */}
                  <div className="absolute inset-0 rounded-full bg-slate-700"></div>
                  {/* Progress arc - 78% */}
                  <div className="absolute inset-0 rounded-full border-[8px] border-transparent border-t-blue-400 border-r-blue-400 transform -rotate-45"></div>
                  {/* Center text */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-3xl font-bold text-white">78 %</span>
                  </div>
                </div>

                <div>
                  <span className="inline-block px-3 py-1 bg-emerald-500 text-white text-sm font-semibold rounded-full mb-1">
                    Ready
                  </span>
                  <p className="text-sm text-slate-300">
                    Based on your recent quiz scores and study consistency.
                  </p>
                </div>
              </div>

              {/* Subject Status - Left aligned within center container */}
              <div className="space-y-4 w-full max-w-xs">
                {/* Contract Law */}
                <div className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded border border-slate-400 flex-shrink-0"></div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <span className="text-white">Contract Law</span>
                      <span className="inline-block px-2 py-0.5 bg-emerald-500 text-white text-xs font-semibold rounded">
                        High
                      </span>
                    </div>
                  </div>
                </div>

                {/* Torts */}
                <div className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded border border-slate-400 bg-slate-400 flex items-center justify-center flex-shrink-0">
                    <svg className="w-3 h-3 text-slate-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <span className="text-white">Torts</span>
                      <span className="inline-block px-2 py-0.5 bg-yellow-500 text-white text-xs font-semibold rounded">
                        Medium
                      </span>
                    </div>
                  </div>
                </div>

                {/* Criminal Liability */}
                <div className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded border border-slate-400 bg-slate-400 flex items-center justify-center flex-shrink-0">
                    <svg className="w-3 h-3 text-slate-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <span className="text-white">Criminal Liability</span>
                      <span className="inline-block px-2 py-0.5 bg-red-500 text-white text-xs font-semibold rounded">
                        Low
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Study Goal Tracker */}
          <div className="bg-white mb-8 bg-slate-900 rounded-xl p-6">
            <div className="flex items-center justify-between mb-6">
              <h1 className="text-2xl font-bold text-slate-900">Study Goal Tracker</h1>
              <button className="text-sm text-emerald-600 hover:text-emerald-700 font-medium">
                Edit Goal
              </button>
            </div>

            {/* Progress Bar */}
            <div className="mb-6">
              <div className="mb-2">
                <span className="text-2xl font-bold text-slate-900">12.5 / 15 hrs</span>
              </div>
              <div className="w-full bg-slate-200 rounded-full h-2.5 mb-4">
                <div
                  className="bg-emerald-500 h-2.5 rounded-full"
                  style={{ width: '83.3%' }} // 12.5/15 = 83.3%
                ></div>
              </div>
              <p className="text-slate-600">
                You're on track! Only <span className="font-semibold text-slate-900">2.5 hours left to reach your weekly goal.</span>
              </p>
            </div>

            {/* Last 7 Days Activity */}
            <div>
              <h2 className="text-lg font-bold text-slate-900 mb-4">Last 7 Days Activity</h2>
              <div className="flex justify-between">
                <div className="text-center">
                  <div className="w-8 h-8  rounded bg-emerald-100 mb-1"></div>
                  <span className="text-sm text-slate-600 font-medium">M</span>
                </div>
                <div className="text-center">
                  <div className="w-8 h-8  rounded bg-emerald-100 mb-1"></div>
                  <span className="text-sm text-slate-600 font-medium">T</span>
                </div>
                <div className="text-center">
                  <div className="w-8 h-8  rounded bg-emerald-200 mb-1"></div>
                  <span className="text-sm text-slate-600 font-medium">W</span>
                </div>
                <div className="text-center">
                  <div className="w-8 h-8  rounded bg-emerald-300 mb-1"></div>
                  <span className="text-sm text-slate-600 font-medium">T</span>
                </div>
                <div className="text-center">
                  <div className="w-8 h-8  rounded bg-emerald-400 mb-1"></div>
                  <span className="text-sm text-slate-600 font-medium">F</span>
                </div>
                <div className="text-center">
                  <div className="w-8 h-8  rounded bg-emerald-500 mb-1"></div>
                  <span className="text-sm text-slate-600 font-medium">S</span>
                </div>
                <div className="text-center">
                  <div className="w-8 h-8  rounded bg-emerald-600 mb-1"></div>
                  <span className="text-sm text-slate-600 font-medium">S</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Performance Analytics */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-slate-900 mb-4">Performance Analytics</h3>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Grade Progress Chart */}
          <div className="bg-white border border-slate-200 rounded-xl p-6">
            <h4 className="text-md font-semibold text-slate-900 mb-4">Grade Progress</h4>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-600">Midterm</span>
                <div className="flex items-center gap-2">
                  <div className="w-32 bg-slate-200 rounded-full h-2">
                    <div className="bg-emerald-500 h-2 rounded-full" style={{ width: '85%' }}></div>
                  </div>
                  <span className="text-sm font-medium text-slate-900">85%</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-600">Assignments</span>
                <div className="flex items-center gap-2">
                  <div className="w-32 bg-slate-200 rounded-full h-2">
                    <div className="bg-blue-500 h-2 rounded-full" style={{ width: '92%' }}></div>
                  </div>
                  <span className="text-sm font-medium text-slate-900">92%</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-600">Participation</span>
                <div className="flex items-center gap-2">
                  <div className="w-32 bg-slate-200 rounded-full h-2">
                    <div className="bg-purple-500 h-2 rounded-full" style={{ width: '78%' }}></div>
                  </div>
                  <span className="text-sm font-medium text-slate-900">78%</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-600">Final Project</span>
                <div className="flex items-center gap-2">
                  <div className="w-32 bg-slate-200 rounded-full h-2">
                    <div className="bg-amber-500 h-2 rounded-full" style={{ width: '88%' }}></div>
                  </div>
                  <span className="text-sm font-medium text-slate-900">88%</span>
                </div>
              </div>
            </div>
          </div>

          {/* Study Time Chart */}
          <div className="bg-white border border-slate-200 rounded-xl p-6">
            <h4 className="text-md font-semibold text-slate-900 mb-4">Weekly Study Time</h4>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-600">Mon</span>
                <div className="flex items-center gap-2">
                  <div className="w-24 bg-slate-200 rounded-full h-2">
                    <div className="bg-emerald-500 h-2 rounded-full" style={{ width: '75%' }}></div>
                  </div>
                  <span className="text-sm font-medium text-slate-900">3h</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-600">Tue</span>
                <div className="flex items-center gap-2">
                  <div className="w-24 bg-slate-200 rounded-full h-2">
                    <div className="bg-blue-500 h-2 rounded-full" style={{ width: '50%' }}></div>
                  </div>
                  <span className="text-sm font-medium text-slate-900">2h</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-600">Wed</span>
                <div className="flex items-center gap-2">
                  <div className="w-24 bg-slate-200 rounded-full h-2">
                    <div className="bg-purple-500 h-2 rounded-full" style={{ width: '100%' }}></div>
                  </div>
                  <span className="text-sm font-medium text-slate-900">4h</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-600">Thu</span>
                <div className="flex items-center gap-2">
                  <div className="w-24 bg-slate-200 rounded-full h-2">
                    <div className="bg-amber-500 h-2 rounded-full" style={{ width: '87.5%' }}></div>
                  </div>
                  <span className="text-sm font-medium text-slate-900">3.5h</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-600">Fri</span>
                <div className="flex items-center gap-2">
                  <div className="w-24 bg-slate-200 rounded-full h-2">
                    <div className="bg-red-500 h-2 rounded-full" style={{ width: '62.5%' }}></div>
                  </div>
                  <span className="text-sm font-medium text-slate-900">2.5h</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}