import { useForm } from '@inertiajs/react';

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

        <div className="p-6">

            <h1 className="text-2xl font-bold mb-4">
                Crear docente
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
                    value={data.phone}
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

                <button
                    type="submit"
                    className="bg-green-500 text-white px-4 py-2 rounded"
                >
                    Guardar
                </button>

            </form>

        </div>
    );
}