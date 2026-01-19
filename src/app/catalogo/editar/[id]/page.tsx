import { db } from "@/lib/db";
import EditarLibroForm from "./EditarLibroForm";

type Libro = {
  id: number;
  titulo: string;
  autor: string;
  descripcion: string;
  categoria: string;
  image: string;
};

type Props = {
    params: Promise<{
        id: string;
    }>;
};

export default async function EditarLibroPage(props: Props) {
    const params = await props.params;
    const id = Number(params.id);

    if(isNaN(id)) {
        return <div>ID invalido</div>
    }

    const [rows] = await db.query(
        "SELECT id, titulo, autor, descripcion, categoria, image FROM libros WHERE id = ?",
        [id]
    );

    const libro = (rows as Libro[])[0];

    if(!libro) {
        return <div>Libro no encontrado</div>
    }

    return(
        <main className="max-w-3x1 mx-auto p-6">
            <EditarLibroForm libro={libro}/>
        </main>
    )
}