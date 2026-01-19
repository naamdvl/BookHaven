# 📚 BookHaven

Una aplicacion web para gestionar y explorar un catalogo de libros.

## 🚀 Tecnologias

- **Next.js 16** - Framework React
- **TypeScript** - Tipado estatico
- **Tailwind CSS** - Estilos
- **MySQL 2** - Base de datos
- **Node.js** - Runtime

## 📋 Requisitos previos

- **Node.js** 18+ ([Descargar](https://nodejs.org/))
- **npm** o **yarn**
- **MySQL Server** 8.0+

## 🔧 Instalacion en otra maquina

### 1. Clonar el repositorio
```bash
git clone https://github.com/TU_USUARIO/BookHaven.git
cd BookHaven/bookhaven
```

### 2. Instalar dependencias
```bash
npm install
```

### 3. Configurar variables de entorno
Copia el archivo `.env.example` a `.env` y configura tus valores locales:
```bash
cp .env.example .env
```

Edita `.env` con tu configuracion MySQL:
```env
DB_HOST=localhost
DB_USER=tu_usuario
DB_PASSWORD=tu_contraseña
DB_NAME=bookhaven
```

### 4. Crear la base de datos
Asegurate de que MySQL este corriendo y crea la base de datos:
```bash
mysql -u root -p
CREATE DATABASE bookhaven;
USE bookhaven;
-- Importa tu schema aqui (si tienes archivo SQL)
```

### 5. Ejecutar en desarrollo
```bash
npm run dev
```
La aplicacion estara disponible en [http://localhost:3000](http://localhost:3000)

## 📦 Scripts disponibles

- `npm run dev` - Ejecutar en modo desarrollo
- `npm run build` - Construir para produccion
- `npm run start` - Ejecutar version produccion
- `npm run lint` - Ejecutar linter

## 📁 Estructura del proyecto

```
src/
├── app/
│   ├── api/           # Rutas API
│   ├── catalogo/      # Pagina de catalogo
│   └── layout.tsx     # Layout principal
├── components/        # Componentes reutilizables
├── lib/               # Utilidades y conexion BD
└── globals.css        # Estilos globales
```

## 🐛 Solucion de problemas

### Error de conexion MySQL
- Verifica que MySQL este corriendo
- Revisa las credenciales en `.env`
- Comprueba el nombre de la base de datos

### Error de modulos no encontrados
```bash
npm install
```

### Puerto 3000 en uso
```bash
npm run dev -- -p 3001
```

## 📝 Notas

- El archivo `.env` no esta versionado (`.gitignore`)
- Cada desarrollador necesita su propia configuracion local de `.env`
- Para contribuir, crea un branch y abre un Pull Request
