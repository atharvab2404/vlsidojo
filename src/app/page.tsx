import Hero from "@/components/Hero";
import WhyVLSIHub from "@/components/WhyVLSIHub";
import ProjectCategories from "@/components/ProjectCategories";
import Testimonials from "@/components/Testimonials";
import CallToAction from "@/components/CallToAction";

export default function Home() {
  return (
    <main>
      <Hero />
      <WhyVLSIHub />
      <ProjectCategories />
      <Testimonials />
      <CallToAction />
    </main>
  );
}
