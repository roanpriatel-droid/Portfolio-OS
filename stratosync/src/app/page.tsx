import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import HeroSection from '@/components/sections/HeroSection';
import TrustTicker from '@/components/sections/TrustTicker';
import ProblemSection from '@/components/sections/ProblemSection';
import StatsSection from '@/components/sections/StatsSection';
import ServicesOverview from '@/components/sections/ServicesOverview';
import CinematicShowcase from '@/components/sections/CinematicShowcase';
import BeforeAfter from '@/components/sections/BeforeAfter';
import ServicesDeepDive from '@/components/sections/ServicesDeepDive';
import HowItWorks from '@/components/sections/HowItWorks';
import IndustriesGrid from '@/components/sections/IndustriesGrid';
import AutomationShowcase from '@/components/sections/AutomationShowcase';
import Testimonials from '@/components/sections/Testimonials';
import CaseStudies from '@/components/sections/CaseStudies';
import ComparisonTable from '@/components/sections/ComparisonTable';
import ROICalculator from '@/components/sections/ROICalculator';
import PricingSection from '@/components/sections/PricingSection';
import FAQSection from '@/components/sections/FAQSection';
import BlogPreview from '@/components/sections/BlogPreview';
import FinalCTA from '@/components/sections/FinalCTA';

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <TrustTicker />
        <ProblemSection />
        <StatsSection />
        <ServicesOverview />
        <CinematicShowcase />
        <BeforeAfter />
        <ServicesDeepDive />
        <HowItWorks />
        <IndustriesGrid />
        <AutomationShowcase />
        <Testimonials />
        <CaseStudies />
        <ComparisonTable />
        <ROICalculator />
        <PricingSection />
        <FAQSection />
        <BlogPreview />
        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}
