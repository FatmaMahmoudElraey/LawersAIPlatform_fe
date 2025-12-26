// src/components/home/platform-features.tsx
import { Brain, Search, Scan, Shield } from "lucide-react";

const features = [
  {
    icon: Brain,
    title: "AI Case Analysis",
    description: "Upload legal documents and get instant AI-powered analysis with risk assessment and success probability.",
    color: "purple"
  },
  {
    icon: Search,
    title: "Legal Research",
    description: "Access comprehensive legal database with AI-powered search and relevant case references.",
    color: "blue"
  },
  {
    icon: Scan,
    title: "Smart OCR",
    description: "Extract text from documents with English legal precision and intelligent metadata extraction.",
    color: "emerald"
  },
  {
    icon: Shield,
    title: "Secure Vault",
    description: "Enterprise-grade encryption for all your sensitive legal documents and client data.",
    color: "amber"
  },
];

const colorClasses = {
  purple: "bg-purple-50 text-purple-600 border-purple-100",
  blue: "bg-blue-50 text-blue-600 border-blue-100",
  emerald: "bg-emerald-50 text-emerald-600 border-emerald-100",
  amber: "bg-amber-50 text-amber-600 border-amber-100",
};

export default function PlatformFeatures() {
  return (
    <section className="py-16" style={{ backgroundColor: '#fff' }}>
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-10 items-center">
          {/* Left sidebar - Takes 4 columns, centered vertically */}
          <div className="lg:col-span-4">
            <div className="lg:py-8">
              <div className="inline-flex items-center px-4 py-2 rounded-full border border-slate-200 bg-white mb-6">
                <h2 className="text-sm font-semibold text-slate-900">
                  Why Choose Us
                </h2>
              </div>
              
              <h3 className="text-xl font-semibold text-slate-800 mb-4">
                Comprehensive Legal Platform
              </h3>
              
              <p className="text-base text-slate-600 leading-relaxed mb-6">
                Everything you need for modern legal practice in one integrated platform. We combine powerful AI with intuitive design.
              </p>
              
              <a 
                href="#" 
                className="inline-flex items-center text-base font-medium text-emerald-600 hover:text-emerald-700 transition-colors group"
              >
                Explore all features
                <svg 
                  className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </a>
            </div>
          </div>

          {/* Right content grid - Takes 8 columns */}
          <div className="lg:col-span-8">
            <div className="grid sm:grid-cols-2 gap-6">
              {features.map((feature, index) => {
                const Icon = feature.icon;
                const colorClass = colorClasses[feature.color as keyof typeof colorClasses];
                
                return (
                  <div
                    key={index}
                    className="group bg-white rounded-2xl p-6 transition-all duration-300 hover:shadow-md border border-slate-100 hover:border-slate-200"
                  >
                    <div className={`inline-flex h-14 w-14 items-center justify-center rounded-xl ${colorClass.split(' ')[0]} ${colorClass.split(' ')[1]} mb-5 border ${colorClass.split(' ')[2]}`}>
                      <Icon className="h-7 w-7" />
                    </div>
                    <h3 className="text-lg font-semibold text-slate-900 mb-3">
                      {feature.title}
                    </h3>
                    <p className="text-sm text-slate-600 leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}