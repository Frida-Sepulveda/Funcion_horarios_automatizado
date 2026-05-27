import { Link, router } from '@inertiajs/react';

export default function Index({ teachers }) {
    function deleteTeacher(id) {

    if (confirm('¿Eliminar docente?')) {

        router.delete(`/teachers/${id}`);
    }
    }

    return (
        <div className="p-6">

            <h1 className="text-2xl font-bold mb-4">
                Docentes
            </h1>

            <Link
                href="/teachers/create"
                className="bg-blue-500 text-white px-4 py-2 rounded"
            >
                Nuevo docente
            </Link>

            <table className="w-full mt-6 border">

                <thead>
                    <tr className="bg-gray-200">
                        <th className="p-2">Nombre</th>
                        <th className="p-2">Email</th>
                        <th className="p-2">Modalidad</th>
                        <th className="p-2">Estado</th>
                        <th className="p-2">Acciones</th>
                    </tr>
                </thead>

                <tbody>

                    {teachers.map((teacher) => (

                        <tr key={teacher.id}>

                            <td className="border p-2">
                                {teacher.first_name} {teacher.last_name}
                            </td>

                            <td className="border p-2">
                                {teacher.email}
                            </td>

                            <td className="border p-2">
                                {teacher.modalidad}
                            </td>

                            <td className="border p-2">
                                {teacher.status === 'Activo' ? (
                                    <span className="text-green-500">Activo</span>
                                ) : (
                                    <span className="text-red-500">Inactivo</span>
                                )}
                            </td>

                            <td className="border p-2">

                                <Link
                                    href={`/teachers/${teacher.id}/edit`}
                                    className="text-blue-500 mr-4"
                                >
                                    Editar
                                </Link>

                                <button
                                    onClick={() => deleteTeacher(teacher.id)}
                                    className="text-red-500"
                                >
                                    Eliminar
                                </button>

                            </td>

                        </tr>

                    ))}

                </tbody>

            </table>

        </div>
    );
}