import { Link } from '@inertiajs/react';

export default function Sidebar() {
    return (
        <aside className="w-64 bg-[#1F3A5F] text-white min-h-screen p-4">

            <h2 className="text-xl font-bold mb-6">
                Sistema Inglés
            </h2>

            <nav className="space-y-2">

                <Link
                    href="/dashboard"
                    className="block hover:bg-[#244b88] p-2 rounded"
                >
                    Dashboard
                </Link>

                <div>

                    <p className="text-gray-300 text-sm uppercase mt-4 mb-2">
                        Usuarios
                    </p>

                    <Link
                        href="/students"
                        className="block hover:bg-[#244b88] p-2 rounded"
                    >
                        Alumnos
                    </Link>

                    <Link
                        href="/teachers"
                        className="block hover:bg-[#244b88] p-2 rounded"
                    >
                        Docentes
                    </Link>

                </div>

                <Link
                    href="/classrooms"
                    className="block hover:bg-[#244b88] p-2 rounded"
                >
                    Aulas
                </Link>

            </nav>

        </aside>
    );
}