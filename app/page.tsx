import Hero from "@/components/home/Hero";
import Manifesto from "@/components/home/Manifesto";
import CastMarquee from "@/components/home/CastMarquee";
import ReelWall from "@/components/home/ReelWall";
import Proof from "@/components/home/Proof";
import Process from "@/components/home/Process";
import Founders from "@/components/home/Founders";
import FinalCTA from "@/components/home/FinalCTA";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main>
      <Hero />
      <Manifesto />
      <CastMarquee />
      <ReelWall />
      <Proof />
      <Process />
      <Founders />
      <FinalCTA />
      <Footer />
    </main>
  );
}
