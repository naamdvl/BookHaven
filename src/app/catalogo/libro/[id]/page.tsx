'use client'

import Image from "next/image";
import { useEffect, useState } from "react";
import { use } from "react";

type Libro = {
    id: number;
    titulo: string;
    autor: string;
    descripcion: string;
    categoria: string;
    image: string;
};

export default function DetalleLibroPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params);
    const [libro, setLibro] = useState<Libro | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchLibro = async () => {
            try {
                const res = await fetch(`/api/libros/${id}`);
                if (res.ok) {
                    const data = await res.json();
                    setLibro(data);
                }
            } catch (error) {
                console.error("Error al cargar el libro:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchLibro();
    }, [id]);

    if (loading) {
        return (
            <main className="p-6 min-h-screen">
                <div className="max-w-4xl mx-auto">
                    <div className="text-center">Cargando...</div>
                </div>
            </main>                             
        );
    }

    if (!libro) {
        return (
            <main className="p-6 min-h-screen">
                <div className="max-w-4xl mx-auto">
                    <div className="text-center text-amber-900">Libro no encontrado</div>
                </div>
            </main>
        );
    }

    return (
        <main className="p-6 min-h-screen">
            <div className="max-w-4xl mx-auto">

                {/* Contenedor principal */}
                <div className="bg-white rounded-lg shadow-lg p-8">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {/* Imagen */}
                        <div className="flex justify-center">
                            <div className="relative w-48 aspect-3/4 rounded-lg overflow-hidden shadow-md">
                                <Image
                                    src={libro.image}
                                    alt={`Portada de ${libro.titulo}`}
                                    fill
                                    className="object-contain"
                                    priority
                                />
                            </div>
                        </div>

                        {/* Información */}
                        <div className="md:col-span-2 space-y-6">
                            {/* Título */}
                            <div>
                                <h1 className="text-3xl font-bold text-amber-900">
                                    {libro.titulo}
                                </h1>
                            </div>

                            {/* Autor */}
                            <div className="border-l-4 border-amber-400 pl-4">
                                <p className="text-sm text-gray-500 uppercase tracking-wide">Autor</p>
                                <p className="text-xl text-amber-800 font-semibold">
                                    {libro.autor}
                                </p>
                            </div>

                            {/* Categoría */}
                            <div>
                                <p className="text-sm text-gray-500 uppercase tracking-wide mb-2">Categoría</p>
                                <span className="inline-block bg-amber-100 text-amber-900 px-4 py-2 rounded-full font-medium">
                                    {libro.categoria}
                                </span>
                            </div>

                            {/* Descripción */}
                            <div>
                                <p className="text-sm text-gray-500 uppercase tracking-wide mb-3">Descripción</p>
                                <p className="text-gray-700 leading-relaxed text-justify whitespace-pre-wrap">
                                    {libro.descripcion}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
