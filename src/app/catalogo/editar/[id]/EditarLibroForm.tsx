'use client'

import { useState } from "react"
import { useRouter } from "next/navigation"

type Libro = {
  id: number;
  titulo: string;
  autor: string;
  descripcion: string;
  categoria: string;
  image: string;
};

export default function EditarLibroForm({ libro }: { libro: Libro }) {
    const router = useRouter();

    const [titulo, setTitulo] = useState(libro.titulo);
    const [autor, setAutor] = useState(libro.autor);
    const [descripcion, setDescripcion] = useState(libro.descripcion);
    const [categoria, setCategoria] = useState(libro.categoria);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        await fetch(`/api/libros/${libro.id}`,{
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                titulo,
                autor,
                descripcion,
                categoria,
            }),
        });

        router.push("/catalogo");
        router.refresh();
    };

    return (
        <section className="min-h-screen">
        <div className="max-w-xl mx-auto bg-gray-50 rounded-xl shadow-md p-6">
        <h1 className="flex justify-center p-5 text-2xl  font-semibold text-gray-800 ">Editar Libro</h1>
        <p className=" flex justify-center text-sm text-gray-500 mb-6"> Completa la informacion del libro para editarlo en el catalogo</p>
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <label className="text-sm font-medium text-gray-700">
            Titulo
        </label>
        <input 
        value={titulo}
        onChange={(e) => setTitulo(e.target.value)}
        placeholder="Titulo"
        required
        className="border rounded-md px-3 py-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-orange-400"
        />

        <label className="text-sm font-medium text-gray-700 ">
            Autor
        </label>
        <input 
        value={autor}
        onChange={(e) => setAutor(e.target.value)}
        placeholder="Autor"
        required
        className="border rounded-md px-3 py-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-orange-400"
        />

        <label className="text-sm font-medium text-gray-700">
            Descripcion
        </label>
        <textarea 
        value={descripcion}
        onChange={(e) => setDescripcion(e.target.value)}
        placeholder="Descripcion"
        required
        className="border rounded-md px-3 py-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-orange-400"
        />

        <label className="text-sm font-medium text-gray-700">
            Categoria
        </label>
        <select
        value={categoria}
        onChange={(e) => setCategoria(e.target.value)}
        required
        className="border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400 text-gray-800"
        >
        <option value="" disabled>
            Selecciona Una Categoria
        </option>
        <option value="novela" className="text-md font-medium text-gray-700">Novela</option>
        <option value="terror" className="text-md font-medium text-gray-700">Terror</option>
        <option value="clasica" className="text-md font-medium text-gray-700">Clasica</option>
        <option value="psicologica" className="text-md font-medium text-gray-700">Psicologica</option>
        </select>

        <button 
        type="submit" 
        className="mt-4 bg-amber-700 hover:bg-amber-800 text-white py-2 rounded-md transition">
            Guardar Libro
        </button>
        </form>
        </div>
        </section>

    )
}