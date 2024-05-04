import TrendingAnimeList from "../components/TrendingAnimeList";
import FeaturedAnimes from "@/components/FeaturedAnimes";
import CategoryAnimes from "@/components/CategoryAnimes";

export default function Home() {
    const featuredAnimeTitles = ["Top Airing", "Most Popular", "Most Favorite", "Latest Completed"];
    const categoryTitles = ["Latest Episodes", "New Releases", "Top Upcoming"];
    return (
        <main>
            <TrendingAnimeList />
            <div id="featured-animes" className="w-full mb-10 flex justify-between flex-wrap gap-4 flex-col md:flex-row md:gap-0 md:-mx-2">
                {featuredAnimeTitles.map((title) => (
                    <FeaturedAnimes key={title} title={title} />
                ))}
            </div>
            <div className="w-full flex flex-col xl:flex-row md:-mx-4">
                {/* Anime tiles */}
                <div id="main-container" className="w-full xl:w-3/4">
                    {categoryTitles.map((title) => (
                        <CategoryAnimes key={title} title={title} />
                    ))}
                </div>
                {/* Genre and top anime tiles */}
                <div id="main-sidebar" className="w-full xl:w-1/4 md:px-2">
                    <div id="genre">
                        <h3 className="font-bold text-2xl">Genres</h3>
                    </div>
                </div>
            </div>
        </main>
    );
}
