"use client";

import { useState } from "react";
import { Search, Plus, ArrowLeft, Clock, Users, Star, BookOpen, X } from "lucide-react";

interface Module {
  id: string;
  title: string;
  category: string;
  description: string;
  duration: string;
  students: number;
  rating: number;
  level: string;
  code: string;
  instructor: string;
}

export default function AddModuleTab({ onBack }: { onBack: () => void }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [formData, setFormData] = useState({
    moduleName: "",
    moduleCode: "",
    category: "",
    description: "",
    duration: "",
    instructor: "",
    level: ""
  });

  const modules: Module[] = [
    {
      id: "1",
      title: "Constitutional Law",
      category: "Core Subject",
      description: "Study the fundamental principles by which a government exercises its authority, focusing on citizen rights and state powers.",
      duration: "12 weeks",
      students: 145,
      rating: 4.8,
      level: "Intermediate",
      code: "LAW-301",
      instructor: "Prof. Sarah Johnson"
    },
    {
      id: "2", 
      title: "International Law",
      category: "International Law",
      description: "Examine the rules governing relations between nations, including treaties, maritime law, and diplomatic immunity.",
      duration: "14 weeks",
      students: 87,
      rating: 4.7,
      level: "Advanced",
      code: "LAW-304",
      instructor: "Prof. James Wilson"
    },
    {
      id: "3",
      title: "Human Rights",
      category: "Human Rights",
      description: "Explore the protection of universal rights through legal frameworks at both regional and global levels.",
      duration: "10 weeks",
      students: 132,
      rating: 4.6,
      level: "Intermediate",
      code: "LAW-302",
      instructor: "Prof. Michael Chen"
    },
    {
      id: "4",
      title: "Property Law",
      category: "Property Law",
      description: "Understand legal relations between people and property, covering ownership, leases, and land registration.",
      duration: "8 weeks",
      students: 98,
      rating: 4.9,
      level: "Beginner",
      code: "LAW-303",
      instructor: "Prof. Emily Davis"
    },
    {
      id: "5",
      title: "Company Law",
      category: "Company Law",
      description: "A deep dive into corporate structures, governance, shareholder rights, and the duties of company directors.",
      duration: "12 weeks",
      students: 156,
      rating: 4.5,
      level: "Intermediate",
      code: "LAW-305",
      instructor: "Prof. Robert Brown"
    },
    {
      id: "6",
      title: "Jurisprudence",
      category: "Jurisprudence",
      description: "Explore the philosophy of law, analyzing its nature and the concepts that underly the entire legal system.",
      duration: "6 weeks",
      students: 67,
      rating: 4.4,
      level: "Advanced",
      code: "LAW-306",
      instructor: "Prof. Maria Garcia"
    }
  ];

  const filteredModules = modules.filter(module => {
    return module.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
           module.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
           module.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
           module.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
           module.instructor.toLowerCase().includes(searchQuery.toLowerCase());
  });

  const handleAddToDashboard = (moduleId: string) => {
    console.log("Adding module to dashboard:", moduleId);
  };

  const handlePreviewSyllabus = (moduleId: string) => {
    console.log("Previewing syllabus for module:", moduleId);
  };

  const handleCreateModule = () => {
    console.log("Creating custom module:", formData);
    setShowCreateModal(false);
    setFormData({
      moduleName: "",
      moduleCode: "",
      category: "",
      description: "",
      duration: "",
      instructor: "",
      level: ""
    });
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <>
      <div className="bg-white rounded-xl border border-slate-200 p-8">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={onBack}
            className="inline-flex items-center gap-2 text-slate-600 hover:text-emerald-600 transition-colors mb-4"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Academic Progress</span>
          </button>
          <h1 className="text-2xl font-bold text-slate-900 mb-2">Explore New Modules</h1>
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <p className="text-slate-700 mb-6">
                Expand your legal knowledge. Discover and enroll in new specialized law subjects curated for your curriculum.
              </p>
            </div>
            <button 
              onClick={() => setShowCreateModal(true)}
              className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-500 text-white font-medium rounded-lg hover:bg-emerald-600 transition-colors ml-4"
            >
              <Plus className="h-4 w-4" />
              Create Custom Module
            </button>
          </div>
        </div>

        {/* Search */}
        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400" />
            <input
              type="text"
              placeholder="Search for subjects, topics, or course codes (e.g., 'Constitutional Law')"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent bg-transparent"
            />
          </div>
        </div>

        <div className="h-px bg-slate-200 my-8"></div>

        {/* Filter Headers with Module Count */}
        <div className="mb-6">
          <div className="flex items-center justify-between">
            {/* Right: Module Count */}
            <div className="text-slate-600">
              {filteredModules.length} modules
            </div>
            {/* Left: Filter Buttons */}
            <div className="flex items-center gap-8">
              <button className="text-slate-700 hover:text-emerald-600 font-medium transition-colors">
                All Categories ▼
              </button>
              <button className="text-slate-700 hover:text-emerald-600 font-medium transition-colors">
                Most Popular ▼
              </button>
            </div>
          </div>
        </div>

        {/* Modules List */}
        <div className="space-y-8">
          {filteredModules.map((module) => (
            <div key={module.id} className="pb-8 border-b border-slate-200 last:border-b-0 last:pb-0">
              {/* Category Badge */}
              <div className="mb-3">
                <span className="inline-block px-3 py-1 bg-emerald-100 text-emerald-700 text-sm font-medium rounded-full">
                  {module.category}
                </span>
              </div>
              
              {/* Module Title */}
              <h4 className="text-xl font-bold text-slate-900 mb-3">
                {module.title}
              </h4>
              
              {/* Description */}
              <p className="text-slate-700 mb-4">
                {module.description}
              </p>

              {/* Module Details */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4 text-sm">
                <div className="flex items-center gap-2">
                  <span className="text-slate-500">Code:</span>
                  <span className="font-medium text-slate-900">{module.code}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-slate-400" />
                  <span className="text-slate-600">{module.duration}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-slate-400" />
                  <span className="text-slate-600">{module.students} students</span>
                </div>
                <div className="flex items-center gap-2">
                  <Star className="h-4 w-4 text-amber-400 fill-current" />
                  <span className="text-slate-600">{module.rating}</span>
                </div>
              </div>

              <div className="mb-4">
                <span className="text-sm text-slate-500">Instructor: </span>
                <span className="text-sm font-medium text-slate-900">{module.instructor}</span>
              </div>
              
              {/* Action Buttons */}
              <div className="flex gap-4">
                <button
                  onClick={() => handlePreviewSyllabus(module.id)}
                  className="text-emerald-600 hover:text-emerald-700 font-medium transition-colors"
                >
                  Preview Syllabus
                </button>
                <button
                  onClick={() => handleAddToDashboard(module.id)}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-500 text-white font-medium rounded-lg hover:bg-emerald-600 transition-colors"
                >
                  <Plus className="h-4 w-4" />
                  Add to Dashboard
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* No Results */}
        {filteredModules.length === 0 && (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="h-8 w-8 text-slate-400" />
            </div>
            <h3 className="text-lg font-semibold text-slate-900 mb-2">No modules found</h3>
            <p className="text-slate-600">Try adjusting your search or filter criteria</p>
          </div>
        )}
      </div>

     {/* Create Custom Module Modal */}
{showCreateModal && (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
    <div className="bg-white rounded-xl border border-slate-200 w-full max-w-3xl max-h-[90vh] overflow-y-auto">
      {/* Modal Header */}
      <div className="p-8 border-b border-slate-200">
        <h1 className="text-2xl font-bold text-slate-900 mb-4">Create Your Own Module</h1>
        <p className="text-slate-700 mb-6">
          Define your unique learning path. Set your goals and let our AI help you structure your legal studies.
        </p>
      </div>

      {/* Modal Body */}
      <div className="px-8 pb-8">
        {/* Module Name */}
        <div className="mb-8">
          <h2 className="text-lg font-bold text-slate-900 mb-4">Module Name</h2>
          <input
            type="text"
            placeholder="e.g., Advanced Human Rights"
            className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent bg-transparent"
          />
        </div>

        {/* Short Description */}
        <div className="mb-8">
          <h2 className="text-lg font-bold text-slate-900 mb-4">Short Description</h2>
          <textarea
            placeholder="Brief description of your custom module..."
            rows={3}
            className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent bg-transparent resize-none"
          />
        </div>

        {/* Subject Category */}
        <div className="mb-8">
          <h2 className="text-lg font-bold text-slate-900 mb-4">Subject Category</h2>
          <select className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent bg-transparent">
            <option value="">Select category</option>
            <option value="Core Subject">Core Subject</option>
            <option value="International Law">International Law</option>
            <option value="Human Rights">Human Rights</option>
            <option value="Property Law">Property Law</option>
            <option value="Company Law">Company Law</option>
            <option value="Jurisprudence">Jurisprudence</option>
            <option value="Custom">Custom</option>
          </select>
        </div>

        {/* Primary Study Goal */}
        <div className="mb-8">
          <h2 className="text-lg font-bold text-slate-900 mb-4">Primary Study Goal</h2>
          <input
            type="text"
            placeholder="e.g., Master case law"
            className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent bg-transparent"
          />
        </div>

        {/* Weekly Study Target */}
        <div className="mb-8">
          <h2 className="text-lg font-bold text-slate-900 mb-4">Weekly Study Target (Hours)</h2>
          <div className="flex items-center gap-4 mb-4">
            <input
              type="range"
              min="1"
              max="40"
              defaultValue="8"
              className="flex-1"
            />
            <div className="w-16 h-16 bg-emerald-100 rounded-lg flex items-center justify-center">
              <span className="text-xl font-bold text-emerald-700">8h</span>
            </div>
          </div>
          <div className="flex gap-3">
            <button className="px-3 py-2 border border-slate-300 text-slate-600 rounded-lg hover:bg-slate-50 transition-colors text-sm">
              1h
            </button>
            <button className="px-3 py-2 border border-emerald-300 bg-emerald-50 text-emerald-700 rounded-lg hover:bg-emerald-100 transition-colors text-sm">
              8h
            </button>
            <button className="px-3 py-2 border border-slate-300 text-slate-600 rounded-lg hover:bg-slate-50 transition-colors text-sm">
              20h
            </button>
            <button className="px-3 py-2 border border-slate-300 text-slate-600 rounded-lg hover:bg-slate-50 transition-colors text-sm">
              40h
            </button>
          </div>
        </div>

        <div className="h-px bg-slate-200 my-8"></div>

        {/* AI-Generated Curriculum */}
        <div className="mb-8">
          <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
            <span className="text-emerald-600"></span>
            AI-Generated Curriculum
          </h3>
          <p className="text-slate-700 mb-4">
            Automatically suggest a study path based on your title.
          </p>
          <button className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-100 text-emerald-700 rounded-lg hover:bg-emerald-200 transition-colors">
            Generate AI Curriculum
          </button>
        </div>

        <div className="h-px bg-slate-200 my-8"></div>

        {/* Footer Buttons */}
        <div className="flex justify-between items-center">
          <button
            onClick={() => setShowCreateModal(false)}
            className="px-6 py-3 text-slate-600 hover:text-slate-800 font-medium transition-colors"
          >
            Cancel
          </button>
          <button className="px-6 py-3 bg-emerald-500 text-white font-medium rounded-lg hover:bg-emerald-600 transition-colors">
            Create & Add to Dashboard
          </button>
        </div>
      </div>
    </div>
  </div>
)}
    </>
  );
}