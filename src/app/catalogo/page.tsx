import { db } from "@/lib/db";
import CatalogoClient from "./CatalogoClient";

type Libro = {
    id: number;
    titulo: string;
    autor: string;
    descripcion: string;
    categoria: string;
    image: string;
};


export default async function CatalogoPage() {
    const [rows] = await db.query(
        "SELECT id, titulo, autor, descripcion, categoria, image FROM libros"
    );

    return (
        <main className="p-6 min-h-screen">
            <h1 className="flex justify-center text-amber-900 text-2x1 font-bold mb-6">
                Catalogo de libros
            </h1>

            <CatalogoClient libros={rows as Libro[]} />
        </main>
    )
}