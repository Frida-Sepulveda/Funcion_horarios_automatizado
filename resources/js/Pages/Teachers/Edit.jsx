import { useForm } from '@inertiajs/react';

export default function Edit({ teacher }) {

    const { data, setData, put } = useForm({

        first_name: teacher.first_name,
        last_name: teacher.last_name,
        email: teacher.email,
        phone: teacher.phone,
        modalidad: teacher.modalidad,
        max_hours: teacher.max_hours,
        status: teacher.status
    });

    function submit(e) {

        e.preventDefault();

        put(`/teachers/${teacher.id}`);
    }

    return (

        <div className="p-6">

            <h1 className="text-2xl font-bold mb-4">
                Editar docente
            </h1>

            <form onSubmit={submit} className="space-y-4">

                <input
                    type="text"
                    value={data.first_name}
                    onChange={e => setData('first_name', e.target.value)}
                    className="border p-2 w-full"
                />

                <input
                    type="text"
                    value={data.last_name}
                    onChange={e => setData('last_name', e.target.value)}
                    className="border p-2 w-full"
                />

                <input
                    type="email"
                    value={data.email}
                    onChange={e => setData('email', e.target.value)}
                    className="border p-2 w-full"
                />

                <button
                    type="submit"
                    className="bg-blue-500 text-white px-4 py-2 rounded"
                >
                    Actualizar
                </button>

            </form>

        </div>
    );
}