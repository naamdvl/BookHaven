import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import path from "path";
import fs from "fs/promises";

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

export async function POST(req: Request) {
    try {
        const formData = await req.formData();

        const titulo = formData.get("titulo") as string;
        const autor = formData.get("autor") as string;
        const descripcion = formData.get("descripcion") as string;
        const categoria = formData.get("categoria") as string;
        const image = formData.get("image") as File | null;

        let imagePath: string | null  = null;

        if (image) {
            const bytes = await image.arrayBuffer();
            const buffer = Buffer.from(bytes);

            const fileName = `${Date.now()}-${image.name}`;
            const uploadDir = path.join(
                process.cwd(),
                "public/libro"
            );
            await fs.mkdir(uploadDir, { recursive: true });

            const filePath = path.join(uploadDir, fileName);
            await fs.writeFile(filePath, buffer);

            imagePath = `/libro/${fileName}`
        }

        await db.execute(
            `INSERT INTO libros (titulo, autor, descripcion, categoria, image)
            VALUES (?, ?, ?, ?, ?)`,
            [titulo, autor, descripcion, categoria, imagePath]
        );

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error(error);
        return NextResponse.json(
            { error: "Error al guardar libro "},
            { status: 500 }
        );
    }
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



