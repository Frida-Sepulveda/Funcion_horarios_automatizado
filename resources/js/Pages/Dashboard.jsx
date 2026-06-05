import AppLayout from "@/Components/Layout/AppLayout";
//import Navbar from "@/Components/Layout/Navbar";
import { Link } from '@inertiajs/react';
import Button from "@/Components/UI/Button";
import { router } from '@inertiajs/react';
import { useState } from 'react'; 
import ScheduleModal from "@/Components/Modales/ScheduleModal"; 

// CORRECCIÓN 1: Recibir summaryData con un objeto vacío por defecto para que no truene al recargar
export default function Dashboard({ groups = [], summaryData = {} }) {
    // Estado local para controlar el modal
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Función para manejar la ejecución del backend
    const handleGenerateSchedules = () => {
        router.post('/schedules/generate', {}, {
            onSuccess: () => {
                // Al completarse correctamente la petición en Laravel, abrimos el modal
                setIsModalOpen(true);
            },
            onError: (errors) => {
                console.error("Error al generar horarios:", errors);
            }
        });
    };

    return (
        <AppLayout>
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
                        <Link
                            href="/students"
                            className="bg-[#1F3A5F] text-white px-4 py-2 rounded-lg hover:bg-[#244b88] transition inline-block"
                        >
                            Importar 📤
                        </Link>
                    </div>

                    {/* CARD 2 */}
                    <div className="bg-white rounded-2xl p-6 shadow-md hover:-translate-y-1 transition">
                        <h3 className="text-xl font-semibold mb-4">
                            Horario final
                        </h3>
                        {/* CORRECCIÓN 2: Cambiar la ruta directa por la función manejadora handleGenerateSchedules */}
                        <Button onClick={handleGenerateSchedules}>
                            Crear horarios 📅
                        </Button>
                    </div>

                </div>

                {/* TABLA */}
                <div className="bg-white rounded-2xl shadow-md mt-8 overflow-hidden">
                    <table className="w-full border-collapse">
                        <thead>
                            <tr className="bg-[#1F3A5F] text-white">
                                <th className="p-3">Grupo</th>
                                <th className="p-3">Nivel</th>
                                <th className="p-3">Modalidad</th>
                                <th className="p-3">Horario</th>
                                <th className="p-3">Docente</th>
                                <th className="p-3">Alumnos</th>
                                <th className="p-3">Estado</th>
                            </tr>
                        </thead>
                        <tbody>
                            {groups.length > 0 ? (
                                groups.map((group) => (
                                    <tr
                                        key={group.id}
                                        className="border-b hover:bg-gray-50"
                                    >
                                        <td className="p-3 text-center">{group.group_key}</td>
                                        <td className="p-3 text-center">{group.level?.name}</td>
                                        <td className="p-3 text-center">{group.modality}</td>
                                        <td className="p-3 text-center">
                                            {group.schedule_type}
                                            {' - '}
                                            {group.shift}
                                        </td>
                                        <td className="p-3 text-center">
                                            {group.teacher
                                                ? `${group.teacher.first_name} ${group.teacher.last_name}`
                                                : 'Sin asignar'}
                                        </td>
                                        <td className="p-3 text-center">{group.students?.length}</td>
                                        <td className="p-3 text-center">
                                            <span className="text-yellow-600 font-semibold">
                                                {group.status}
                                            </span>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td
                                        colSpan="7"
                                        className="p-4 text-center"
                                    >
                                        No hay grupos generados.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

            </div>

            {/* Inyección del componente modal */}
            <ScheduleModal 
                isOpen={isModalOpen} 
                onClose={() => setIsModalOpen(false)} 
                groups={groups}
                summaryData={summaryData}
            />
        </AppLayout>
    );
}