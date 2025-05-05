"use client";
import searchIcon from "@/components/icons/search-alt-2-svgrepo-com.svg"
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Header() {
    const navigate = useRouter();
    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        console.log(event.target.value);

    }
    return (
        <header className="flex gap-1 md:gap-12 items-center justify-between w-full px-12 flex-wrap md:px-24 py-2">
            <h1 className="text-3xl font-bold text-left my-2 text-shadow-cyan-900 font-sans cursor-pointer" onClick={() => {
                navigate.push("/")
            }}>
                Flick<span className="text-amber-500 italic">Finder</span>
            </h1>

            <div className="flex items-center bg-[#1b1b1b] px-4 py-2.5 rounded-md mx-auto w-full">
                <Image src={searchIcon} alt="Search" width={20} height={20} className="text-white opacity-70" />
                <input
                    type="text"
                    placeholder="Search movies..."
                    className="flex-1 ml-3 bg-transparent font-sans text-white placeholder:text-[#a9a8b1] border-none outline-none"
                    onInput={handleSearch}
                />
            </div>
        </header>

    )
}