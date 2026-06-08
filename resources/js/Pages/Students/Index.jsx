import React from 'react';
import AppLayout from "@/Components/Layout/AppLayout";
import Button from "@/Components/UI/Button";
import Table from "@/Components/UI/Table";
import { router } from '@inertiajs/react';
import { useState } from 'react';

export default function Index({ students = [] }) {
    const [search, setSearch] = useState('');

    const filteredStudents = students.filter((student) =>
    student.control_number
        ?.toLowerCase()
        .includes(search.toLowerCase())
    );

    const exportarCSV = () => {
        if (students.length === 0) {
            alert("No hay datos para exportar");
            return;
        }

        const encabezados = [
            "No. Control",
            "Nombre Completo",
            "Correo",
            "Carrera",
            "Plan",
            "Semestre",
            "Nivel Inglés",
            "Estado"
        ];

        const filas = filteredStudents.map(student => [
            student.control_number || 'N/A',
            `${student.first_name} ${student.last_name}`,
            student.email,
            student.career?.name || 'N/A',
            student.career?.study_plan || 'N/A',
            student.semester,
            student.level?.name || 'N/A',
            student.status
        ]);

        const contenidoCSV =
            "\uFEFF" +
            [
                encabezados.join(","),
                ...filas.map(e => e.join(","))
            ].join("\n");

        const blob = new Blob(
            [contenidoCSV],
            { type: 'text/csv;charset=utf-8;' }
        );

        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.setAttribute("href", url);
        link.setAttribute("download", "Alumnos_Elegibles.csv");
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <AppLayout>
            <div className="contenedor p-6 max-w-7xl mx-auto space-y-6">

                {/* ENCABEZADO DE LA PÁGINA */}
                <div className="titulo-pagina flex flex-col md:flex-row md:items-center md:justify-between border-b border-gray-100 pb-4">
                    <div className="border-l-4 border-orange-500 pl-4">
                        <h2 className="text-2xl font-bold text-slate-800 tracking-tight">
                            Alumnos Elegibles
                        </h2>
                        <p className="text-sm text-gray-500 mt-1">
                            Gestión de alumnos disponibles para inscripción
                        </p>
                    </div>

                    {/* Selector del tipo de tabla */}
                    <div className="mt-4 md:mt-0 flex items-center gap-2 self-end md:self-auto bg-white p-2 rounded-lg border border-gray-200 shadow-sm text-sm">
                        <span className="text-gray-500">Tabla a mostrar:</span>
                        <select className="bg-transparent font-medium text-gray-700 outline-none cursor-pointer">
                            <option>Alumnos</option>
                        </select>
                    </div>
                </div>

                {/* CONTROLES DE BÚSQUEDA Y EXPORTACIÓN */}
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
                    {/* Input de búsqueda */}
                    <div className="relative flex-1 max-w-md">
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-400">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                        </span>
                        <input
                            type="text"
                            placeholder="Buscar alumno por No. Control"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-full pl-9 pr-4 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#0f2c59] text-gray-600 placeholder-gray-400"
                        />
                    </div>

                    {/* Botonera de acciones (Solo con el botón de exportar) */}
                    <div className="flex items-center gap-2 self-end md:self-auto">
                        <button
                            type="button"
                            onClick={exportarCSV}
                            className="inline-flex items-center gap-1.5 px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 shadow-sm transition"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                            </svg>
                            Exportar
                        </button>
                    </div>
                </div>

                {/* CONTENEDOR DE LA TABLA PRINCIPAL */}
                <div className="tabla-contenedor bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                    <Table headers={[
                        "No. Control",
                        "Nombre",
                        "Carrera",
                        "Plan",
                        "Semestre",
                        "Nivel",
                        "Estado",
                        "Grupo"
                    ]}>
                        {students.length > 0 ? (
                            students.map((student) => (
                                <tr key={student.id} className="border-b border-gray-200 hover:bg-slate-50/50 transition-colors">
                                    <td className="px-4 py-3.5 text-sm font-medium text-slate-700">
                                        {student.control_number || 'N/A'}
                                    </td>
                                    <td className="px-4 py-3.5 text-sm text-gray-700">
                                        {student.first_name} {student.last_name}
                                    </td>
                                    <td className="px-4 py-3.5 text-sm text-gray-600"> 
                                        {student.career?.name || 'N/A'}
                                    </td>
                                    <td className="px-4 py-3.5 text-sm text-gray-500 text-center">
                                        {student.career?.study_plan || 'N/A'}
                                    </td> 
                                    <td className="px-4 py-3.5 text-sm text-gray-600 text-center">
                                        {student.semester}
                                    </td>
                                    <td className="px-4 py-3.5 text-sm text-gray-600 text-center font-medium">
                                        {student.level?.name || 'N/A'}
                                    </td>
                                    <td className="px-4 py-3.5 text-sm">
                                        {student.status === 'Elegible' ? (
                                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-green-100 text-green-800">
                                                Elegible
                                            </span>
                                        ) : (
                                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-red-100 text-red-800">
                                                No elegible
                                            </span>
                                        )}
                                    </td>
                                    <td className="px-4 py-3.5 text-sm text-center font-medium">
                                        {student.groups?.length > 0 ? (
                                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-blue-100 text-blue-800">
                                                {student.groups[0].group_key}
                                            </span>
                                        ) : (
                                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-gray-100 text-gray-600">
                                                Por asignar
                                            </span>
                                        )}
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td
                                    colSpan="8"
                                    className="text-center py-8 text-gray-400 text-sm"
                                >
                                    No hay alumnos elegibles registrados en el sistema.
                                </td>
                            </tr>
                        )}
                    </Table>
                </div>

            </div>
        </AppLayout>
    );
}