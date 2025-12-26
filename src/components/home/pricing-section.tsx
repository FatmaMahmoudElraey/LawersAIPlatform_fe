// src/components/home/pricing-section.tsx
"use client";

import { useEffect, useState } from "react";
import { Check } from "lucide-react";

type PricingFeature = {
  id: number;
  content: string;
};

type PricingPlanApi = {
  id: number;
  type: string;
  description: string;
  pricing: number;
  features: PricingFeature[];
};

type Plan = {
  name: string;
  price: string;
  period?: string;
  billing: string;
  description: string;
  features: string[];
  cta: string;
  popular: boolean;
};

const defaultPlans: Plan[] = [
  {
    name: "Student",
    price: "Free",
    period: "/month",
    billing: "Billed annually",
    description: "Essential research tools for law students.",
    features: [
      "Unlimited Case law Search",
      "AI Case Summaries",
      "Bluebook Citation Generator",
      "Personal Study Notes"
    ],
    cta: "Start Learning",
    popular: false
  },
  {
    name: "Lawyer",
    price: "$149",
    period: "/month",
    billing: "Billed annually",
    description: "Complete toolkit for practicing attorneys.",
    features: [
      "Advanced Contract Drafting",
      "Risk & Compliance Analysis",
      "Legal Research Memos",
      "Client Communication Assistant",
      "Document Companion"
    ],
    cta: "Start Learning",
    popular: true
  },
  {
    name: "Law Firm",
    price: "Custom",
    billing: "Contact sales for pricing",
    description: "Enterprises scalability for legal teams",
    features: [
      "Centralized Knowledge Base",
      "Firm-wide Collaboration",
      "SSO & Advanced Security",
      "Dedicated Success Manager",
      "Custom Model Training"
    ],
    cta: "Start Learning",
    popular: false
  }
];

export default function PricingSection() {
  const [plans, setPlans] = useState<Plan[]>(defaultPlans);

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const response = await fetch("/api/pricing-plans");

        if (!response.ok) {
          return;
        }

        const data: PricingPlanApi[] = await response.json();

        const mapped: Plan[] = data.map((plan) => {
          const isFree = plan.pricing === 0;

          return {
            name: plan.type,
            price: isFree ? "Free" : `$${plan.pricing}`,
            period: isFree ? undefined : "/month",
            billing: isFree ? "" : "Billed annually",
            description: plan.description,
            features: plan.features.map((f) => f.content),
            cta: "Start Learning",
            popular: plan.type === "Lawyer"
          };
        });

        setPlans(mapped);
      } catch (error) {
        // On error, keep showing default plans.
      }
    };

    fetchPlans();
  }, []);

  return (
    <section className="py-20 bg-white"  style={{ backgroundColor: '#F6F8F7'}}>
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-slate-900 mb-4">
            Simple, transparent pricing
          </h2>
          <p className="text-lg text-slate-600 max-w-3xl mx-auto">
            Tailored plans for every stage of your legal career. Plan law school to patient.
          </p>
          
          {/* Toggle Switch */}
          <div className="mt-8 inline-flex items-center bg-slate-100 rounded-full p-1">
            <button className="px-6 py-2 text-sm font-medium text-slate-700 bg-white rounded-full shadow">
              Monthly
            </button>
            <button className="px-6 py-2 text-sm font-medium text-slate-500 hover:text-slate-700">
              Yearly
            </button>
          </div>
        </div>
        
        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <div key={index} className={`relative rounded-2xl border p-8 ${plan.popular ? 'border-emerald-500 shadow-lg' : 'border-slate-200'}`}>
              {/* Most Popular Badge */}
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <div className="bg-emerald-500 text-white px-4 py-1 rounded-full text-sm font-medium">
                    Most Popular
                  </div>
                </div>
              )}
              
              {/* Plan Name */}
              <h3 className={`text-xl font-bold ${plan.popular ? 'text-emerald-600' : 'text-slate-900'}`}>
                {plan.name}
              </h3>
              
              {/* Description */}
              <p className="mt-2 text-slate-600">
                {plan.description}
              </p>
              
              {/* Price */}
              <div className="mt-6">
                <div className="flex items-baseline">
                  <span className={`text-4xl font-bold ${plan.popular ? 'text-emerald-600' : 'text-slate-900'}`}>
                    {plan.price}
                  </span>
                  {plan.period && (
                    <span className="ml-2 text-lg text-slate-500">{plan.period}</span>
                  )}
                </div>
                <p className="mt-1 text-sm text-slate-500">
                  {plan.billing}
                </p>
              </div>
              
              {/* Features List */}
              <ul className="mt-8 space-y-4">
                {plan.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start">
                    <div className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-100 mr-3 mt-0.5 flex-shrink-0">
                      <Check className="h-3 w-3 text-emerald-600" />
                    </div>
                    <span className="text-slate-700">{feature}</span>
                  </li>
                ))}
              </ul>
              
              {/* CTA Button */}
              <button 
                className={`mt-10 w-full py-3 rounded-xl font-medium transition-colors ${plan.popular ? 'bg-emerald-500 hover:bg-emerald-600 text-white' : 'bg-[#0F172A] hover:bg-slate-900 text-white'}`}
              >
                {plan.cta}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}