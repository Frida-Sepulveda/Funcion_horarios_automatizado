import { useForm } from '@inertiajs/react';

export default function Create() {

    const { data, setData, post } = useForm({

        first_name: '',
        last_name: '',
        email: '',
        phone: '',
        modalidad: 'Presencial',
        max_hours: 20,
        status: 'activo'
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
                    value={data.modalidad}
                    onChange={e => setData('modalidad', e.target.value)}
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

                    <option value="activo">
                        Activo
                    </option>

                    <option value="inactivo">
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