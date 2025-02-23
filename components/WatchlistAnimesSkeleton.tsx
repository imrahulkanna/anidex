import { DotFilledIcon } from "@radix-ui/react-icons";

export const WatchlistAnimesSkeleton = () => {
    return (
        <div className="flex flex-wrap justify-center [&>*:nth-child(odd)]:px-2 [&>*:nth-child(even)]:px-2 md:[&>*:nth-child(odd)]:px-4 md:[&>*:nth-child(even)]:px-4 mt-4 animate-pulse">
            {[...Array(10)].map((_, index) => (
                <div key={index} className="w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 mb-4">
                    <div className="w-full h-[250px] md:h-[300px] xl:h-[250px] 2xl:h-[320px] bg-gray-500 mb-2"></div>
                    <p className="w-3/4 bg-gray-500 rounded h-2 whitespace-nowrap overflow-hidden text-ellipsis font-bold mb-2"></p>
                    <div className="flex items-center gap-0.5 text-sm">
                        <div className="w-5 bg-gray-500 rounded h-2"></div>
                        <DotFilledIcon className={`opacity-30`} />
                        <div className="w-12 bg-gray-500 rounded h-2"></div>
                    </div>
                </div>
            ))}
        </div>
    );
};
