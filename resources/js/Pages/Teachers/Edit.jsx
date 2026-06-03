import { useForm } from '@inertiajs/react';
import AppLayout from '@/Components/Layout/AppLayout';
import Button from "@/Components/UI/Button";

export default function Edit({ teacher }) {

    const { data, setData, put } = useForm({

        first_name: teacher.first_name,
        last_name: teacher.last_name,
        email: teacher.email,
        phone: teacher.phone,
        category: teacher.category, 
        mcer_level: teacher.mcer_level, 
        rfc: teacher.rfc, 
        curp: teacher.curp, 
        bank_clabe: teacher.bank_clabe, 
        ttc_hours: teacher.ttc_hours, 
        academic_degree: teacher.academic_degree, 
        is_native: teacher.is_native,
        modality: teacher.modality,
        max_hours: teacher.max_hours,
        status: teacher.status
    });

    function submit(e) {

        e.preventDefault();

        put(`/teachers/${teacher.id}`);
    }

    return (
        <AppLayout>
        <div className="p-6">
            
    
                <h1 className="text-2xl font-bold mb-4">
                    Docentes
                </h1>
    
            

            <h1 className="text-2xl font-bold mb-4">
                Editar docente
            </h1>

            <form onSubmit={submit} className="space-y-4">

                <input
                    type="text"
                    placeholder="Nombre"
                    value={data.first_name}
                    onChange={e => setData('first_name', e.target.value)}
                    className="border p-2 w-full"
                />

                <input
                    type="text"
                    placeholder="Apellido"
                    value={data.last_name}
                    onChange={e => setData('last_name', e.target.value)}
                    className="border p-2 w-full"
                />

                <input
                    type="email"
                    placeholder="Email"
                    value={data.email}
                    onChange={e => setData('email', e.target.value)}
                    className="border p-2 w-full"
                />

                <input
                    type="tel"
                    placeholder="Teléfono"
                    value={data.phone || ''}
                    onChange={e => setData('phone', e.target.value)}
                    className="border p-2 w-full"
                />

                <select
                    value={data.category}
                    onChange={e => setData('category', e.target.value)}
                    className="border p-2 w-full"
                >
                    <option value="A">Categoría A</option>
                    <option value="B">Categoría B</option>
                    <option value="C">Categoría C</option>
                </select>

                <select
                    value={data.mcer_level}
                    onChange={e => setData('mcer_level', e.target.value)}
                    className="border p-2 w-full"
                >
                    <option value="A1">A1</option>
                    <option value="A2">A2</option>
                    <option value="B1">B1</option>
                    <option value="B2">B2</option>
                    <option value="C1">C1</option>
                    <option value="C2">C2</option>
                </select>

                <label className="flex items-center gap-2">

                    <input
                        type="checkbox"
                        checked={data.is_native}
                        onChange={e => setData('is_native', e.target.checked)}
                    />

                    Docente nativo

                </label>

                <select
                    value={data.modality}
                    onChange={e => setData('modality', e.target.value)}
                    className="border p-2 w-full"
                >

                    <option value="Presencial">
                        Presencial
                    </option>

                    <option value="Virtual">
                        Virtual
                    </option>

                    <option value="Mixta">
                        Mixta
                    </option>

                </select>

                <input
                    type="number"
                    placeholder="Horas máximas"
                    value={data.max_hours}
                    onChange={e => setData('max_hours', e.target.value)}
                    className="border p-2 w-full"
                /> 

                <select
                    value={data.status}
                    onChange={e => setData('status', e.target.value)}
                    className="border p-2 w-full"
                >

                    <option value="Activo">
                        Activo
                    </option>

                    <option value="Inactivo">
                        Inactivo
                    </option>

                </select>

                <Button type="submit">
                    Actualizar
                </Button>

            </form>

        </div>
        </AppLayout>
    );
}