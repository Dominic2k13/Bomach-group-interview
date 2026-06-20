import dynamic from "next/dynamic";
import FeaturedCollection from "@/components/landing/FeaturedCollection";
import BrandStory from "@/components/landing/BrandStory";

// Lazy-load the 3D hero — prevents SSR crash and keeps initial bundle small
const CinematicHero = dynamic(() => import("@/components/landing/CinematicHero"), {
  ssr: false,
  loading: () => (
    <div className="h-screen bg-stone-950 flex items-center justify-center">
      <p className="text-stone-500 text-xs tracking-widest uppercase animate-pulse">
        Loading…
      </p>
    </div>
  ),
});

export default function HomePage() {
  return (
    <>
      <CinematicHero />
      <FeaturedCollection />
      <BrandStory />
    </>
  );
}
