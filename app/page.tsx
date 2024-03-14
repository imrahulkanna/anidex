import TrendingAnimeList from "../components/TrendingAnimeList";
import CategoryList from "@/components/CategoryList";

export default function Home() {
    const categoryTitles = ["Top Airing", "Most Popular", "Most Favorite", "Latest Completed"];
    return (
        <main>
            <TrendingAnimeList />
            <div className="flex gap-4 w-full">
                {categoryTitles.map((title) => (
                    <div className="w-1/4">
                        <CategoryList categoryTitle={title} />
                    </div>
                ))}
            </div>
        </main>
    );
}
