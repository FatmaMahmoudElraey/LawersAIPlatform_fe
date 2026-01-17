"use client";

import { useState } from "react";
import StudentNavbar from "@/components/student/navbar";
import Footer from "@/components/student/footer";
import { 
  User,
  BookOpen,
  Settings,
  LogOut,
  Home,
  Bell,
  Clock
} from "lucide-react";
import PersonalInfoTab from "./components/PersonalInfoTab";
import AcademicInfoTab from "./components/AcademicInfoTab";
import ActivityTab from "./components/ActivityTab";
import DashboardTab from "./components/DashboardTab";
import StudyToolsTab from "./components/StudyToolsTab";

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState("personal");

  const tabs = [
    { id: "dashboard", label: "Dashboard", icon: <Home className="h-5 w-5" />, section: "main" },
    { id: "personal", label: "Profile Information", icon: <User className="h-5 w-5" />, section: "student" },
    { id: "academic", label: "Academic Progress", icon: <BookOpen className="h-5 w-5" />, section: "student" },
    { id: "tools", label: "Study Tools", icon: <BookOpen className="h-5 w-5" />, section: "student" },
    { id: "notifications", label: "Notifications", icon: <Bell className="h-5 w-5" />, section: "updates" },
    { id: "activity", label: "Recent Activity", icon: <Clock className="h-5 w-5" />, section: "updates" }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <StudentNavbar />

      <main className="flex-1">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Left Sidebar - Navigation */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-xl border border-slate-200 p-6">
                <h2 className="text-lg font-semibold text-slate-900 mb-6">My Profile</h2>
                
                {/* Navigation Tabs */}
                <nav className="space-y-6">
                  {/* Dashboard Section */}
                  <div>
                    <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">Dashboard</h3>
                    <div className="space-y-2">
                      {tabs.filter(tab => tab.section === "main").map((tab) => (
                        <button
                          key={tab.id}
                          onClick={() => setActiveTab(tab.id)}
                          className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                            activeTab === tab.id
                              ? 'bg-emerald-50 text-emerald-700 border-l-4 border-emerald-500'
                              : 'text-slate-600 hover:bg-slate-50'
                          }`}
                        >
                          {tab.icon}
                          <span className="font-medium">{tab.label}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Student Hub Section */}
                  <div>
                    <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">Student Hub</h3>
                    <div className="space-y-2">
                      {tabs.filter(tab => tab.section === "student").map((tab) => (
                        <button
                          key={tab.id}
                          onClick={() => setActiveTab(tab.id)}
                          className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                            activeTab === tab.id
                              ? 'bg-emerald-50 text-emerald-700 border-l-4 border-emerald-500'
                              : 'text-slate-600 hover:bg-slate-50'
                          }`}
                        >
                          {tab.icon}
                          <span className="font-medium">{tab.label}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Updates Section */}
                  <div>
                    <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">Updates</h3>
                    <div className="space-y-2">
                      {tabs.filter(tab => tab.section === "updates").map((tab) => (
                        <button
                          key={tab.id}
                          onClick={() => setActiveTab(tab.id)}
                          className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                            activeTab === tab.id
                              ? 'bg-emerald-50 text-emerald-700 border-l-4 border-emerald-500'
                              : 'text-slate-600 hover:bg-slate-50'
                          }`}
                        >
                          {tab.icon}
                          <span className="font-medium">{tab.label}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                </nav>

                {/* Settings Link */}
                {/* <button className="w-full flex items-center gap-3 px-4 py-3 text-slate-600 hover:bg-slate-50 rounded-lg transition-colors">
                  <Settings className="h-5 w-5" />
                  <span className="font-medium">Settings</span>
                </button> */}

                {/* Logout */}
                {/* <button className="w-full flex items-center gap-3 px-4 py-3 text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                  <LogOut className="h-5 w-5" />
                  <span className="font-medium">Logout</span>
                </button> */}
              </div>
            </div>

            {/* Main Content Area */}
            <div className="lg:col-span-3">
              {/* Render active tab component */}
              {activeTab === "dashboard" && <DashboardTab />}
              {activeTab === "personal" && <PersonalInfoTab />}
              {activeTab === "academic" && <AcademicInfoTab />}
              {activeTab === "tools" && <StudyToolsTab />}
              {activeTab === "notifications" && (
                <div className="bg-white rounded-xl border border-slate-200 p-8">
                  <h2 className="text-2xl font-bold text-slate-900 mb-6">Notifications</h2>
                  <div className="space-y-4">
                    <div className="border-l-4 border-emerald-500 bg-emerald-50 p-4 rounded">
                      <h4 className="font-semibold text-slate-900">Assignment Due Tomorrow</h4>
                      <p className="text-slate-600">Contract Law Essay - 11:59 PM</p>
                    </div>
                    <div className="border-l-4 border-blue-500 bg-blue-50 p-4 rounded">
                      <h4 className="font-semibold text-slate-900">New Study Material</h4>
                      <p className="text-slate-600">Torts Chapter 5 is now available</p>
                    </div>
                  </div>
                </div>
              )}
              {activeTab === "activity" && <ActivityTab />}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
