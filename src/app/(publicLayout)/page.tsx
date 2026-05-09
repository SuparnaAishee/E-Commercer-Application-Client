import Hero from "@/src/components/modules/public/Home/Hero";
import StatsBar from "@/src/components/modules/public/Home/StatsBar";
import Benefits from "@/src/components/modules/public/Home/Benefits";
import CategoryGrid from "@/src/components/modules/public/Home/CategoryGrid";
import DealOfDay from "@/src/components/modules/public/Home/DealOfDay";
import FeaturedProducts from "@/src/components/modules/public/Home/FeaturedProducts";
import Collections from "@/src/components/modules/public/Home/Collections";
import FlashSale from "@/src/components/modules/public/Home/FlashSale";
import FeaturedShops from "@/src/components/modules/public/Home/FeaturedShops";
import RecentlyViewed from "@/src/components/modules/public/Home/RecentlyViewed";
import Testimonials from "@/src/components/modules/public/Home/Testimonials";
import NewsletterStrip from "@/src/components/modules/public/Home/NewsletterStrip";
import FinalCTA from "@/src/components/modules/public/Home/FinalCTA";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Hero />
      <StatsBar />
      <Benefits />
      <CategoryGrid />
      <DealOfDay />
      <FeaturedProducts />
      <Collections />
      <FlashSale />
      <FeaturedShops />
      <Testimonials />
      <RecentlyViewed />
      <NewsletterStrip />
      <FinalCTA />
    </div>
  );
}
