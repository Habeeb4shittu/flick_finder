
import leftIcon from "@/components/icons/left-circle-svgrepo-com.svg";
import rightIcon from "@/components/icons/right-circle-svgrepo-com.svg";
import Image from "next/image";
type SliderType = {
  head: string;
  movies: any;
}
export default function Slider({ head, movies }: SliderType) {

  return (
    <div className="flex flex-col mt-5 gap-4 px-10 w-full h-full">
      <h4 className="text-[2rem] font-bold text-left my-2 text-shadow-cyan-900 font-sans cursor-pointer">
        {head}
      </h4>
      <div className="relative select-none">
        <div
          className="absolute left-0 top-1/2 transform -translate-y-1/2 h-full cursor-pointer flex items-center justify-center text-white p-2"
          style={{
            background:
              "linear-gradient(to right, rgba(0,0,0,.8), rgba(0,0,0,0.4))",
          }}
          onClick={() =>
            document
              .getElementById("scroll-container")
              ?.scrollBy({ left: -300, behavior: "smooth" })
          }
        >
          <Image
            src={leftIcon}
            alt="Left"
            width={32}
            height={32}
            className=" cursor-pointer"
          />
        </div>

        <div
          id="scroll-container"
          className="flex gap-4 overflow-x-auto hide-scrollbar py-3"
        >
          {movies.map((movie: any) => (
            <div
              key={movie.id}
              className="w-60 shrink-0 p-2 bg-[#1a1a1a] rounded-md transition shadow-md hover:transform hover:scale-105 hover:bg-[#2a2a2a] cursor-pointer shadow-[#52525270]"
            >
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
                className="w-full h-60 object-cover rounded-md"
              />
              <h3 className="text-base font-semibold text-white mt-2 truncate">
                {movie.title}
              </h3>
              <p className="text-xs text-gray-400">{movie.release_date}</p>
            </div>
          ))}
        </div>

        <div
          className="absolute right-0 top-1/2 transform -translate-y-1/2 h-full cursor-pointer flex items-center justify-center text-white p-2"
          style={{
            background:
              "linear-gradient(to right, rgba(0,0,0,.8), rgba(0,0,0,0.4))",
          }}
          onClick={() =>
            document
              .getElementById("scroll-container")
              ?.scrollBy({ left: 300, behavior: "smooth" })
          }
        >
          <Image
            src={rightIcon}
            alt="Right"
            width={32}
            height={32}
            className=" cursor-pointer"
          />
        </div>
      </div>
    </div>
  );
}
