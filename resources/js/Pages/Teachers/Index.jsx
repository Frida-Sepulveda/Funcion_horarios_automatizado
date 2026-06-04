import { useState } from 'react';
import { Link, router, useForm } from '@inertiajs/react';
import AppLayout from '@/Components/Layout/AppLayout';
import Button from "@/Components/UI/Button";
import Table from "@/Components/UI/Table";

export default function Index({ teachers }) {
    // Estado para controlar la apertura/cierre del recuadro (Modal)
    const [isModalOpen, setIsModalOpen] = useState(false);
    
    // ESTADO PARA LA BARRA DE BÚSQUEDA
    const [searchQuery, setSearchQuery] = useState('');

    // --- LÓGICA DE LA LISTA ---
    function deleteTeacher(id) {
        if (confirm('¿Eliminar docente?')) {
            router.delete(`/teachers/${id}`);
        }
    }

    // --- LÓGICA DEL FILTRADO EN TIEMPO REAL ---
    const filteredTeachers = teachers.filter((teacher) => {
        const fullName = `${teacher.first_name} ${teacher.last_name}`.toLowerCase();
        const email = teacher.email ? teacher.email.toLowerCase() : '';
        const query = searchQuery.toLowerCase();
        
        return fullName.includes(query) || email.includes(query);
    });

    // --- LÓGICA DEL FORMULARIO DEL RECUADRO ---
    const { data, setData, post, reset, processing, errors } = useForm({
        first_name: '',
        last_name: '',
        email: '',
        phone: '',
        category: 'A', 
        mcer_level: 'A1', 
        rfc: '', 
        curp: '', 
        bank_clabe: '', 
        ttc_hours: 0, 
        academic_degree: '', 
        is_native: false,
        modality: 'Presencial',
        max_hours: 20,
        status: 'Activo'
    });

    function submit(e) {
        e.preventDefault();
        post('/teachers', {
            onSuccess: () => {
                reset(); // Limpia los campos
                setIsModalOpen(false); // Cierra el recuadro automáticamente al guardar
            }
        });
    }

    return (
        <AppLayout>
            <div className="contenedor p-6 max-w-7xl mx-auto space-y-6">
                
                {/* Encabezado Principal */}
                <div className="titulo-pagina mb-6 flex flex-col md:flex-row md:items-center md:justify-between border-b border-gray-100 pb-4">
                    <div className="border-l-4 border-orange-500 pl-4">
                        <h2 className="text-2xl font-bold text-slate-800 tracking-tight">
                            Docentes
                        </h2>
                        <p className="text-sm text-gray-500 mt-1">
                            Administración general de los registros del sistema.
                        </p>
                    </div>
                    
                    {/* Contenedor Derecho: Buscador + Botón */}
                    <div className="mt-4 md:mt-0 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                        
                        {/* INPUT DE BÚSQUEDA */}
                        <div className="relative flex-1 sm:w-64">
                            <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                            </span>
                            <input
                                type="text"
                                placeholder="Buscar docente o correo..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full pl-9 pr-4 py-2 border border-gray-300 rounded-md text-sm shadow-sm focus:outline-none focus:border-[#0f2c59] focus:ring-1 focus:ring-[#0f2c59] placeholder-gray-400 text-gray-700 bg-white"
                            />
                        </div>

                        {/* Botón Superior Derecho de tu foto principal */}
                        <button 
                            type="button"
                            onClick={() => setIsModalOpen(true)}
                            className="bg-[#0f2c59] hover:bg-[#0b2244] text-white px-4 py-2 rounded-md font-medium text-sm flex items-center justify-center gap-1 shadow-sm transition whitespace-nowrap"
                        >
                            <span className="text-lg font-light">+</span> Registrar Nuevo
                        </button>
                    </div>
                </div>

                {/* Contenedor de la Tabla Principal */}
                <div className="tabla-contenedor bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                    <Table headers={[
                        "Nombre",
                        "Email",
                        "Categoría",
                        "MCER",
                        "Modalidad",
                        "Estado",
                        "Acciones"
                    ]}>
                        {filteredTeachers.length > 0 ? (
                            filteredTeachers.map((teacher) => (
                                <tr key={teacher.id} className="border-b border-gray-200 hover:bg-slate-50/50 transition-colors">
                                    <td className="px-4 py-3.5 text-sm text-gray-700">
                                        {teacher.first_name} {teacher.last_name}
                                    </td>
                                    <td className="px-4 py-3.5 text-sm text-gray-600">
                                        {teacher.email}
                                    </td>
                                    <td className="px-4 py-3.5 text-sm text-gray-600">
                                        {teacher.category}
                                    </td>
                                    <td className="px-4 py-3.5 text-sm text-gray-600 text-center font-medium">
                                        {teacher.mcer_level}
                                    </td>
                                    <td className="px-4 py-3.5 text-sm text-gray-600">
                                        {teacher.modality}
                                    </td>
                                    <td className="px-4 py-3.5 text-sm">
                                        {teacher.status === 'Activo' ? (
                                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                                Activo
                                            </span>
                                        ) : (
                                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                                                Inactivo
                                            </span>
                                        )}
                                    </td>
                                    <td className="px-4 py-3.5 text-sm whitespace-nowrap">
                                        <div className="flex items-center gap-2">
                                            <Link
                                                href={`/teachers/${teacher.id}/edit`}
                                                className="p-1.5 bg-orange-500 text-white rounded hover:bg-orange-600 transition shadow-sm flex items-center justify-center inline-block"
                                                title="Editar"
                                            >
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                                                </svg>
                                            </Link>

                                            <button
                                                type="button"
                                                onClick={() => deleteTeacher(teacher.id)}
                                                className="p-1.5 bg-red-500 text-white rounded hover:bg-red-600 transition shadow-sm flex items-center justify-center"
                                                title="Eliminar"
                                            >
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                </svg>
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="7" className="text-center py-8 text-gray-400 text-sm">
                                    {searchQuery ? 'No se encontraron docentes que coincidan con la búsqueda.' : 'No hay docentes registrados.'}
                                </td>
                            </tr>
                        )}
                    </Table>
                </div>

                {/* ========================================================================= */}
                {/* --- RECUADRO FLOTANTE (VENTANA MODAL) --- */}
                {/* ========================================================================= */}
                {isModalOpen && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm transition-opacity">
                        
                        {/* Contenedor del Recuadro Blanco */}
                        <div className="bg-white w-full max-w-4xl rounded-lg shadow-xl border border-gray-200 overflow-hidden flex flex-col max-h-[90vh]">
                            
                            {/* Encabezado del Recuadro con la 'X' para cerrar */}
                            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
                                <h1 className="text-xl font-bold text-slate-800">
                                    Añadir maestro
                                </h1>
                                <button 
                                    type="button"
                                    onClick={() => setIsModalOpen(false)}
                                    className="text-gray-400 hover:text-gray-600 transition text-xl font-light"
                                >
                                    ✕
                                </button>
                            </div>

                            {/* Cuerpo del Formulario */}
                            <form onSubmit={submit} className="flex-1 overflow-y-auto p-6 space-y-8 discrete-scroll">
                                
                                {/* SECCIÓN 1: DATOS DEL DOCENTE */}
                                <div>
                                    <div className="mb-4">
                                        <h2 className="text-md font-semibold text-gray-800">Datos del Docente</h2>
                                        <p className="text-xs text-gray-400 mt-0.5">Identificación y contacto para su registro.</p>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-xs font-medium text-gray-700 mb-1">Nombre(s) <span className="text-red-500">*</span></label>
                                            <input
                                                type="text"
                                                placeholder="Ej. Ana María"
                                                value={data.first_name}
                                                onChange={e => setData('first_name', e.target.value)}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm shadow-sm focus:outline-none focus:border-blue-500 placeholder-gray-300"
                                                required
                                            />
                                            {errors.first_name && <p className="text-red-500 text-xs mt-1">{errors.first_name}</p>}
                                            <p className="text-[11px] text-gray-400 mt-1">Captura los nombres como aparecen en su identificación.</p>
                                        </div>

                                        <div>
                                            <label className="block text-xs font-medium text-gray-700 mb-1">Apellidos <span className="text-red-500">*</span></label>
                                            <input
                                                type="text"
                                                placeholder="Ej. Pérez Gómez"
                                                value={data.last_name}
                                                onChange={e => setData('last_name', e.target.value)}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm shadow-sm focus:outline-none focus:border-blue-500 placeholder-gray-300"
                                                required
                                            />
                                            {errors.last_name && <p className="text-red-500 text-xs mt-1">{errors.last_name}</p>}
                                        </div>

                                        <div>
                                            <label className="block text-xs font-medium text-gray-700 mb-1">RFC</label>
                                            <input
                                                type="text"
                                                placeholder="ABCD9001011A1"
                                                value={data.rfc}
                                                onChange={e => setData('rfc', e.target.value.toUpperCase())}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm shadow-sm focus:outline-none focus:border-blue-500 placeholder-gray-300"
                                            />
                                            <p className="text-[11px] text-gray-400 mt-1">Se convertirá automáticamente a mayúsculas.</p>
                                        </div>

                                        <div>
                                            <label className="block text-xs font-medium text-gray-700 mb-1">CURP</label>
                                            <input
                                                type="text"
                                                placeholder="ABCD900101HDFRRN01"
                                                value={data.curp}
                                                onChange={e => setData('curp', e.target.value.toUpperCase())}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm shadow-sm focus:outline-none focus:border-blue-500 placeholder-gray-300"
                                            />
                                            <p className="text-[11px] text-gray-400 mt-1">Se convertirá automáticamente a mayúsculas.</p>
                                        </div>

                                        <div className="md:col-span-2">
                                            <label className="block text-xs font-medium text-gray-700 mb-1">Correo electrónico <span className="text-red-500">*</span></label>
                                            <input
                                                type="email"
                                                placeholder="docente@institucion.edu.mx"
                                                value={data.email}
                                                onChange={e => setData('email', e.target.value)}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm shadow-sm focus:outline-none focus:border-blue-500 placeholder-gray-300"
                                                required
                                            />
                                            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                                            <p className="text-[11px] text-gray-400 mt-1">Usado para comunicación y acceso al sistema.</p>
                                        </div>

                                        <div className="md:col-span-2">
                                            <label className="block text-xs font-medium text-gray-700 mb-1">Teléfono</label>
                                            <input
                                                type="tel"
                                                placeholder="10 dígitos"
                                                value={data.phone}
                                                onChange={e => setData('phone', e.target.value)}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm shadow-sm focus:outline-none focus:border-blue-500 placeholder-gray-300"
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* SECCIÓN 2: PERFIL ACADÉMICO Y AJUSTES */}
                                <div className="border-t border-gray-100 pt-6">
                                    <div className="mb-4">
                                        <h2 className="text-md font-semibold text-gray-800">Perfil Académico</h2>
                                        <p className="text-xs text-gray-400 mt-0.5">Configuración de niveles, categorías y estatus del docente.</p>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-xs font-medium text-gray-700 mb-1">Categoría</label>
                                            <select
                                                value={data.category}
                                                onChange={e => setData('category', e.target.value)}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm bg-white shadow-sm focus:outline-none focus:border-blue-500 text-gray-700"
                                            >
                                                <option value="A">Categoría A</option>
                                                <option value="B">Categoría B</option>
                                                <option value="C">Categoría C</option>
                                            </select>
                                        </div>

                                        <div>
                                            <label className="block text-xs font-medium text-gray-700 mb-1">Nivel MCER</label>
                                            <select
                                                value={data.mcer_level}
                                                onChange={e => setData('mcer_level', e.target.value)}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm bg-white shadow-sm focus:outline-none focus:border-blue-500 text-gray-700"
                                            >
                                                <option value="A1">A1</option>
                                                <option value="A2">A2</option>
                                                <option value="B1">B1</option>
                                                <option value="B2">B2</option>
                                                <option value="C1">C1</option>
                                                <option value="C2">C2</option>
                                            </select>
                                        </div>

                                        <div>
                                            <label className="block text-xs font-medium text-gray-700 mb-1">Modalidad</label>
                                            <select
                                                value={data.modality}
                                                onChange={e => setData('modality', e.target.value)}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm bg-white shadow-sm focus:outline-none focus:border-blue-500 text-gray-700"
                                            >
                                                <option value="Presencial">Presencial</option>
                                                <option value="Virtual">Virtual</option>
                                                <option value="Mixta">Mixta</option>
                                            </select>
                                        </div>

                                        <div>
                                            <label className="block text-xs font-medium text-gray-700 mb-1">Horas máximas</label>
                                            <input
                                                type="number"
                                                placeholder="Horas máximas"
                                                value={data.max_hours}
                                                onChange={e => setData('max_hours', e.target.value)}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm shadow-sm focus:outline-none focus:border-blue-500 placeholder-gray-300"
                                            /> 
                                        </div>

                                        <div>
                                            <label className="block text-xs font-medium text-gray-700 mb-1">Estado</label>
                                            <select
                                                value={data.status}
                                                onChange={e => setData('status', e.target.value)}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm bg-white shadow-sm focus:outline-none focus:border-blue-500 text-gray-700"
                                            >
                                                <option value="Activo">Activo</option>
                                                <option value="Inactivo">Inactivo</option>
                                            </select>
                                        </div>

                                        <div className="flex items-center pt-5">
                                            <label className="inline-flex items-center gap-2 cursor-pointer text-sm text-gray-700 select-none">
                                                <input
                                                    type="checkbox"
                                                    checked={data.is_native}
                                                    onChange={e => setData('is_native', e.target.checked)}
                                                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                                                />
                                                <span className="font-medium">Docente nativo</span>
                                            </label>
                                        </div>
                                    </div>
                                </div>

                                {/* Botonera del Formulario inferior */}
                                <div className="flex justify-end gap-3 border-t border-gray-100 pt-4 sticky bottom-0 bg-white pb-2">
                                    <button
                                        type="button"
                                        onClick={() => setIsModalOpen(false)}
                                        className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md text-sm font-medium hover:bg-gray-50 transition"
                                    >
                                        Cancelar
                                    </button>
                                    <Button 
                                        type="submit"
                                        disabled={processing}
                                        className="bg-[#0f2c59] hover:bg-[#0b2244] text-white px-5 py-2 rounded-md text-sm font-medium transition shadow-sm"
                                    >
                                        {processing ? 'Guardando...' : 'Guardar'}
                                    </Button>
                                </div>

                            </form>
                        </div>
                    </div>
                )}

            </div>
        </AppLayout>
    );
}