'use client'

import { useRouter } from "next/navigation"
import LibroCard from "@/components/LibroCard"

type Libro = {
    id: number;
    titulo: string;
    autor: string;
    descripcion: string;
    categoria: string;
    image: string;
};

export default function CatalogoClient({ libros }: {libros: Libro[] }) {
    const router = useRouter();

    const handleDelete = async (id: number) => {
        const ok = confirm("¿Eliminar Este Libro?");
        if (!ok) return;

        await fetch(`/api/libros/${id}`, {
            method: "DELETE",
        });

        router.refresh();
    };

    return (
        <div className="grid grid-cols-4 gap-6">
            {libros.map((libro) => (
                <LibroCard
                    key={libro.id}
                    libros={libro}
                    onDelete={() => handleDelete(libro.id)}
                />   
            ))}
        </div>
    );
}

