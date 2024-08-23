import DisplayDonation from "@/components/DisplayDonation";
import Hero from "@/components/Hero";
import ShowBloodLists from "@/components/ShowBloodLists";
import { MyContextProvider } from "@/Context/Context";


export default function Home() {
  return (
    <main>
      <Hero />
      <ShowBloodLists />
    </main>
  );
}
