import React from 'react';
import AppLayout from "@/Components/Layout/AppLayout";
import Button from "@/Components/UI/Button";
import Table from "@/Components/UI/Table";

export default function Index({ students = [] }) {

    const exportarCSV = () => {

        if (students.length === 0) {
            alert("No hay datos para exportar");
            return;
        }

        const encabezados = [
            "No. Control",
            "Nombre Completo",
            "Correo",
            "Carrera",
            "Plan",
            "Semestre",
            "Nivel Inglés",
            "Estado"
        ];

        const filas = students.map(student => [

            student.control_number || 'N/A',

            `${student.first_name} ${student.last_name}`,

            student.email,

            student.career?.name || 'N/A',

            student.career?.study_plan || 'N/A',

            student.semester,

            student.level?.name || 'N/A',

            student.status
        ]);

        const contenidoCSV =
            "\uFEFF" +
            [
                encabezados.join(","),
                ...filas.map(e => e.join(","))
            ].join("\n");

        const blob = new Blob(
            [contenidoCSV],
            { type: 'text/csv;charset=utf-8;' }
        );

        const url = URL.createObjectURL(blob);

        const link = document.createElement("a");

        link.setAttribute("href", url);

        link.setAttribute(
            "download",
            "Alumnos_Elegibles.csv"
        );

        document.body.appendChild(link);

        link.click();

        document.body.removeChild(link);
    };

    return (
        <AppLayout>
        <div className="contenedor">

            <div className="titulo-pagina font-bold mb-4">

                <h2>
                    Alumnos Elegibles
                </h2>

                <p>
                    Gestión de alumnos disponibles para inscripción
                </p>

            </div>

            <div className="grid-paneles">

                <div className="card">

                    <h3>
                        Exportación
                    </h3>

                    <Button onClick={exportarCSV}>
                        Exportar CSV
                    </Button>

                </div>

            </div>

            <div className="tabla-contenedor">

                <Table headers={[
                    "No. Control",
                    "Nombre",
                    "Correo",
                    "Carrera",
                    "Plan",
                    "Semestre",
                    "Nivel",
                    "Estado"
                ]}>

                    {students.length > 0 ? (

                        students.map((student) => (

                            <tr key={student.id}>

                                <td className="px-4 py-3">
                                    {student.control_number || 'N/A'}
                                </td>

                                <td className="px-4 py-3">
                                    {student.first_name} {student.last_name}
                                </td>

                                <td className="px-4 py-3">
                                    {student.email}
                                </td>

                                <td className="px-4 py-3">
                                    {student.career?.name || 'N/A'}
                                </td>

                                <td className="px-4 py-3">
                                    {student.career?.study_plan || 'N/A'}
                                </td>

                                <td className="px-4 py-3">
                                    {student.semester}
                                </td>

                                <td className="px-4 py-3">
                                    {student.level?.name || 'N/A'}
                                </td>

                                <td className="px-4 py-3">

                                    {student.status === 'Elegible' ? (

                                        <span className="text-green-600 font-semibold">
                                            Elegible
                                        </span>

                                    ) : (

                                        <span className="text-red-600 font-semibold">
                                            No elegible
                                        </span>

                                    )}

                                </td>

                            </tr>

                        ))

                    ) : (

                        <tr>

                            <td
                                colSpan="8"
                                className="text-center py-4"
                            >
                                No hay alumnos elegibles.
                            </td>

                        </tr>

                    )}

                </Table>

            </div>

        </div>
        </AppLayout>
    );
}        