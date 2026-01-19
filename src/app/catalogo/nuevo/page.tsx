'use client'

import { useRouter } from "next/navigation";
import { useState } from "react"

export default function NuevoLibro() {

    const router = useRouter();

    const [titulo, setTitulo] = useState("");
    const [autor, setAutor] = useState("");
    const [descripcion, setDescripcion] = useState("");
    const [categoria, setCategoria] = useState("");
    const [image, setImage] = useState<File | null>(null);



    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("titulo", titulo);
        formData.append("autor", autor);
        formData.append("descripcion", descripcion);
        formData.append("categoria", categoria);
        
        if(image) {
            formData.append("image", image)
        }

        await fetch("/api/libros", {
            method: "POST",
            body: formData,
        });

        router.push("/catalogo");
        router.refresh();
    };

    return (
        <section className="min-h-screen px-4 py-16">
        <div className="max-w-xl mx-auto bg-gray-50 rounded-xl shadow-md p-6">
        <h1 className="flex justify-center p-5 text-2xl  font-semibold text-gray-800 ">Nuevo Libro</h1>
        <p className=" flex justify-center text-sm text-gray-500 mb-6"> Completa la informacion del libro para añadirlo en el catalogo</p>       
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
        
        <label className="text-sm font-medium text-gray-700">
            Portada
        </label>
        <input 
        type="file"
        className="border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400 text-gray-800"
        accept="image/*"
        onChange={(e) => {
            if (e.target.files) {
                setImage(e.target.files[0]);
            }
        }}
        />
        <button 
        type="submit" 
        className="mt-4 bg-amber-700 hover:bg-amber-800 text-white py-2 rounded-md transition">
            Guardar Libro
        </button>

        </form>
        </div>
        </section>
    );
}