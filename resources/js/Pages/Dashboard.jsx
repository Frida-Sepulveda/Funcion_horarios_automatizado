import AppLayout from "@/Layouts/AppLayout";
import Navbar from "@/Components/Navbar";

export default function Dashboard() {

    return (

        <AppLayout>

            <Navbar />

            <div className="max-w-5xl mx-auto p-6">

                {/* TITULO */}

                <div className="mb-8">

                    <h2 className="text-3xl font-bold text-[#1F3A5F]">

                        Generación de Horarios

                    </h2>

                    <p className="text-gray-600 mt-2">

                        Panel administrativo del sistema

                    </p>

                </div>

                {/* GRID */}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                    {/* CARD 1 */}

                    <div className="bg-white rounded-2xl p-6 shadow-md hover:-translate-y-1 transition">

                        <h3 className="text-xl font-semibold mb-4">

                            Inscripciones

                        </h3>

                        <button className="bg-[#1F3A5F] text-white px-4 py-2 rounded-lg hover:bg-[#244b88] transition">

                            Importar

                        </button>

                    </div>

                    {/* CARD 2 */}

                    <div className="bg-white rounded-2xl p-6 shadow-md hover:-translate-y-1 transition">

                        <h3 className="text-xl font-semibold mb-4">

                            Horario final

                        </h3>

                        <button className="bg-[#1F3A5F] text-white px-4 py-2 rounded-lg hover:bg-[#244b88] transition">

                            Generar horarios

                        </button>

                    </div>

                </div>

                {/* TABLA */}

                <div className="bg-white rounded-2xl shadow-md mt-8 overflow-hidden">

                    <table className="w-full border-collapse">

                        <thead>

                            <tr className="bg-[#1F3A5F] text-white">

                                <th className="p-3">
                                    Grupo
                                </th>

                                <th className="p-3">
                                    Nivel
                                </th>

                                <th className="p-3">
                                    Modalidad
                                </th>

                                <th className="p-3">
                                    Horario
                                </th>

                                <th className="p-3">
                                    Docente
                                </th>

                            </tr>

                        </thead>

                        <tbody>

                            <tr>

                                <td className="p-3 text-center">
                                    —
                                </td>

                                <td className="p-3 text-center">
                                    —
                                </td>

                                <td className="p-3 text-center">
                                    —
                                </td>

                                <td className="p-3 text-center">
                                    —
                                </td>

                                <td className="p-3 text-center">
                                    —
                                </td>

                            </tr>

                        </tbody>

                    </table>

                </div>

            </div>

        </AppLayout>
    );
}