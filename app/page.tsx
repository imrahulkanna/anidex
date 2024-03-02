import Image from "next/image";
import TrendingAnime from "./components/TrendingAnime";

export default function Home() {
    const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    return (
        <main>
            <TrendingAnime />
        </main>
    );
}
