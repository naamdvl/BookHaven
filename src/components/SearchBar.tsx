'use client'

import { useState } from "react"
import { useRouter } from "next/navigation"


export default function SearchBar() {
    const  [query, setQuery] = useState("");
    const router = useRouter();

    function handleSearch(e: React.FormEvent) {
        e.preventDefault();

        if (!query.trim()) return;

        router.push(`/catalogo?q=${encodeURIComponent(query)}`)

    }
    
    return(
        <form onSubmit={handleSearch} className="flex gap-2">
            <input
             type="text"
             placeholder="Buscar Libros..."
             value={query}
             onChange={(e) => setQuery(e.target.value)}
             className="border px-8 py-2 rounded-md"
             />
             <button className="bg-[#C96A2C] hover:bg-[#923f08] text-white px-6 rounded-md ">
                Buscar
             </button>
        </form>
    );

}