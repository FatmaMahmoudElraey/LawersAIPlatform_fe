"use client";

import { useState } from "react";
import { User, Camera, Edit, Mail, Phone, MapPin, Calendar } from "lucide-react";
import EditProfileTab from "./EditProfileTab";

export default function PersonalInfoTab() {
  const [isEditing, setIsEditing] = useState(false);

  const handleSave = () => {
    // Here you would typically save the data to your backend
    setIsEditing(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  if (isEditing) {
    return <EditProfileTab onSave={handleSave} onCancel={handleCancel} />;
  }

  return (
    <div className="bg-white rounded-xl border border-slate-200 p-8">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-bold text-slate-900">Personal Information</h2>
        <button 
          onClick={() => setIsEditing(true)}
          className="flex items-center gap-2 px-4 py-2 bg-emerald-500 text-white font-medium rounded-lg hover:bg-emerald-600 transition-colors"
        >
          <Edit className="h-4 w-4" />
          Edit Profile
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column - Profile Picture */}
        <div className="lg:col-span-1">
          <div className="flex flex-col items-center">
            <div className="relative mb-6">
              <div className="w-40 h-40 rounded-full bg-slate-200 flex items-center justify-center">
                <User className="h-20 w-20 text-slate-400" />
              </div>
              <button className="absolute bottom-0 right-0 w-12 h-12 bg-emerald-500 rounded-full flex items-center justify-center text-white hover:bg-emerald-600 transition-colors">
                <Camera className="h-6 w-6" />
              </button>
            </div>
            <h3 className="text-xl font-semibold text-slate-900 text-center mb-1">John Doe</h3>
            <p className="text-slate-600 text-center mb-4">Law Student</p>
            <div className="flex items-center justify-center gap-2 text-sm text-slate-500">
              <Calendar className="h-4 w-4" />
              <span>Joined January 2024</span>
            </div>
          </div>
        </div>

        {/* Right Column - Personal Details */}
        <div className="lg:col-span-2">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">First Name</label>
              <div className="flex items-center gap-3 px-4 py-3 border border-slate-300 rounded-lg bg-slate-50">
                <User className="h-5 w-5 text-slate-400" />
                <input
                  type="text"
                  value="John"
                  readOnly
                  className="flex-1 bg-transparent text-slate-900 outline-none"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Last Name</label>
              <div className="flex items-center gap-3 px-4 py-3 border border-slate-300 rounded-lg bg-slate-50">
                <User className="h-5 w-5 text-slate-400" />
                <input
                  type="text"
                  value="Doe"
                  readOnly
                  className="flex-1 bg-transparent text-slate-900 outline-none"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Email</label>
              <div className="flex items-center gap-3 px-4 py-3 border border-slate-300 rounded-lg bg-slate-50">
                <Mail className="h-5 w-5 text-slate-400" />
                <input
                  type="email"
                  value="john.doe@university.edu"
                  readOnly
                  className="flex-1 bg-transparent text-slate-900 outline-none"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Phone</label>
              <div className="flex items-center gap-3 px-4 py-3 border border-slate-300 rounded-lg bg-slate-50">
                <Phone className="h-5 w-5 text-slate-400" />
                <input
                  type="tel"
                  value="+1 (555) 123-4567"
                  readOnly
                  className="flex-1 bg-transparent text-slate-900 outline-none"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Location</label>
              <div className="flex items-center gap-3 px-4 py-3 border border-slate-300 rounded-lg bg-slate-50">
                <MapPin className="h-5 w-5 text-slate-400" />
                <input
                  type="text"
                  value="Boston, MA"
                  readOnly
                  className="flex-1 bg-transparent text-slate-900 outline-none"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Date of Birth</label>
              <div className="flex items-center gap-3 px-4 py-3 border border-slate-300 rounded-lg bg-slate-50">
                <Calendar className="h-5 w-5 text-slate-400" />
                <input
                  type="text"
                  value="March 15, 1998"
                  readOnly
                  className="flex-1 bg-transparent text-slate-900 outline-none"
                />
              </div>
            </div>
          </div>

          {/* Bio Section */}
          <div className="mt-8">
            <label className="block text-sm font-medium text-slate-700 mb-2">Bio</label>
            <div className="px-4 py-3 border border-slate-300 rounded-lg bg-slate-50 min-h-[100px]">
              <p className="text-slate-900">
                Passionate law student with a focus on corporate law and intellectual property. 
                Currently in my third year at Harvard Law School, actively participating in moot court 
                competitions and legal clinics. Interested in technology law and its intersection with 
                traditional legal practice.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}