import React from 'react';

export default function Index({ students = [] }) {

    // Diccionario para transformar el id del nivel a texto legible
    const niveles = {
        1: 'Básico 1', 2: 'Básico 2', 3: 'Básico 3', 4: 'Básico 4', 5: 'Básico 5',
        6: 'Intermedio 1', 7: 'Intermedio 2', 8: 'Intermedio 3', 9: 'Intermedio 4', 10: 'Intermedio 5'
    };

    // Función nativa para exportar la tabla a CSV (Excel)
    const exportarCSV = () => {
        if (students.length === 0) {
            alert("No hay datos para exportar");
            return;
        }

        const encabezados = ["No. Control", "Nombre Completo", "Genero", "Carrera", "Plan", "Semestre", "Nivel", "Tipo", "Estado"];
        
        const filas = students.map(student => [
            student.no_control || 'N/A',
            `${student.nombres} ${student.apellidos}`,
            student.genero,
            student.career?.nombre || 'N/A',
            student.career?.plan_estudios || 'N/A',
            student.semestre,
            niveles[student.nivel_id] || student.nivel_id,
            student.tipo_estudiante,
            student.estado
        ]);

        // Unimos el contenido usando codificación UTF-8 para conservar acentos
        const contenidoCSV = "\uFEFF" + [encabezados.join(","), ...filas.map(e => e.join(","))].join("\n");
        
        const blob = new Blob([contenidoCSV], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.setAttribute("href", url);
        link.setAttribute("download", "Alumnos_Elegibles_Inscripcion.csv");
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <div className="contenedor">
            <div className="titulo-pagina">
                <h2>Alumnos Elegibles para Inscripción</h2>
                <p>Lista de control y exportación para el administrador</p>
            </div>

            <div className="grid-paneles">
                <div className="card">
                    <h3>Acciones disponibles</h3>
                    {/* Botón de exportar adaptado a tus estilos.css */}
                    <button className="btn" onClick={exportarCSV} style={{ marginTop: '10px' }}>
                        📥 Exportar a Excel (.CSV)
                    </button>
                </div>
            </div>

            <div className="tabla-contenedor">
                <table id="tablaDocentes">
                    <thead>
                        <tr>
                            <th>No. Control</th>
                            <th>Nombre Alumno</th>
                            <th>Género</th>
                            <th>Carrera / Plan</th>
                            <th>Semestre</th>
                            <th>Nivel Inglés</th>
                            <th>Tipo</th>
                            <th>Estado</th>
                        </tr>
                    </thead>
                    <tbody>
                        {students.length > 0 ? (
                            students.map((student) => (
                                <tr key={student.id}>
                                    <td>{student.no_control || <em style={{color: '#999'}}>Externo/Egresado</em>}</td>
                                    <td>{student.nombres} {student.apellidos}</td>
                                    <td style={{ textAlign: 'center' }}>{student.genero}</td>
                                    <td>{student.career?.nombre} <br /> <small style={{ color: '#666' }}>{student.career?.plan_estudios}</small></td>
                                    <td style={{ textAlign: 'center' }}>{student.semestre}°</td>
                                    <td>{niveles[student.nivel_id] || `Nivel ${student.nivel_id}`}</td>
                                    <td>{student.tipo_estudiante}</td>
                                    <td>
                                        <span style={{ backgroundColor: '#d1fae5', color: '#065f46', padding: '4px 8px', borderRadius: '4px', fontSize: '12px', fontWeight: '600' }}>
                                            {student.estado}
                                        </span>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="8" style={{ textAlign: 'center' }}>No se encontraron alumnos con el estado "Elegible para Inscripción".</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}