import { Link, router } from '@inertiajs/react';
import AppLayout from '@/Components/Layout/AppLayout';
import Button from "@/Components/UI/Button";
import Table from "@/Components/UI/Table";

export default function Index({ teachers }) {
    function deleteTeacher(id) {

    if (confirm('¿Eliminar docente?')) {

        router.delete(`/teachers/${id}`);
    }
    }

    return (
        <AppLayout>
        <div className="contenedor">
            <div className="titulo-pagina">
                <h2>
                    Docentes
                </h2>
                <p>
                    Gestión de docentes registrados
                </p>
            </div>

                <div className="grid-paneles">

                    <div className="card">

                        <Link href="/teachers/create">

                            <Button>
                                Nuevo Docente
                            </Button>

                        </Link>

                    </div>

                </div>

            <div className="tabla-contenedor">
            <Table headers={[
                "Nombre",
                "Email",
                "Categoría",
                "MCER",
                "Modalidad",
                "Estado",
                "Acciones"
            ]}>

                {teachers.length > 0 ? (

                teachers.map((teacher) => (

                    <tr key={teacher.id} className="hover:bg-gray-50">

                        <td className="border p-2">
                            {teacher.first_name} {teacher.last_name}
                        </td>

                        <td className="border p-2">
                            {teacher.email}
                        </td>
                        <td className="border p-2">
                            {teacher.category}
                        </td>
                        <td className="border p-2">
                            {teacher.mcer_level}
                        </td>
                        <td className="border p-2">
                            {teacher.modality}
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
                                className="
                                    text-red-500
                                    hover:underline
                                "
                            >
                                Eliminar
                            </button>

                        </td>

                    </tr>
                ))
            ) : (

                    <tr>
                        <td
                            colSpan="8"
                            className="text-center py-4"
                        >
                            No hay docentes registrados.
                        </td>
                    </tr>

                )}

            </Table>
            </div>

        </div>
        </AppLayout>
    );
}
