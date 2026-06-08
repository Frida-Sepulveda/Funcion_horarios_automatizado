import React, { useState } from 'react';
import { Link, router, useForm } from '@inertiajs/react';

import AppLayout from '@/Components/Layout/AppLayout';
import Button from "@/Components/UI/Button";

export default function Index({ classrooms = [] }) {
    // Estado para controlar la apertura/cierre de la ventana modal flotante
    const [isModalOpen, setIsModalOpen] = useState(false);

    // --- LÓGICA DE LA LISTA (ELIMINAR) ---
    function deleteClassroom(id) {
        if (!confirm('¿Eliminar esta aula?')) return;

        router.delete(`/classrooms/${id}`, {
            preserveScroll: true,
        });
    }

    // --- LÓGICA DEL FORMULARIO INTEGRADO (MODAL) ---
    const { data, setData, post, reset, processing, errors } = useForm({
        name: '',
        building: '',
        max_capacity: '',
        type: '',
        platform: '',
        status: 'Disponible'
    });

    function submit(e) {
        e.preventDefault();
        post('/classrooms', {
            onSuccess: () => {
                reset(); // Limpia los inputs tras guardar
                setIsModalOpen(false); // Cierra el recuadro modal automáticamente
            }
        });
    }

    return (
        <AppLayout>
            <div className="contenedor p-6 max-w-7xl mx-auto space-y-6">
                
                {/* ENCABEZADO SUPERIOR */}
                <div className="flex flex-col md:flex-row md:items-center md:justify-between pb-2">
                    <div className="border-l-4 border-orange-500 pl-4">
                        <h2 className="text-2xl font-bold text-slate-800 tracking-tight">
                            Aulas
                        </h2>
                        <p className="text-sm text-gray-500 mt-1">
                            Gestión de aulas registradas
                        </p>
                    </div>
                </div>

                {/* BARRA DE HERRAMIENTAS (BÚSQUEDA Y FILTROS) */}
                <div className="space-y-4">
                    <div>
                        {/* El botón ahora abre directamente el recuadro flotante en la misma pantalla */}
                        <button 
                            type="button"
                            onClick={() => setIsModalOpen(true)}
                            className="bg-[#0f2c59] hover:bg-[#0b2244] text-white px-4 py-2 rounded-md font-medium text-sm flex items-center gap-1 shadow-sm transition"
                        >
                            <span className="text-lg font-light">+</span> Nueva Aula
                        </button>
                    </div>

                    {/* Fila de Filtros Estilizada */}
                    <div className="flex flex-wrap items-center gap-3 bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
                        <div className="relative flex-1 min-w-[260px]">
                            <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-400">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                            </span>
                            <input 
                                type="text" 
                                placeholder="Buscar aula" 
                                className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-blue-500 text-gray-600 placeholder-gray-400"
                            />
                        </div>

                        {/*<select className="px-3 py-2 bg-slate-50 border border-gray-200 rounded-lg text-sm text-gray-600 focus:outline-none focus:border-blue-500 min-w-[150px]">
                            <option>Orden: Horario</option>
                        </select> */}

                        <select className="px-3 py-2 bg-slate-50 border border-gray-200 rounded-lg text-sm text-gray-600 focus:outline-none focus:border-blue-500 min-w-[150px]">
                            <option>Tipo de modalidad</option>
                        </select>
                    </div>

                    {/* Contador de registros */}
                    <div className="flex justify-end">
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-blue-50 text-blue-600 border border-blue-100">
                            ● {classrooms.length} {classrooms.length === 1 ? 'Grupo encontrado' : 'Grupos encontrados'}
                        </span>
                    </div>
                </div>

                {/* VISTA EN TARJETAS (RECUADROS PRINCIPALES) */}
                {classrooms.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 pt-2">
                        {classrooms.map((classroom) => (
                            <div key={classroom.id} className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col hover:shadow-md transition">
                                
                                <div className="p-4 pb-2 flex items-start justify-between">
                                    <div className="flex items-center gap-3">
                                        <input type="checkbox" className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                                        <span className="text-xs font-bold text-gray-400">I5</span>
                                    </div>
                                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-700">
                                        Inscripciones Abiertas
                                    </span>
                                </div>

                                <div className="px-4 text-center">
                                    <h3 className="text-lg font-black text-slate-800 tracking-wide uppercase">
                                        {classroom.name}
                                    </h3>
                                </div>

                                <div className="p-4 space-y-3 text-sm flex-1">
                                    {/*<div className="flex justify-between items-start border-b border-gray-50 pb-2">
                                        <span className="text-gray-400">Horario:</span>
                                        <span className="font-medium text-slate-700 text-right">Lunes y Miércoles 16:00 - 18:00</span>
                                    </div>*/}

                                    <div className="flex justify-between items-center border-b border-gray-50 pb-2">
                                        <span className="text-gray-400">Modalidad:</span>
                                        <span className="inline-flex items-center px-2 py-0.5 rounded bg-slate-100 text-xs font-semibold text-slate-600">
                                            {classroom.type}
                                        </span>
                                    </div>

                                    <div className="bg-slate-50 rounded-xl p-3 flex items-center justify-between border border-slate-100">
                                        <span className="text-gray-500 font-medium flex items-center gap-1.5">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
                                            Cupo
                                        </span>
                                        <span className="text-xs font-bold text-blue-600 bg-white border border-blue-200 rounded-lg px-2.5 py-1 shadow-sm">
                                            0 / {classroom.max_capacity}
                                        </span>
                                    </div>
                                </div>

                                <div className="p-4 pt-0 bg-white space-y-2 border-t border-gray-50 pt-3">
                                    <Link 
                                        href={`/classrooms/${classroom.id}/edit`}
                                        className="w-full bg-[#0f2c59] hover:bg-[#0b2244] text-white text-center py-2 rounded-lg text-sm font-semibold block transition shadow-sm"
                                    >
                                        Editar
                                    </Link>
                                    
                                    <button className="w-full bg-[#00a86b] hover:bg-[#008f5a] text-white text-center py-2 rounded-lg text-sm font-semibold flex items-center justify-center gap-1 transition shadow-sm">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
                                        Ver Grupo
                                    </button>

                                    <button 
                                        onClick={() => deleteClassroom(classroom.id)}
                                        className="w-full bg-white hover:bg-slate-50 text-slate-700 border border-slate-300 text-center py-2 rounded-lg text-sm font-semibold block transition"
                                    >
                                        Eliminar Aula
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="bg-white rounded-xl border border-gray-200 text-center py-12 text-gray-400 text-sm shadow-sm">
                        No hay aulas registradas actualmente.
                    </div>
                )}

                {/* ========================================================================= */}
                {/* --- RECUADRO FLOTANTE INTERACTIVO (VENTANA MODAL) IGUAL A TU FOTO ---      */}
                {/* ========================================================================= */}
                {isModalOpen && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm transition-opacity">
                        
                        {/* Contenedor del Recuadro Blanco */}
                        <div className="bg-white w-full max-w-4xl rounded-xl shadow-xl border border-gray-200 overflow-hidden flex flex-col max-h-[90vh]">
                            
                            {/* Encabezado del Recuadro con la 'X' para cerrar */}
                            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
                                <h1 className="text-xl font-bold text-slate-800">
                                    Agregar aula
                                </h1>
                                <button 
                                    type="button"
                                    onClick={() => setIsModalOpen(false)}
                                    className="text-gray-400 hover:text-gray-600 transition text-xl font-light"
                                >
                                    ✕
                                </button>
                            </div>

                            {/* Cuerpo del Formulario con scroll interno */}
                            <form onSubmit={submit} className="flex-1 overflow-y-auto p-6 space-y-8 discrete-scroll">
                                
                                {/* SECCIÓN 1: DATOS GENERALES DEL AULA */}
                                <div>
                                    <div className="mb-4">
                                        <h2 className="text-md font-semibold text-gray-800">Información de la nueva aula</h2>
                                        <p className="text-xs text-gray-400 mt-0.5">Identificación para su registro.</p>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-xs font-medium text-gray-700 mb-1">Nombre <span className="text-red-500">*</span></label>
                                            <input
                                                type="text"
                                                placeholder="Ej. Aula 10 o Código de Grupo"
                                                value={data.name}
                                                onChange={e => setData('name', e.target.value)}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm shadow-sm focus:outline-none focus:border-blue-500 placeholder-gray-300"
                                                required
                                            />
                                            {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                                            <p className="text-[11px] text-gray-400 mt-1">Captura los nombres como aparecen en su identificación.</p>
                                        </div>

                                        <div>
                                            <label className="block text-xs font-medium text-gray-700 mb-1">Capacidad Máxima <span className="text-red-500">*</span></label>
                                            <input
                                                type="number"
                                                placeholder="Ej. 25"
                                                value={data.max_capacity}
                                                onChange={e => setData('max_capacity', e.target.value)}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm shadow-sm focus:outline-none focus:border-blue-500 placeholder-gray-300"
                                                required
                                            />
                                            {errors.max_capacity && <p className="text-red-500 text-xs mt-1">{errors.max_capacity}</p>}
                                        </div>

                                        <div>
                                            <label className="block text-xs font-medium text-gray-700 mb-1">Tipo de Aula <span className="text-red-500">*</span></label>
                                            <select
                                                value={data.type}
                                                onChange={e => setData('type', e.target.value)}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm bg-white shadow-sm focus:outline-none focus:border-blue-500 text-gray-700"
                                                required
                                            >
                                                <option value="">Seleccione tipo</option>
                                                <option value="Presencial">Presencial</option>
                                                <option value="Virtual">Virtual</option>
                                            </select>
                                            {errors.type && <p className="text-red-500 text-xs mt-1">{errors.type}</p>}
                                        </div>

                                        <div>
                                            <label className="block text-xs font-medium text-gray-700 mb-1">Estado de Disponibilidad</label>
                                            <select
                                                value={data.status}
                                                onChange={e => setData('status', e.target.value)}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm bg-white shadow-sm focus:outline-none focus:border-blue-500 text-gray-700"
                                            >
                                                <option value="Disponible">Disponible</option>
                                                <option value="Mantenimiento">Mantenimiento</option>
                                                <option value="Inactiva">Inactiva</option>
                                            </select>
                                            {errors.status && <p className="text-red-500 text-xs mt-1">{errors.status}</p>}
                                        </div>

                                        {/* RENDER DINÁMICO: EDIFICIO (SI ES PRESENCIAL) */}
                                        {data.type === 'Presencial' && (
                                            <div className="md:col-span-2 animate-fadeIn">
                                                <label className="block text-xs font-medium text-gray-700 mb-1">Edificio / Ubicación Física <span className="text-red-500">*</span></label>
                                                <input
                                                    type="text"
                                                    placeholder="Ej. Edificio K, Planta Alta"
                                                    value={data.building}
                                                    onChange={e => setData('building', e.target.value)}
                                                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm shadow-sm focus:outline-none focus:border-blue-500 placeholder-gray-300"
                                                    required
                                                />
                                                {errors.building && <p className="text-red-500 text-xs mt-1">{errors.building}</p>}
                                            </div>
                                        )}

                                        {/* RENDER DINÁMICO: PLATAFORMA (SI ES VIRTUAL) */}
                                        {data.type === 'Virtual' && (
                                            <div className="md:col-span-2 animate-fadeIn">
                                                <label className="block text-xs font-medium text-gray-700 mb-1">Plataforma de Software <span className="text-red-500">*</span></label>
                                                <select
                                                    value={data.platform}
                                                    onChange={e => setData('platform', e.target.value)}
                                                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm bg-white shadow-sm focus:outline-none focus:border-blue-500 text-gray-700"
                                                    required
                                                >
                                                    <option value="">Seleccione software</option>
                                                    <option value="Teams">Microsoft Teams</option>
                                                    <option value="Google Meet">Google Meet</option>
                                                    <option value="Zoom">Zoom</option>
                                                </select>
                                                {errors.platform && <p className="text-red-500 text-xs mt-1">{errors.platform}</p>}
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {/* Botonera Inferior idéntica a la imagen */}
                                <div className="flex justify-end gap-3 border-t border-gray-100 pt-4 sticky bottom-0 bg-white pb-2">
                                    <button
                                        type="button"
                                        onClick={() => setIsModalOpen(false)}
                                        className="px-5 py-2 border border-gray-300 text-gray-700 rounded-xl text-sm font-medium hover:bg-gray-50 transition select-none"
                                    >
                                        Cancelar
                                    </button>
                                    <button 
                                        type="submit"
                                        disabled={processing}
                                        className="bg-[#1e3a63] hover:bg-[#142846] text-white px-6 py-2 rounded-xl text-sm font-medium transition shadow-sm select-none"
                                    >
                                        {processing ? 'Guardando...' : 'Guardar'}
                                    </button>
                                </div>

                            </form>
                        </div>
                    </div>
                )}

            </div>
        </AppLayout>
    );
}