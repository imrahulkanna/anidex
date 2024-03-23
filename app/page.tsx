import TrendingAnimeList from "../components/TrendingAnimeList";
import CategoryList from "@/components/CategoryList";

export default function Home() {
    const categoryTitles = ["Top Airing", "Most Popular", "Most Favorite", "Latest Completed"];
    return (
        <main>
            <TrendingAnimeList />
            <div className="flex">
                <div className="w-full flex justify-between flex-wrap gap-4 flex-col md:flex-row md:gap-0">
                    {categoryTitles.map((title) => (
                        <div className="w-full md:w-1/2 lg:w-1/4 md:pr-4">
                            <CategoryList key={title} categoryTitle={title} />
                        </div>
                    ))}
                </div>
            </div>
        </main>
    );
}
