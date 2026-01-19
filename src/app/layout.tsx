import type { Metadata } from "next";
import "./globals.css";
import NavBar from "@/components/navbar";
import Footer from "@/components/footer";

export const metadata: Metadata = {
  title: "BookHaven",
  description: "Libreria En Casa.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body
        className="bg-white flex flex-col "
      >
        <div className="h-16 border-b">
          <NavBar/>
        </div>
        
        <div className="flex-1">
          {children}
        </div>
          
        <footer className="py-0">
          <Footer/>
        </footer>
      </body>
    </html>
  );
}
