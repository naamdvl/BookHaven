"use client";

import Image from "next/image";
import Link from "next/link";
import SearchBar from "./SearchBar";

export default function NavBar() {
    return (
        <header className="bg-[#6B3E26] text-white">
            <nav className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

            {/*Logo*/}
            <Link href="/" className="flex items-center gap-2">
            <Image
            src="/logo.png"
            alt="BookHaven logo"
            width={40}
            height={40}
            priority
            />
            <span className="text-white text-xl font-bold">
            | BookHaven
            </span>
            </Link>

            <div className="flex">
                <SearchBar />
            </div>

            <div>
                <Link href="/catalogo" className="hover:text-amber-700 transition">
                Catalogo Completo
                </Link>
            </div>

            </nav>
        </header>
    )
}