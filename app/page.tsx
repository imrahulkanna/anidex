import TrendingAnimeList from "../components/TrendingAnimeList";
import FeaturedAnimes from "@/components/FeaturedAnimes";
import CategoryAnimes from "@/components/CategoryAnimes";

export default function Home() {
    const featuredAnimeTitles = ["Top Airing", "Most Popular", "Most Favorite", "Latest Completed"];
    const categoryTitles = ["New Releases"];
    return (
        <main>
            <TrendingAnimeList />
            <div className="w-full flex justify-between flex-wrap gap-4 flex-col md:flex-row md:gap-0 md:-mx-2">
                {featuredAnimeTitles.map((title) => (
                    <div
                        key={title}
                        className="w-full md:w-1/2 xl:w-1/4 md:px-2"
                        id={title.toLowerCase().split(" ").join("-")}
                    >
                        <FeaturedAnimes title={title} />
                    </div>
                ))}
            </div>
            <div className="w-full flex flex-col xl:flex-row md:-mx-4">
                {/* Anime tiles */}
                <div id="main-container" className="w-full xl:w-3/4">
                    {categoryTitles.map((title) => (
                        <div key={title} id="new-releases" className="w-full">
                            <CategoryAnimes title={title} />
                        </div>
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
