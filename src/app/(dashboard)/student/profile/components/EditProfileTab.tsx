"use client";

import { User, Camera, X, Save, Mail, Phone, MapPin, Calendar } from "lucide-react";

interface EditProfileTabProps {
  onSave: () => void;
  onCancel: () => void;
}

export default function EditProfileTab({ onSave, onCancel }: EditProfileTabProps) {
  return (
    <div className="bg-white rounded-xl border border-slate-200 p-8">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-bold text-slate-900">Edit Profile</h2>
        <div className="flex items-center gap-3">
          <button 
            onClick={onCancel}
            className="flex items-center gap-2 px-4 py-2 border border-slate-300 text-slate-700 font-medium rounded-lg hover:bg-slate-50 transition-colors"
          >
            <X className="h-4 w-4" />
            Cancel
          </button>
          <button 
            onClick={onSave}
            className="flex items-center gap-2 px-4 py-2 bg-emerald-500 text-white font-medium rounded-lg hover:bg-emerald-600 transition-colors"
          >
            <Save className="h-4 w-4" />
            Save Changes
          </button>
        </div>
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
            <button className="text-emerald-600 hover:text-emerald-700 font-medium text-sm">
              Change Photo
            </button>
          </div>
        </div>

        {/* Right Column - Personal Details */}
        <div className="lg:col-span-2">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">First Name</label>
              <div className="flex items-center gap-3 px-4 py-3 border border-slate-300 rounded-lg focus-within:border-emerald-500 focus-within:ring-2 focus-within:ring-emerald-100">
                <User className="h-5 w-5 text-slate-400" />
                <input
                  type="text"
                  defaultValue="John"
                  className="flex-1 bg-transparent text-slate-900 outline-none"
                  placeholder="Enter first name"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Last Name</label>
              <div className="flex items-center gap-3 px-4 py-3 border border-slate-300 rounded-lg focus-within:border-emerald-500 focus-within:ring-2 focus-within:ring-emerald-100">
                <User className="h-5 w-5 text-slate-400" />
                <input
                  type="text"
                  defaultValue="Doe"
                  className="flex-1 bg-transparent text-slate-900 outline-none"
                  placeholder="Enter last name"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Email</label>
              <div className="flex items-center gap-3 px-4 py-3 border border-slate-300 rounded-lg focus-within:border-emerald-500 focus-within:ring-2 focus-within:ring-emerald-100">
                <Mail className="h-5 w-5 text-slate-400" />
                <input
                  type="email"
                  defaultValue="john.doe@university.edu"
                  className="flex-1 bg-transparent text-slate-900 outline-none"
                  placeholder="Enter email address"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Phone</label>
              <div className="flex items-center gap-3 px-4 py-3 border border-slate-300 rounded-lg focus-within:border-emerald-500 focus-within:ring-2 focus-within:ring-emerald-100">
                <Phone className="h-5 w-5 text-slate-400" />
                <input
                  type="tel"
                  defaultValue="+1 (555) 123-4567"
                  className="flex-1 bg-transparent text-slate-900 outline-none"
                  placeholder="Enter phone number"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Location</label>
              <div className="flex items-center gap-3 px-4 py-3 border border-slate-300 rounded-lg focus-within:border-emerald-500 focus-within:ring-2 focus-within:ring-emerald-100">
                <MapPin className="h-5 w-5 text-slate-400" />
                <input
                  type="text"
                  defaultValue="Boston, MA"
                  className="flex-1 bg-transparent text-slate-900 outline-none"
                  placeholder="Enter location"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Date of Birth</label>
              <div className="flex items-center gap-3 px-4 py-3 border border-slate-300 rounded-lg focus-within:border-emerald-500 focus-within:ring-2 focus-within:ring-emerald-100">
                <Calendar className="h-5 w-5 text-slate-400" />
                <input
                  type="date"
                  defaultValue="1998-03-15"
                  className="flex-1 bg-transparent text-slate-900 outline-none"
                />
              </div>
            </div>
          </div>

          {/* Bio Section */}
          <div className="mt-8">
            <label className="block text-sm font-medium text-slate-700 mb-2">Bio</label>
            <div className="px-4 py-3 border border-slate-300 rounded-lg focus-within:border-emerald-500 focus-within:ring-2 focus-within:ring-emerald-100">
              <textarea
                defaultValue="Passionate law student with a focus on corporate law and intellectual property. Currently in my third year at Harvard Law School, actively participating in moot court competitions and legal clinics. Interested in technology law and its intersection with traditional legal practice."
                className="w-full bg-transparent text-slate-900 outline-none resize-none min-h-[100px]"
                placeholder="Tell us about yourself..."
              />
            </div>
          </div>

          {/* Additional Settings */}
          <div className="mt-8 p-6 bg-slate-50 rounded-xl">
            <h3 className="text-lg font-semibold text-slate-900 mb-4">Additional Settings</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium text-slate-900">Email Notifications</h4>
                  <p className="text-sm text-slate-600">Receive email updates about your courses</p>
                </div>
                <button className="relative inline-flex h-6 w-11 items-center rounded-full bg-emerald-500 transition-colors">
                  <span className="inline-block h-4 w-4 transform rounded-full bg-white transition-transform translate-x-6"></span>
                </button>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium text-slate-900">Profile Visibility</h4>
                  <p className="text-sm text-slate-600">Make your profile visible to other students</p>
                </div>
                <button className="relative inline-flex h-6 w-11 items-center rounded-full bg-slate-300 transition-colors">
                  <span className="inline-block h-4 w-4 transform rounded-full bg-white transition-transform translate-x-1"></span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
