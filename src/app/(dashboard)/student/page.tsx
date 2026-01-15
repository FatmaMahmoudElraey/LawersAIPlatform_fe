"use client";

import StudentHero from "@/components/student/hero";
import StudentStatsBar from "@/components/student/stats-bar";
import StudentFeaturesCards from "@/components/student/features-cards";
import StudentStudyTools from "@/components/student/study-tools";
import StudentCTA from "@/components/student/cta";
import StudentNavbar from "@/components/student/navbar";
import Footer from "@/components/student/footer";
export default function StudentDashboardPage() {
  return (
    <>
    <StudentNavbar></StudentNavbar>
      <StudentHero />
      <StudentStatsBar />
      <StudentFeaturesCards />
      <StudentStudyTools />
      <StudentCTA />
      <Footer/>
    </>
  );
}
