export default function ActorDetailSkeleton() {
    return (
        <div className="animate-pulse w-full px-12 md:px-24 mt-5">
            <div className="flex flex-col lg:flex-row gap-8">
                <div className="w-full lg:w-[90%] xl:w-[45%] h-[475px]  bg-[#3f3f3f] rounded-md" />
                <div className="flex flex-col gap-4 w-full">
                    <div className="h-8 bg-[#2a2a2a] w-2/3 rounded" />
                    <div className="h-5 bg-[#2a2a2a] w-1/2 rounded" />
                    <div className="h-5 bg-[#2a2a2a] w-1/3 rounded" />
                    <div className="h-5 bg-[#2a2a2a] w-2/5 rounded" />
                    <div className="h-5 bg-[#2a2a2a] w-1/2 rounded" />
                    <div className="h-6 bg-[#2a2a2a] w-20 rounded mt-4" />
                    <div className="h-24 bg-[#2a2a2a] w-full rounded" />
                </div>
            </div>
            <div className="mt-6">
                <div className="h-6 bg-[#2a2a2a] w-32 rounded mb-4" />
                <div className="flex flex-wrap gap-4">
                    {Array.from({ length: 9 }).map((_, idx) => (
                        <div key={idx} className="w-[180px] h-[225px]  bg-[#3f3f3f] rounded-md" />
                    ))}
                </div>
            </div>
        </div>
    );
}