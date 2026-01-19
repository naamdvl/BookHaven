

import Image from "next/image";
import { db } from "@/lib/db";
import Link from "next/link";
import CatalogoClient from "./catalogo/CatalogoClient";

type Libro = {
    id: number;
    titulo: string;
    autor: string;
    descripcion: string;
    categoria: string;
    image: string;
}

export default async function Home() {
    const [rows] = await db.query(
        "SELECT id, titulo, autor, descripcion, categoria, image FROM libros"
    )


    const libros = rows as Libro[];

    return (
        <main className="p-6">
        <section className="w-full h-[385] relative overflow-hidden">
        <Image
        src="/banner.png"
        alt="Banner libros"
        fill
        className="object-cover"
        priority
        />
        </section>

        <div className="relative flex items-center mb-6">

            <h1 className="absolute left-1/2 -translate-x-1/2 text-2x1 font-bold text-amber-950">
            Catalogo De Libros
            </h1>

            <Link 
            href="/catalogo/nuevo" 
            className="ml-auto bg-amber-800 hover:bg-amber-950 text-white px-4 py-2 rounded-md transition m-2"
            >
            Agregar Libro
            </Link>

        </div>
            <div className="">
            <CatalogoClient libros={libros} />
            </div>
        </main>

        
    );
}
