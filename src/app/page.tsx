// src/app/page.tsx - Updated to use MarketingNavbar
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import MarketingNavbar from "../components/layout/marketing-navbar";
import Footer from "../components/layout/footer";
import HomeHero from "@/components/home/hero";
// import FeatureShowcase from "@/components/home/feature-showcase";
// import RoleCards from "@/components/home/role-cards";
import Testimonials from "@/components/home/testimonials";
import CTASection from "@/components/home/cta-section";
import StatsSection from "@/components/home/stats-section";
import PlatformFeatures from "@/components/home/platform-features";
import PricingSection from "../components/home/pricing-section";
import FeaturesSection from '../components/home/features-section';
import IntegrationsSection from '../components/home/integrations-section';
import Link from 'next/link';

export default function HomePage() {
  const cookieStore = cookies();
  const token = cookieStore.get("token")?.value;
  const role = cookieStore.get("role")?.value;

  // If user is logged in, redirect to their dashboard
  if (token && role) {
    redirect(`/${role}`);
  }

  return (
    <div className="min-h-screen bg-background">
      <div style={{ backgroundColor: '#F6F8F7'}}>
 <MarketingNavbar />
      <HomeHero />
      </div>
     
      <StatsSection />
      <FeaturesSection />
      <PlatformFeatures />
      <PricingSection />
      {/* <FeatureShowcase />
      <RoleCards /> */}
      <IntegrationsSection />
      <Testimonials />
      <CTASection />
      <Footer />
      {/* <footer className="border-t py-8">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center gap-2 mb-4 md:mb-0">
              <div className="flex h-6 w-6 items-center justify-center rounded bg-primary text-primary-foreground">
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <span className="font-bold">LegalSaaS</span>
            </div>
            <div className="flex flex-col md:flex-row items-center gap-6">
              <Link href="/privacy" className="text-sm text-muted-foreground hover:text-foreground">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-sm text-muted-foreground hover:text-foreground">
                Terms of Service
              </Link>
              <Link href="/contact" className="text-sm text-muted-foreground hover:text-foreground">
                Contact Us
              </Link>
            </div>
            <p className="text-sm text-muted-foreground mt-4 md:mt-0">
              © {new Date().getFullYear()} LegalSaaS Pro. All rights reserved.
            </p>
          </div>
        </div>
      </footer> */}
    </div>
  );
}