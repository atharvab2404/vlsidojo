import Hero from "@/components/Hero";
import WhyVLSIHub from "@/components/WhyVLSIHub";
import ProjectCategories from "@/components/ProjectCategories";
import Testimonials from "@/components/Testimonials";
import CallToAction from "@/components/CallToAction";
import KnowCreators from "@/components/KnowCreators";

export default function Home() {
  return (
    <main>
      <Hero />
      <WhyVLSIHub />
      <ProjectCategories />
      <KnowCreators/>
      <Testimonials />
      <CallToAction />
    </main>
  );
}
