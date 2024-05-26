import TrendingAnimeList from "../components/TrendingAnimeList";
import FeaturedAnimes from "@/components/FeaturedAnimes";
import CategoryAnimes from "@/components/CategoryAnimes";
import AnimeGenres from "@/components/AnimeGenres";
import WeeklyReleases from "@/components/WeeklyReleases";

export default function Home() {
    const featuredAnimeTitles = ["Top Airing", "Most Popular", "Most Favorite", "Latest Completed"];
    const categoryTitles = ["Latest Episodes", "New Releases", "Top Upcoming"];
    return (
        <main className="mt-20 md:-mx-4">
            <TrendingAnimeList />
            <div id="featured-animes" className="w-full mb-10 flex justify-between flex-wrap gap-x-4 gap-y-10 flex-col md:flex-row md:gap-x-0">
                {featuredAnimeTitles.map((title) => (
                    <FeaturedAnimes key={title} title={title} />
                ))}
            </div>
            <div className="w-full flex flex-col xl:flex-row">
                {/* Anime tiles */}
                <div id="main-container" className="w-full xl:w-3/4">
                    {categoryTitles.map((title) => (
                        <CategoryAnimes key={title} title={title} />
                    ))}
                    <WeeklyReleases />
                </div>
                {/* Genre and top anime tiles */}
                <div id="main-sidebar" className="w-full xl:w-1/4 md:px-4">
                    <AnimeGenres />
                </div>
            </div>
        </main>
    );
}
