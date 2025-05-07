export default function MovieDetailSkeleton() {
    return (
        <div className="flex flex-col w-full h-full px-12 md:px-24 mt-5 animate-pulse">
            <div className="flex flex-col lg:flex-row items-start justify-center w-full h-full">

                {/* Poster Skeleton */}
                <div className="w-full lg:w-[90%] xl:w-[45%] flex flex-col items-start justify-center gap-4">
                    <div className="w-full min-h-[675px] bg-[#3f3f3f] rounded-md" />
                </div>

                {/* Text Section Skeleton */}
                <div className="flex flex-col items-start justify-start w-full h-full mt-4 lg:mt-0 lg:px-9 space-y-4">
                    <div className="w-3/4 h-10 bg-[#3f3f3f] rounded-md" /> {/* Title */}
                    <div className="w-1/4 h-6 bg-[#2a2a2a] rounded-md" /> {/* Year */}

                    {/* Info Row */}
                    <div className="flex items-center gap-4 flex-wrap">
                        <div className="w-16 h-5 bg-[#2a2a2a] rounded-md" />
                        <span className="w-[1px] h-4 bg-[#ffffff29]" />
                        <div className="w-20 h-5 bg-[#2a2a2a] rounded-md" />
                        <span className="w-[1px] h-4 bg-[#ffffff29]" />
                        <div className="w-32 h-5 bg-[#2a2a2a] rounded-md" />
                    </div>

                    {/* Overview Skeleton */}
                    <div className="space-y-2 mt-2">
                        <div className="w-full h-4 bg-[#2a2a2a] rounded-md" />
                        <div className="w-5/6 h-4 bg-[#2a2a2a] rounded-md" />
                        <div className="w-2/3 h-4 bg-[#2a2a2a] rounded-md" />
                    </div>

                    {/* Featured Cast Skeleton */}
                    <div className="mt-2 w-full">
                        <div className="w-1/3 h-6 bg-[#3f3f3f] rounded-md mb-4" />
                        <div className="flex items-center justify-center lg:justify-start gap-4 flex-wrap">
                            {Array.from({ length: 9 }).map((_, i) => (
                                <div key={i} className="flex flex-col items-start justify-center gap-2">
                                    <div className="w-28 lg:w-35 h-28 lg:h-35 bg-[#2a2a2a] rounded-md" />
                                    <div className="space-y-1 mt-1">
                                        <div className="h-4 bg-[#2a2a2a] rounded w-24 lg:w-28" />
                                        <div className="h-3 bg-[#3a3a3a] rounded w-20 lg:w-24" />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
