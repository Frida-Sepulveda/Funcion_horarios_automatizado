import React from 'react';
import { router } from '@inertiajs/react';

export default function ScheduleModal({ isOpen, onClose, summaryData = {}, groups = [] }) {
    if (!isOpen) return null;

    const totalStudents = summaryData.total_students || 0;
    const openGroups = summaryData.open_groups || 0;
    const assignedTeachers = summaryData.assigned_teachers || 0;
    const usedClassrooms = summaryData.used_classrooms || 0;

    return (
        <div className="fixed inset-0 backdrop-blur-sm bg-black/20 flex items-center justify-center z-50 p-4">
            {/* Contenedor del Modal */}
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl overflow-hidden flex flex-col max-h-[90vh]">
                
                {/* Encabezado */}
                <div className="flex justify-between items-center px-6 py-4 border-b border-gray-100 flex-shrink-0">
                    <h3 className="text-xl font-bold text-[#1F3A5F]">
                        Generación final de horarios
                    </h3>
                    <button 
                        onClick={onClose} 
                        className="text-gray-400 hover:text-gray-600 text-2xl font-semibold transition"
                    >
                        &times;
                    </button>
                </div>

                {/* Cuerpo del Modal (Con scroll interno por si la tabla crece) */}
                <div className="p-6 space-y-6 overflow-y-auto">
                    
                    {/* Bloque de Métricas (Tarjetas) */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                        <div className="border-2 border-[#1F3A5F] rounded-xl p-3 text-center bg-white shadow-sm">
                            <span className="block text-2xl font-bold text-[#1F3A5F]">{totalStudents}</span>
                            <span className="text-xs text-gray-500 font-medium">Alumnos procesados</span>
                        </div>
                        <div className="border border-gray-200 rounded-xl p-3 text-center bg-white shadow-sm">
                            <span className="block text-2xl font-bold text-gray-800">{openGroups}</span>
                            <span className="text-xs text-gray-500 font-medium">Grupos abiertos</span>
                        </div>
                        <div className="border border-gray-200 rounded-xl p-3 text-center bg-white shadow-sm">
                            <span className="block text-2xl font-bold text-gray-800">{assignedTeachers}</span>
                            <span className="text-xs text-gray-500 font-medium">Docentes asignados</span>
                        </div>
                        <div className="border-2 border-[#1F3A5F] rounded-xl p-3 text-center bg-white shadow-sm">
                            <span className="block text-2xl font-bold text-[#1F3A5F]">{usedClassrooms}</span>
                            <span className="text-xs text-gray-500 font-medium">Aulas utilizadas</span>
                        </div>
                    </div>

                    {/* Alerta de Éxito */}
                    <div className="bg-green-100 text-green-800 px-4 py-2.5 rounded-lg flex items-center gap-2 font-medium text-sm border border-green-200">
                        <svg className="w-5 h-5 text-green-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7"></path>
                        </svg>
                        Proceso completado correctamente
                    </div>
                </div>

                {/* Pie del Modal (Acciones) */}
                <div className="bg-gray-50 px-6 py-4 flex flex-wrap gap-3 border-t border-gray-100 flex-shrink-0 justify-start">
                    <button
                        onClick={() => router.post('/schedules/confirm')}
                        className="bg-[#1F3A5F] hover:bg-[#244b88] text-white px-5 py-2 rounded-lg font-medium text-sm transition shadow-sm"
                    >
                        Confirmar horarios
                    </button>
                    <button
                        onClick={() => {
                            window.location.href =
                                '/schedules/export/pdf';
                        }}
                        className="bg-gray-500 hover:bg-gray-600 text-white px-5 py-2 rounded-lg font-medium text-sm transition shadow-sm"
                    >
                        Descargar PDF
                    </button>
                    <button
                        onClick={() => {
                            window.location.href =
                                '/schedules/export/excel';
                        }}
                        className="bg-gray-500 hover:bg-gray-600 text-white px-5 py-2 rounded-lg font-medium text-sm transition shadow-sm"
                    >
                        Exportar Excel
                    </button>
                </div>

            </div>
        </div>
    );
}