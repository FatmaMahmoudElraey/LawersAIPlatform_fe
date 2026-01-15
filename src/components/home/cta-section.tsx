// src/components/home/cta-section.tsx
import { Check } from "lucide-react";

export default function CTASection() {
  return (
    <section className="py-20 bg-white">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-gradient-to-br from-slate-950 to-slate-800 p-10 sm:p-12">
          <div className="grid lg:grid-cols-2 gap-10 items-center">
            {/* Left Content - Left Aligned */}
            <div className="text-left">
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6">
                Ready to transform your practice?
              </h2>

              <p className="text-lg text-slate-300 mb-8 max-w-lg">
                Join thousands of legal professionals who are saving time and winning more cases with LegalAI.
              </p>

              {/* Features - Left Aligned */}
              <div className="space-y-3">
                <div className="flex items-center">
                  <Check className="h-5 w-5 text-emerald-400 mr-3 flex-shrink-0" />
                  <span className="text-base font-medium text-emerald-400">No credit card</span>
                </div>
                <div className="flex items-center">
                  <Check className="h-5 w-5 text-emerald-400 mr-3 flex-shrink-0" />
                  <span className="text-base font-medium text-emerald-400">14-day free trial</span>
                </div>
              </div>
            </div>

            {/* Right Content - Buttons Stacked */}
            <div className="lg:pl-10">
              <div className="space-y-4 max-w-xs mx-auto lg:mx-0 lg:max-w-sm">
                {/* Primary Button */}
                <button className="w-full px-8 py-4 bg-emerald-500 text-white font-semibold rounded-xl hover:bg-emerald-600 transition-colors text-lg shadow-lg hover:shadow-xl">
                  Start Free Trial
                </button>

                <button className="w-full px-8 py-4 bg-transparent text-white font-semibold rounded-xl hover:bg-white/10 transition-colors text-lg border border-white/30 hover:border-white/50">
                  Schedule Demo
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}