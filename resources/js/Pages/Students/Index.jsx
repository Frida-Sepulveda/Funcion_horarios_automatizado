import React from 'react';

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

        <div className="contenedor">

            <div className="titulo-pagina">

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

                    <button
                        className="btn"
                        onClick={exportarCSV}
                    >
                        Exportar CSV
                    </button>

                </div>

            </div>

            <div className="tabla-contenedor">

                <table id="tablaDocentes">

                    <thead>

                        <tr>

                            <th>No. Control</th>
                            <th>Nombre</th>
                            <th>Correo</th>
                            <th>Carrera</th>
                            <th>Plan</th>
                            <th>Semestre</th>
                            <th>Nivel</th>
                            <th>Estado</th>

                        </tr>

                    </thead>

                    <tbody>

                        {students.length > 0 ? (

                            students.map((student) => (

                                <tr key={student.id}>

                                    <td>
                                        {student.control_number || 'N/A'}
                                    </td>

                                    <td>
                                        {student.first_name} {student.last_name}
                                    </td>

                                    <td>
                                        {student.email}
                                    </td>

                                    <td>
                                        {student.career?.name || 'N/A'}
                                    </td>

                                    <td>
                                        {student.career?.study_plan || 'N/A'}
                                    </td>

                                    <td>
                                        {student.semester}
                                    </td>

                                    <td>
                                        {student.level?.name || 'N/A'}
                                    </td>

                                    <td>

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
                                    style={{ textAlign: 'center' }}
                                >
                                    No hay alumnos elegibles.
                                </td>

                            </tr>

                        )}

                    </tbody>

                </table>

            </div>

        </div>
    );
}