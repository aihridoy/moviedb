import Header from "@/components/Header";
import Hero from "@/components/Hero";
import PopularMovies from "@/components/PopularMovies";
import TopRatedMovie from "@/components/TopRatedMovie";
import TrendingMovies from "@/components/TrendingMovies";
import RecentlyViewed from "@/components/RecentlyViewed";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <Hero />
      <RecentlyViewed />
      <div className="container mx-auto px-4 py-8">
        <TrendingMovies />
        <PopularMovies />
        <TopRatedMovie />
      </div>
      <Footer />
    </>
  );
}
