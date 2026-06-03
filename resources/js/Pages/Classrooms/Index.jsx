import React from 'react';
import { Link, router } from '@inertiajs/react';

import AppLayout from '@/Components/Layout/AppLayout';
import Button from "@/Components/UI/Button";
import Table from "@/Components/UI/Table";

export default function Index({ classrooms = [] }) {

    function deleteClassroom(id) {

        if (!confirm('¿Eliminar esta aula?')) return;

        router.delete(`/classrooms/${id}`, {
            preserveScroll: true,
        });
    }

    return (

        <AppLayout>

            <div className="contenedor">

                {/* TITULO */}

                <div className="titulo-pagina">

                    <h2>
                        Aulas
                    </h2>

                    <p>
                        Gestión de aulas registradas
                    </p>

                </div>

                {/* BOTON */}

                <div className="grid-paneles">

                    <div className="card">

                        <Link href="/classrooms/create">

                            <Button>
                                Nueva Aula
                            </Button>

                        </Link>

                    </div>

                </div>

                {/* TABLA */}

                <div className="tabla-contenedor">

                    <Table
                        headers={[
                            "Nombre",
                            "Edificio",
                            "Capacidad",
                            "Tipo",
                            "Plataforma",
                            "Estado",
                            "Acciones"
                        ]}
                    >

                        {classrooms.length > 0 ? (

                            classrooms.map((classroom) => (

                                <tr key={classroom.id}>

                                    <td className="px-4 py-3">
                                        {classroom.name}
                                    </td>

                                    <td className="px-4 py-3">

                                        {classroom.type === 'Presencial'
                                            ? classroom.building
                                            : '—'}

                                    </td>

                                    <td className="px-4 py-3">
                                        {classroom.max_capacity}
                                    </td>

                                    <td className="px-4 py-3">
                                        {classroom.type}
                                    </td>

                                    <td className="px-4 py-3">

                                        {classroom.type === 'Virtual'
                                            ? classroom.platform
                                            : '—'}

                                    </td>

                                    <td className="px-4 py-3">
                                        {classroom.status}
                                    </td>

                                    <td className="px-4 py-3 flex gap-3">

                                        <Link
                                            href={`/classrooms/${classroom.id}/edit`}
                                            className="
                                                text-blue-600
                                                hover:underline
                                                font-medium
                                            "
                                        >
                                            Editar
                                        </Link>

                                        <button
                                            onClick={() => deleteClassroom(classroom.id)}
                                            className="
                                                text-red-600
                                                hover:underline
                                                font-medium
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
                                    colSpan="7"
                                    className="text-center py-4"
                                >
                                    No hay aulas registradas actualmente.
                                </td>

                            </tr>

                        )}

                    </Table>

                </div>

            </div>

        </AppLayout>
    );
}