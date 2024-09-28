import Hero from "@/components/Hero";
import ShowBloodLists from "./blood/page";
import { HomeHero } from "@/components/HomeHero";


export default function Home() {
  return (
    <main>
      {/* <Hero /> */}
      <HomeHero />
      <ShowBloodLists />
    </main>
  );
}
