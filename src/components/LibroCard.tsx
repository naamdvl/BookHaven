'use client'

import Image from "next/image";
import Link from "next/link";
import { Trash2, SquarePen } from "lucide-react";

type Libro = {
    id: number;
    titulo: string;
    autor: string;
    descripcion: string;
    categoria: string;
    image: string;
};

type Props = {
    libros: Libro;
    onDelete: () => void;
};


export default function LibroCard({ libros, onDelete }: Props) {

    return (
        <div className="">
                <div className="group relative bg-gray-100 rounded-lg p-4 flex flex-col items-center transition-all duration-300 hover:shadow-lg hover:-translate-y-1 max-w-220 mx-auto cursor-pointer">
                    <Link href={`/catalogo/libro/${libros.id}`} className="w-full flex flex-col items-center">
                        <div className="relative w-36 aspect-3/4  rounded-md overflow-hidden transition-transform duration-300 group-hover:scale-105">
                        <Image
                        src={libros.image}
                        alt={`Portada de ${libros.titulo}`}
                        fill
                        className="object-contain"
                        priority
                        />
                        </div>

                        <h2 className="mt-3 text-center text-black font-medium line-clamp-2">
                            {libros.titulo}
                        </h2>

                        <p className="text-center text-gray-500 text-sm line-clamp-1">
                            {libros.autor}
                        </p>
                    </Link>

                    <div className="absolute bottom-3 right-2 flex gap-2 opacity-0 group-hover:opacity-100 transition">

                    <Link href={`/catalogo/editar/${libros.id}/`} 
                    className="flex items-center justify-center bg-yellow-400 hover:bg-yellow-500 size-7 rounded-md"
                    >
                    <SquarePen size={16}/>
                    </Link>

                    <button
                    onClick={onDelete} 
                    className="flex items-center justify-center bg-red-800 hover:bg-red-900 size-7 rounded-md">
                    <Trash2 size={16} />
                    </button>
                    </div>
                </div>
            
        </div>
    )
    
}