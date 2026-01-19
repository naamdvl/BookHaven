export default function Footer() {
    return(
        <footer className="bg-[#6B3E26] text-[#FAF7F2] shadow-lg">
            <div className=" max-w-7x1 mx-auto px-4 py-6 text-center">

                <p className="text-xs opacity-70 ">
                     © {new Date().getFullYear()} Todos los derechos reservados.
                </p>

            </div>
        </footer>
    )
}