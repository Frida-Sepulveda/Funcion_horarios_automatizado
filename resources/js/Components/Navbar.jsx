export default function Navbar() {

    return (

        <header className="bg-[#1F3A5F] text-white h-16 flex items-center justify-between px-6">

            {/* LOGO */}

            <div className="flex items-center gap-4">

                <img
                    src="/images/logo_itl.png"
                    alt="Logo ITL"
                    className="h-9"
                />

                <span className="text-sm font-medium">
                    Sistema de Horarios
                </span>

            </div>

            {/* MENU */}

            <nav className="hidden md:flex gap-6 text-sm font-medium">

                <a href="#">
                    Inicio
                </a>

                <a href="#">
                    Docentes
                </a>

                <a href="#">
                    Configuración
                </a>

            </nav>

            {/* USER */}

            <div className="font-bold">
                Administrador
            </div>

        </header>
    );
}