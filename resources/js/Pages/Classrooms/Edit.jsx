import React from 'react';
import { useForm, Link } from '@inertiajs/react';
import AppLayout from '@/Components/Layout/AppLayout';
import Button from "@/Components/UI/Button";

export default function Edit({ classroom }) {

    const { data, setData, put, errors } = useForm({
        name: classroom.name || '',
        building: classroom.building || '',
        max_capacity: classroom.max_capacity || '',
        type: classroom.type || '',
        platform: classroom.platform || '',
        status: classroom.status || ''
    });

    function submit(e) {
        e.preventDefault();
        put(`/classrooms/${classroom.id}`);
    }

    // Clases reutilizables para mantener la consistencia visual
    const labelStyle = "block text-sm font-medium text-gray-700 mb-1";
    const inputStyle = "w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white shadow-sm transition duration-150";
    const errorStyle = "text-sm text-red-600 mt-1";

    return (
        <AppLayout>
            <div className="max-w-6xl mx-auto p-6 bg-white rounded-xl shadow-sm border border-gray-100 mt-6">
                
                {/* Encabezados organizados */}
                <div className="mb-6 border-b border-gray-100 pb-4">
                    <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">
                        Aulas
                    </h1>
                    <p className="text-sm text-gray-500 mt-1">
                        Editor de Aula: Modifica los detalles del espacio seleccionado.
                    </p>
                </div>

                <form onSubmit={submit} className="space-y-6">
                    {/* Contenedor Grid para visualización Horizontal */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        
                        {/* Nombre */}
                        <div>
                            <label className={labelStyle}>Nombre:</label>
                            <input 
                                type="text" 
                                className={inputStyle}
                                value={data.name} 
                                onChange={e => setData('name', e.target.value)} 
                            />
                            {errors.name && <div className={errorStyle}>{errors.name}</div>}
                        </div>

                        {/* Capacidad */}
                        <div>
                            <label className={labelStyle}>Capacidad:</label>
                            <input 
                                type="number" 
                                className={inputStyle}
                                value={data.max_capacity} 
                                onChange={e => setData('max_capacity', e.target.value)} 
                            />
                            {errors.max_capacity && <div className={errorStyle}>{errors.max_capacity}</div>}
                        </div>

                        {/* Tipo de Aula */}
                        <div>
                            <label className={labelStyle}>Tipo de Aula:</label>
                            <select
                                className={inputStyle}
                                value={data.type}
                                onChange={e => setData('type', e.target.value)}
                            >
                                <option value="">Seleccione</option>
                                <option value="Presencial">Presencial</option>
                                <option value="Virtual">Virtual</option>
                            </select>
                        </div>

                        {/* Campos Dinámicos (Se integran fluidamente en el grid si se activan) */}
                        {data.type === 'Presencial' && (
                            <div>
                                <label className={labelStyle}>Edificio:</label>
                                <input
                                    type="text"
                                    className={inputStyle}
                                    value={data.building}
                                    onChange={e => setData('building', e.target.value)}
                                />
                                {errors.building && <div className={errorStyle}>{errors.building}</div>}
                            </div>
                        )}

                        {data.type === 'Virtual' && (
                            <div>
                                <label className={labelStyle}>Plataforma:</label>
                                <select
                                    className={inputStyle}
                                    value={data.platform}
                                    onChange={e => setData('platform', e.target.value)}
                                >
                                    <option value="">Seleccione</option>
                                    <option value="Teams">Microsoft Teams</option>
                                    <option value="Google Meet">Google Meet</option>
                                    <option value="Zoom">Zoom</option>
                                </select>
                                {errors.platform && <div className={errorStyle}>{errors.platform}</div>}
                            </div>
                        )}

                        {/* Estado */}
                        <div>
                            <label className={labelStyle}>Estado:</label>
                            <select
                                className={inputStyle}
                                value={data.status}
                                onChange={e => setData('status', e.target.value)}
                            >
                                <option value="Disponible">Disponible</option>
                                <option value="Mantenimiento">Mantenimiento</option>
                                <option value="Inactiva">Inactiva</option>
                            </select>
                            {errors.status && <div className={errorStyle}>{errors.status}</div>}
                        </div>

                    </div>

                    <hr className="border-gray-100 my-4" />

                    {/* Botones de acción alineados al final del formulario */}
                    <div className="flex items-center justify-end space-x-3 pt-2">
                        <Link 
                            href="/classrooms" 
                            className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-150"
                        >
                            Cancelar
                        </Link>
                        <Button type="submit">
                            Actualizar Aula
                        </Button>
                    </div>
                </form>
            </div>
        </AppLayout>
    );
}