import { useForm } from '@inertiajs/react';
import AppLayout from '@/Components/Layout/AppLayout';
import Button from "@/Components/UI/Button";

export default function Create() {

    const { data, setData, post } = useForm({
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
        post('/teachers');
    }

    return (
        <AppLayout>
        <div className="p-6 max-w-4xl mx-auto">
            
            {/* Encabezado Principal */}
            <div className="mb-6 border-b border-gray-100 pb-4">
                <h1 className="text-2xl font-bold text-slate-800">
                    Añadir maestro
                </h1>
            </div>

            <form onSubmit={submit} className="bg-white rounded-lg border border-gray-200 shadow-sm p-6 space-y-8">
                
                {/* SECCIÓN 1: DATOS DEL DOCENTE */}
                <div>
                    <div className="mb-4">
                        <h2 className="text-md font-semibold text-gray-800">Datos del Docente</h2>
                        <p className="text-xs text-gray-400 mt-0.5">Identificación y contacto para su registro.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-xs font-medium text-gray-700 mb-1">Nombre(s)</label>
                            <input
                                type="text"
                                placeholder="Ej. Ana María"
                                value={data.first_name}
                                onChange={e => setData('first_name', e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm shadow-sm focus:outline-none focus:border-blue-500 placeholder-gray-300"
                            />
                            <p className="text-[11px] text-gray-400 mt-1">Captura los nombres como aparecen en su identificación.</p>
                        </div>

                        <div>
                            <label className="block text-xs font-medium text-gray-700 mb-1">Apellidos</label>
                            <input
                                type="text"
                                placeholder="Ej. Pérez Gómez"
                                value={data.last_name}
                                onChange={e => setData('last_name', e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm shadow-sm focus:outline-none focus:border-blue-500 placeholder-gray-300"
                            />
                        </div>

                        <div>
                            <label className="block text-xs font-medium text-gray-700 mb-1">RFC</label>
                            <input
                                type="text"
                                placeholder="ABCD9001011A1"
                                value={data.rfc}
                                onChange={e => setData('rfc', e.target.value)}
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
                                onChange={e => setData('curp', e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm shadow-sm focus:outline-none focus:border-blue-500 placeholder-gray-300"
                            />
                            <p className="text-[11px] text-gray-400 mt-1">Se convertirá automáticamente a mayúsculas.</p>
                        </div>

                        <div className="md:col-span-2">
                            <label className="block text-xs font-medium text-gray-700 mb-1">Correo electrónico</label>
                            <input
                                type="email"
                                placeholder="docente@institucion.edu.mx"
                                value={data.email}
                                onChange={e => setData('email', e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm shadow-sm focus:outline-none focus:border-blue-500 placeholder-gray-300"
                            />
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

                {/* Botón de Envió */}
                <div className="flex justify-end border-t border-gray-100 pt-4">
                    <Button type="submit" className="bg-[#0f2c59] hover:bg-[#0b2244] text-white px-5 py-2 rounded-md text-sm font-medium transition shadow-sm">
                        Guardar
                    </Button>
                </div>

            </form>

        </div>
        </AppLayout>
    );
}