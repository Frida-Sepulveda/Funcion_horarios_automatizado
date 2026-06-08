import AppLayout from "@/Components/Layout/AppLayout";
//import Navbar from "@/Components/Layout/Navbar";
import Button from "@/Components/UI/Button";
import { useState } from 'react'; 
import ScheduleModal from "@/Components/Modales/ScheduleModal"; 
import { Link, router, usePage } from '@inertiajs/react';

// CORRECCIÓN 1: Recibir summaryData con un objeto vacío por defecto para que no truene al recargar
export default function Dashboard({ groups = [], summaryData = {} }) {
    // Estado local para controlar el modal
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { flash = {} } = usePage().props;

    // Función para manejar la ejecución del backend
    const handleGenerateSchedules = () => {

        if (groups.length === 0) {

            alert(
                'Primero debes crear grupos antes de generar horarios.'
            );

            return;
        }

        router.post('/schedules/generate', {}, {

            onSuccess: () => {

                setIsModalOpen(true);

            },

            onError: (errors) => {

                console.error(
                    "Error al generar horarios:",
                    errors
                );
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

                {/* ALERTAS */}

                {flash.success && (
                    <div className="bg-green-100 border border-green-300 text-green-800 px-4 py-3 rounded-xl mb-6">
                        {flash.success}
                    </div>
                )}

                {flash.error && (
                    <div className="bg-red-100 border border-red-300 text-red-800 px-4 py-3 rounded-xl mb-6">
                        {flash.error}
                    </div>
                )}

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
                            Alumnos elegibles 
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

                {/* ACCIONES */}
                <div className="flex flex-wrap gap-3 mt-8 mb-4">

                    <Button
                        disabled={groups.length > 0}
                        className={`${groups.length > 0
                                ? 'opacity-50 cursor-not-allowed'
                                : ''
                            }`}
                        onClick={() => router.post('/groups/generate')}
                    >
                        Crear grupos 👥
                    </Button>

                    <Button
                        onClick={() => {

                            if (
                                confirm(
                                    '¿Seguro que deseas limpiar todos los grupos y horarios?'
                                )
                            ) {

                                router.delete('/groups/clear');

                            }

                        }}
                    >
                        Limpiar grupos 🗑️
                    </Button>

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
                                <th className="p-3">Aula</th>
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

                                            {group.schedules?.length > 0 ? (

                                                group.schedules.map((schedule, index) => (

                                                    <div key={index}>

                                                        {schedule.schedule_block?.day}

                                                        {' '}

                                                        {schedule.schedule_block?.start_time?.slice(0, 5)}

                                                        {' - '}

                                                        {schedule.schedule_block?.end_time?.slice(0, 5)}

                                                    </div>

                                                ))

                                            ) : (

                                                'Sin horario disponible'

                                            )}

                                        </td>
                                        <td className="p-3 text-center">
                                            {group.classroom
                                                ? group.classroom.name
                                                : 'Sin aula'}

                                        </td>
                                        <td className="p-3 text-center">
                                            {group.teacher
                                                ? `${group.teacher.first_name} ${group.teacher.last_name}`
                                                : 'Sin asignar'}
                                        </td>
                                        <td className="p-3 text-center">{group.students?.length}</td>
                                        <td className="p-3 text-center">
                                            <span
                                                className={`px-3 py-1 rounded-full text-sm font-semibold ${group.status === 'Abierto'
                                                        ? 'bg-green-100 text-green-700'
                                                        : 'bg-yellow-100 text-yellow-700'
                                                    }`}
                                            >
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