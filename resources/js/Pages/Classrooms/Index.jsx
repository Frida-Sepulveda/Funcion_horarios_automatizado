import React from 'react';
import { Link, router } from '@inertiajs/react';

export default function Index({ classrooms = [] }) {

    function deleteClassroom(id) {
        if (!confirm('¿Eliminar esta aula?')) return;

        router.delete(`/classrooms/${id}`, {
            preserveScroll: true,
        });
    }

    return (
        <>
            {/* Contenedor principal con tus estilos CSS */}
            <div className="contenedor">
                <div className="card">
                        <h3>Gestión de Aulas</h3>
                        {/* Botón adaptado a tu estilo original 'btn' para abrir formulario */}
                        <Link href="/classrooms/create" className="btn" style={{ display: 'inline-block', textDecoration: 'none', textAlign: 'center' }}>
                            Nueva Aula
                        </Link>
                    </div>

                {/* Tabla adaptada con tus clases e IDs originales de estilos.css */}
                <div className="tabla-contenedor">
                    <table id="tablaDocentes">
                        <thead>
                            <tr>
                                <th>Nombre</th>
                                <th>Edificio</th>
                                <th>Capacidad</th>
                                <th>Tipo de Aula</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {classrooms.length > 0 ? (
                                classrooms.map((classroom) => (
                                    <tr key={classroom.id}>
                                        <td>{classroom.name}</td>
                                        <td>{classroom.building}</td>
                                        <td>{classroom.capacity}</td>
                                        <td>{classroom.type}</td>
                                        <td>
                                            <Link href={`/classrooms/${classroom.id}/edit`} style={{ marginRight: '10px', color: '#3b82f6', textDecoration: 'none', fontWeight: '500' }}>
                                                Editar
                                            </Link>
                                            
                                            <button 
                                                onClick={() => deleteClassroom(classroom.id)} 
                                                style={{ color: '#ef4444', background: 'none', border: 'none', cursor: 'pointer', fontWeight: '500', padding: 0 }}
                                            >
                                                Eliminar
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="5" style={{ textAlign: 'center' }}>No hay aulas registradas actualmente.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

            </div>
        </>
    );
}