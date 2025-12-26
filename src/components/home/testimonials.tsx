// src/components/home/testimonials.tsx
"use client";

import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";

type FeedbackItem = {
  id: number;
  comment: string;
  rating: number;
  user: {
    name: string;
  };
};

type Testimonial = {
  id: number;
  content: string;
  name: string;
  role: string;
};

const defaultTestimonials: Testimonial[] = [
  {
    id: 1,
    content: "“The AI accuracy is unmatched. It caught a critical risk in an NDA that two other tools missed. It's now an essential part of our daily workflow.”",
    name: "Sarah Jenkins",
    role: "Partner, Jenkins"
  },
  {
    id: 2,
    content: "“Finally, a legal tech tool that actually saves time. The clause generation feature alone has cut our drafting time by 40%. Highly recommended.”",
    name: "Michael Ross",
    role: "QC, TechFlow Inc."
  },
  {
    id: 3,
    content: "“Implementation was seamless. The support team helped us integrate with our existing case management system in under 24 hours.”",
    name: "Elena Rodriguez",
    role: "Legal Ops, Global Corp"
  },
  {
    id: 4,
    content: "“The contract review feature saved us from a major liability. It identified non-standard clauses that our junior associates had missed.”",
    name: "David Chen",
    role: "General Counsel, TechCorp"
  },
  {
    id: 5,
    content: "“As a solo practitioner, this tool gives me the resources of a large firm. The AI research assistant alone is worth the investment.”",
    name: "Amanda Wilson",
    role: "Attorney, Wilson Legal"
  },
  {
    id: 6,
    content: "“Our law firm's efficiency increased by 60% after implementation. The team collaboration features transformed how we work together.”",
    name: "Robert Kim",
    role: "Managing Partner, Kim & Associates"
  },
  {
    id: 7,
    content: "“The AI-powered legal research cut down our case preparation time from days to hours. The accuracy of case references is phenomenal.”",
    name: "James Peterson",
    role: "Litigation Partner, Peterson & Co."
  },
  {
    id: 8,
    content: "“Client satisfaction has skyrocketed since we started using this platform. We can now deliver faster, more accurate legal advice.”",
    name: "Lisa Thompson",
    role: "Senior Partner, Thompson Legal"
  },
  {
    id: 9,
    content: "“The document automation features have revolutionized our practice. What used to take hours now takes minutes with perfect accuracy.”",
    name: "Thomas Wright",
    role: "Managing Director, Wright Law Group"
  },
  {
    id: 10,
    content: "“As a corporate counsel, I rely on this tool for compliance monitoring. It's prevented several regulatory issues before they became problems.”",
    name: "Sophia Martinez",
    role: "Chief Legal Officer, InnovateCorp"
  },
  {
    id: 11,
    content: "“The training and support were exceptional. Our team was up and running within a day, and the ROI was immediate.”",
    name: "William Chen",
    role: "Legal Director, Global Enterprises"
  },
  {
    id: 12,
    content: "“This platform has become the backbone of our legal operations. The analytics dashboard provides insights we never had access to before.”",
    name: "Olivia Parker",
    role: "Operations Director, LegalTech Solutions"
  }
];

export default function Testimonials() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [testimonials, setTestimonials] = useState<Testimonial[]>(defaultTestimonials);
  const cardsPerSlide = 3;
  const totalSlides = Math.ceil(testimonials.length / cardsPerSlide);

  useEffect(() => {
    const fetchFeedback = async () => {
      try {
        const response = await fetch("/api/feedback");

        if (!response.ok) {
          console.error("Failed to fetch feedback");
          return;
        }

        const json = await response.json();
        const data: FeedbackItem[] = json.data || [];

        if (!Array.isArray(data) || data.length === 0) {
          console.log("No feedback data found");
          return;
        }

        // Map API data to testimonial format
        const mappedTestimonials = data.map((item) => ({
          id: item.id,
          content: `"${item.comment}"`,
          name: item.user?.name || `User ${item.id}`, // Use user.name if available
          role: "" // You can add role logic here if available in your API
        }));

        console.log("Mapped testimonials:", mappedTestimonials);
        setTestimonials(mappedTestimonials);
      } catch (error) {
        console.error("Error fetching feedback:", error);
        // On error, keep showing default testimonials
      }
    };

    fetchFeedback();
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => 
      prev === totalSlides - 1 ? 0 : prev + 1
    );
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => 
      prev === 0 ? totalSlides - 1 : prev - 1
    );
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  // Get current testimonials to display
  const startIndex = currentSlide * cardsPerSlide;
  const endIndex = startIndex + cardsPerSlide;
  const currentTestimonials = testimonials.slice(startIndex, endIndex);

  // If we don't have 3 testimonials for the last slide, add empty placeholders
  const displayTestimonials = [...currentTestimonials];
  while (displayTestimonials.length < cardsPerSlide) {
    displayTestimonials.push({} as Testimonial);
  }

  return (
    <section className="py-20" style={{ backgroundColor: '#F6F8F7' }}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-3xl font-bold text-slate-900 mb-4">
            Success Stories
          </h1>
          <p className="text-lg text-slate-600 max-w-3xl mx-auto">
            Now leading firms are using our solutions to win.
          </p>
        </div>
        
        {/* Carousel Container */}
        <div className="relative">
          {/* Navigation Buttons */}
          <button
            onClick={prevSlide}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 lg:-translate-x-6 z-10 h-12 w-12 rounded-full bg-white shadow-lg flex items-center justify-center text-slate-700 hover:text-emerald-600 hover:shadow-xl transition-all border border-slate-200"
            aria-label="Previous slide"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
          
          <button
            onClick={nextSlide}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 lg:translate-x-6 z-10 h-12 w-12 rounded-full bg-white shadow-lg flex items-center justify-center text-slate-700 hover:text-emerald-600 hover:shadow-xl transition-all border border-slate-200"
            aria-label="Next slide"
          >
            <ChevronRight className="h-6 w-6" />
          </button>
          
          {/* Cards Grid - Always shows 3 cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {displayTestimonials.map((testimonial, index) => (
              <div 
                key={testimonial.id || `placeholder-${index}`}
                className={`h-full rounded-3xl border border-slate-200 bg-white p-8 hover:shadow-lg transition-shadow ${
                  !testimonial.id ? 'opacity-0 pointer-events-none' : ''
                }`}
              >
                {testimonial.id && (
                  <>
                    {/* Quote Number with Icon */}
                    <div className="flex items-center mb-6">
                      <div className="h-10 w-10 flex items-center justify-center rounded-full bg-emerald-500 text-white mr-3 flex-shrink-0">
                        <Quote className="h-5 w-5" />
                      </div>
                    </div>
                    
                    {/* Content */}
                    <div className="mb-6">
                      <p className="text-lg text-slate-700 leading-relaxed italic">
                        {testimonial.content}
                      </p>
                    </div>
                    
                    {/* Divider */}
                    <div className="my-6 h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />
                    
                    {/* Author */}
                    <div className="flex items-center">
                      <div className="h-10 w-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-700 font-medium text-sm mr-3">
                        {testimonial.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                        <div className="font-semibold text-slate-900">
                          {testimonial.name}
                        </div>
                        {testimonial.role && (
                          <div className="text-sm text-slate-600">
                            {testimonial.role}
                          </div>
                        )}
                      </div>
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
          
          {/* Dots Indicator */}
          <div className="flex justify-center mt-12 space-x-2">
            {Array.from({ length: totalSlides }).map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`h-2 rounded-full transition-all ${
                  index === currentSlide 
                    ? 'bg-emerald-500 w-8' 
                    : 'bg-slate-300 hover:bg-slate-400 w-2'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}