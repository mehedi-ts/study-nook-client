import Banner from "@/components/homeUi/Banner";
import AvailableStudyRooms from "@/components/homeUi/Latest";
import PricingSection from "@/components/homeUi/PricingSection";
import Testimonial from "@/components/homeUi/Testimonial";
import Image from "next/image";
export const metadata = {
  title: "Home",
};
export default function Home() {
  return (
    <div className="max-w-7xl mx-auto w-full">
      <Banner></Banner>
      <AvailableStudyRooms></AvailableStudyRooms>
      <Testimonial></Testimonial>
      <PricingSection></PricingSection>
    </div>
  );
}
