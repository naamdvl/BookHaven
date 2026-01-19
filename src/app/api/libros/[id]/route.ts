import { NextResponse } from "next/server";
import { db } from "@/lib/db";

type Libro = {
  id: number;
  titulo: string;
  autor: string;
  descripcion: string;
  categoria: string;
  image: string;
};

export async function GET(
    req: Request,
    props: { params: Promise<{ id: string }> }
) {
    const params = await props.params;
    const id = Number(params.id);

    if (isNaN(id)) {
        return NextResponse.json({ error: "ID invalido" }, { status: 400 });
    }

    const [rows] = await db.query(
        "SELECT * FROM libros WHERE id = ?",
        [id]
    );

    const libro = (rows as Libro[])[0];

    if (!libro) {
        return NextResponse.json({ error: "Libro no encontrado" }, { status: 404 });
    }

    return NextResponse.json(libro);
}

export async function PUT(
    req: Request,
    props: { params: Promise<{ id: string }> }
) {
    const params = await props.params;
    const id = Number(params.id);

    if (isNaN(id)) {
        return NextResponse.json({ error: "ID invalido"}, { status: 400 });
    }

    const body = await req.json();
    const {titulo, autor, descripcion, categoria } = body;

    await db.query(
        `UPDATE libros
        SET titulo = ?, autor = ?, descripcion = ?, categoria = ?
        WHERE id = ?`,
        [titulo, autor, descripcion, categoria, id]
    );

    return NextResponse.json({ success: true });
}

export async function DELETE(
    req: Request,
    props: { params: Promise<{ id: string }> }
) {
    const params = await props.params;
    const id = Number(params.id);

    if (isNaN(id)) {
        return NextResponse.json({ error: "ID invalido"}, { status: 400 });
    }

    await db.query(
        "DELETE FROM libros WHERE id = ?", [id]);

    return NextResponse.json({ success: true });
}
