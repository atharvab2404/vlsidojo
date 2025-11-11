import Hero from "@/components/Hero";
import WhyVLSIHub from "@/components/WhyVLSIHub";
import ProjectCategories from "@/components/ProjectCategories";
import Testimonials from "@/components/Testimonials";
import CallToAction from "@/components/CallToAction";
import BlogSection from "@/components/BlogSection";
import KnowCreators from "@/components/KnowCreators";
import InterviewPrepMain from "@/app/interview-prep/page";

export default function Home() {
  return (
    <main>
      <Hero />
      <WhyVLSIHub />
      <ProjectCategories />
      <InterviewPrepMain />
      <BlogSection />
      <KnowCreators/>
      <CallToAction />
    </main>
  );
}
