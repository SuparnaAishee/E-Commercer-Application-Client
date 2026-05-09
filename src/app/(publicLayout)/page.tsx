import Hero from "@/src/components/modules/public/Home/Hero";
import Benefits from "@/src/components/modules/public/Home/Benefits";
import CategoryGrid from "@/src/components/modules/public/Home/CategoryGrid";
import DealOfDay from "@/src/components/modules/public/Home/DealOfDay";
import FeaturedProducts from "@/src/components/modules/public/Home/FeaturedProducts";
import PromoBanners from "@/src/components/modules/public/Home/PromoBanners";
import FlashSale from "@/src/components/modules/public/Home/FlashSale";
import FeaturedShops from "@/src/components/modules/public/Home/FeaturedShops";
import RecentlyViewed from "@/src/components/modules/public/Home/RecentlyViewed";
import FinalCTA from "@/src/components/modules/public/Home/FinalCTA";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Hero />
      <Benefits />
      <CategoryGrid />
      <DealOfDay />
      <FeaturedProducts />
      <PromoBanners />
      <FlashSale />
      <FeaturedShops />
      <RecentlyViewed />
      <FinalCTA />
    </div>
  );
}
