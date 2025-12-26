// src/components/home/stats-section.tsx
"use client";

import { useEffect, useState } from "react";
import { Users, FileText, Globe, Clock } from "lucide-react";

type ApiStats = {
  legalProfessionals: string;
  casesAnalyzed: string;
  counties: string;
  TimeSaved: string;
};

const defaultStats = [
  {
    icon: Users,
    value: "500+",
    label: "Legal Professionals",
    description: "Trusted by lawyers and firms",
    iconColor: "text-blue-600 dark:text-blue-400",
    bgColor: "bg-blue-50 dark:bg-blue-900/20"
  },
  {
    icon: FileText,
    value: "10,000+",
    label: "Cases Analyzed",
    description: "Using AI technology",
    iconColor: "text-green-600 dark:text-green-400",
    bgColor: "bg-green-50 dark:bg-green-900/20"
  },
  {
    icon: Globe,
    value: "50+",
    label: "Countries",
    description: "Global reach",
    iconColor: "text-purple-600 dark:text-purple-400",
    bgColor: "bg-purple-50 dark:bg-purple-900/20"
  },
  {
    icon: Clock,
    value: "70%",
    label: "Time Saved",
    description: "Average reduction",
    iconColor: "text-orange-600 dark:text-orange-400",
    bgColor: "bg-orange-50 dark:bg-orange-900/20"
  }
];

export default function StatsSection() {
  const [stats, setStats] = useState(defaultStats);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch("/api/platform-performing");

        if (!response.ok) {
          return;
        }

        const data: ApiStats = await response.json();

        setStats([
          {
            icon: Users,
            value: data.legalProfessionals,
            label: "Legal Professionals",
            description: "Trusted by lawyers and firms",
            iconColor: "text-blue-600 dark:text-blue-400",
            bgColor: "bg-blue-50 dark:bg-blue-900/20"
          },
          {
            icon: FileText,
            value: data.casesAnalyzed,
            label: "Cases Analyzed",
            description: "Using AI technology",
            iconColor: "text-green-600 dark:text-green-400",
            bgColor: "bg-green-50 dark:bg-green-900/20"
          },
          {
            icon: Globe,
            value: data.counties,
            label: "Countries",
            description: "Global reach",
            iconColor: "text-purple-600 dark:text-purple-400",
            bgColor: "bg-purple-50 dark:bg-purple-900/20"
          },
          {
            icon: Clock,
            value: data.TimeSaved,
            label: "Time Saved",
            description: "Average reduction",
            iconColor: "text-orange-600 dark:text-orange-400",
            bgColor: "bg-orange-50 dark:bg-orange-900/20"
          }
        ]);
      } catch (error) {
        // If the request fails, keep showing the default stats.
      }
    };

    fetchStats();
  }, []);

  return (
    <section className="border-y border-slate-100 bg-white py-12 dark:border-slate-800 dark:bg-slate-950/40">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div
                key={index}
                className="flex flex-col items-center text-center"
              >
                {/* Icon container */}
                <div className={`mb-4 flex h-12 w-12 items-center justify-center rounded-full ${stat.bgColor}`}>
                  <Icon className={`h-6 w-6 ${stat.iconColor}`} />
                </div>
                
                {/* Value */}
                <div className="mb-1 text-4xl font-bold text-slate-900 dark:text-slate-50">
                  {stat.value}
                </div>
                
                {/* Label */}
                <div className="mb-1 text-sm font-semibold text-slate-700 dark:text-slate-300">
                  {stat.label}
                </div>
                
                {/* Description */}
                <div className="text-xs text-slate-500 dark:text-slate-400">
                  {stat.description}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}