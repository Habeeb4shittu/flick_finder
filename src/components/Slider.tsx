
"use client";
import leftIcon from "@/components/icons/left-circle-svgrepo-com.svg";
import rightIcon from "@/components/icons/right-circle-svgrepo-com.svg";
import Image from "next/image";
import { useRouter } from "next/navigation";
import MovieCard from "./MovieCard";
type SliderType = {
  head: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  movies: any;
  fullPageLink?: string;
  fullPageLinkText?: string;
  isFetching?: boolean;
}
export default function Slider({ head, movies, fullPageLink, fullPageLinkText, isFetching }: SliderType) {
  const navigate = useRouter();

  return (
    <div className="flex flex-col w-full h-full">
      <div className="flex items-center justify-between w-full">
        <h4 className="text-[1.3rem] font-bold text-left my-1 text-shadow-cyan-900 font-sans cursor-pointer">
          {head}
        </h4>
        {fullPageLink && (
          <button className="text-sm text-amber-500 flex items-center gap-1.5 cursor-pointer font-semibold  transition duration-300" onClick={() => {
            navigate.push(fullPageLink);
          }}>
            {fullPageLinkText ?? "See All"}
            <span className="">
              <svg
                fill="#f0a21a"
                width="28px"
                height="28px"
                viewBox="-9.5 0 32 32"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                stroke="#f0a21a"
                strokeWidth="0.00038">
                <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
                <g id="SVGRepo_iconCarrier">
                  <title>angle-double-right</title>
                  <path d="M5.6 23.28c-0.2 0-0.44-0.080-0.6-0.24-0.32-0.32-0.32-0.84 0-1.2l5.84-5.84-5.84-5.84c-0.32-0.32-0.32-0.84 0-1.2 0.32-0.32 0.84-0.32 1.2 0l6.44 6.44c0.16 0.16 0.24 0.36 0.24 0.6s-0.080 0.44-0.24 0.6l-6.44 6.44c-0.16 0.16-0.4 0.24-0.6 0.24zM0.84 23.28c-0.2 0-0.44-0.080-0.6-0.24-0.32-0.32-0.32-0.84 0-1.2l5.84-5.84-5.84-5.84c-0.32-0.32-0.32-0.84 0-1.2 0.32-0.32 0.84-0.32 1.2 0l6.44 6.44c0.16 0.16 0.24 0.36 0.24 0.6s-0.080 0.44-0.24 0.6l-6.44 6.44c-0.16 0.16-0.4 0.24-0.6 0.24z"></path>
                </g>
              </svg>
            </span>
          </button>
        )}
      </div>
      <div className="relative select-none">
        <div
          className="absolute -left-12 top-1/2 transform -translate-y-1/2 h-full cursor-pointer flex items-center justify-center text-white px-2"
          onClick={() =>
            document
              .getElementById(`scroll-container${fullPageLink}`)
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
          id={`scroll-container${fullPageLink}`}
          className="flex gap-0 overflow-x-auto overflow-y-hidden hide-scrollbar items-center justify-start pt-1"
        >
          {
            isFetching
              ? Array.from({ length: 8 }).map((_, idx) => (
                <MovieCard key={`skeleton-${idx}`} loading={true} movie={{ id: idx, title: '', poster_path: '', release_date: '' }} />
              ))
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              : movies.map((movie: any) => (
                <MovieCard key={movie.id} movie={movie} />
              ))
          }
        </div>

        <div
          className="absolute -right-12 top-1/2 transform -translate-y-1/2 h-full cursor-pointer flex items-center justify-center text-white p-2"
          onClick={() =>
            document
              .getElementById(`scroll-container${fullPageLink}`)
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
