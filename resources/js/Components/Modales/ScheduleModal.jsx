import React from 'react';

export default function ScheduleModal({ isOpen, onClose, summaryData = {}, groups = [] }) {
    if (!isOpen) return null;

    // Valores por defecto basados en tu prototipo si no llegan desde el backend
    const totalStudents = summaryData.total_students || 55;
    const openGroups = summaryData.open_groups || 3;
    const assignedTeachers = summaryData.assigned_teachers || 3;
    const usedClassrooms = summaryData.used_classrooms || 1;

    return (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-50 p-4 animate-fade-in">
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

                    {/* Tabla de Horarios del Modal */}
                    <div className="overflow-x-auto rounded-xl border border-gray-100">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr class="bg-[#1F3A5F] text-white text-sm font-semibold">
                                    <th className="p-3 text-center">Grupo</th>
                                    <th className="p-3 text-center">Subnivel</th>
                                    <th className="p-3 text-center">Horario</th>
                                    <th className="p-3 text-center">Aula</th>
                                    <th className="p-3 text-center">Docente</th>
                                </tr>
                            </thead>
                            <tbody className="text-gray-600 text-sm divide-y divide-gray-100">
                                {groups.length > 0 ? (
                                    groups.slice(0, 3).map((group, index) => (
                                        <tr key={group.id || index} className="hover:bg-gray-50">
                                            <td className="p-3 font-medium text-center">{group.group_key}</td>
                                            <td className="p-3 text-gray-500 text-center">{group.level?.name || 'A1'}</td>
                                            <td className="p-3 text-center">{group.schedule_type || '11:30-13:00'}</td>
                                            <td className="p-3 text-center">
                                                {group.modality === 'Virtual' ? (
                                                    <span className="text-indigo-600 font-semibold bg-indigo-50 px-2 py-0.5 rounded-md text-xs">
                                                        Virtual
                                                    </span>
                                                ) : (
                                                    group.classroom || 'A1'
                                                )}
                                            </td>
                                            <td className="p-3 font-medium text-gray-700 text-center">
                                                {group.teacher ? `${group.teacher.first_name} ${group.teacher.last_name}` : 'Sin asignar'}
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    // Datos estáticos del prototipo de respaldo
                                    <>
                                        <tr className="hover:bg-gray-50">
                                            <td className="p-3 font-medium text-center">G1</td>
                                            <td className="p-3 text-gray-500 text-center">A1</td>
                                            <td className="p-3 text-center">11:30 - 13:00</td>
                                            <td className="p-3 text-center">A1</td>
                                            <td className="p-3 font-medium text-gray-700 text-center">Ana Martínez</td>
                                        </tr>
                                        <tr className="hover:bg-gray-50">
                                            <td className="p-3 font-medium text-center">G2</td>
                                            <td className="p-3 text-gray-500 text-center">A1</td>
                                            <td className="p-3 text-center">14:00 - 15:30</td>
                                            <td className="p-3 text-center">A1</td>
                                            <td className="p-3 font-medium text-gray-700 text-center">Pedro López</td>
                                        </tr>
                                        <tr className="hover:bg-gray-50">
                                            <td className="p-3 font-medium text-center">G3</td>
                                            <td className="p-3 text-gray-500 text-center">B1</td>
                                            <td className="p-3 text-center">18:30 - 20:00</td>
                                            <td className="p-3 text-center">
                                                <span className="text-indigo-600 font-semibold bg-indigo-50 px-2 py-0.5 rounded-md text-xs">
                                                    Virtual
                                                </span>
                                            </td>
                                            <td className="p-3 font-medium text-gray-700 text-center">Lucía Hernández</td>
                                        </tr>
                                    </>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Pie del Modal (Acciones) */}
                <div className="bg-gray-50 px-6 py-4 flex flex-wrap gap-3 border-t border-gray-100 flex-shrink-0 justify-start">
                    <button className="bg-[#1F3A5F] hover:bg-[#244b88] text-white px-5 py-2 rounded-lg font-medium text-sm transition shadow-sm">
                        Confirmar horarios
                    </button>
                    <button className="bg-gray-500 hover:bg-gray-600 text-white px-5 py-2 rounded-lg font-medium text-sm transition shadow-sm">
                        Descargar PDF
                    </button>
                    <button className="bg-gray-500 hover:bg-gray-600 text-white px-5 py-2 rounded-lg font-medium text-sm transition shadow-sm">
                        Exportar Excel
                    </button>
                </div>

            </div>
        </div>
    );
}