import React from 'react';
import { useForm, Link } from '@inertiajs/react';
import AppLayout from '@/Components/Layout/AppLayout';
import Button from "@/Components/UI/Button";

export default function Edit({ classroom }) {

    const { data, setData, put, errors } = useForm({
        name: classroom.name || '',
        building: classroom.building || '',
        max_capacity: classroom.max_capacity || '',
        type: classroom.type || '',
        platform: classroom.platform || '',
        status: classroom.status || ''
    });

    function submit(e) {
        e.preventDefault();
        put(`/classrooms/${classroom.id}`);
    }

    return (
        <AppLayout>
        <div>
                <h1 className="text-2xl font-bold mb-4">
                    Aulas
                </h1>
            
            <h1>Editar Aula</h1>
            
            <form onSubmit={submit}>
                <div>
                    <label>Nombre:</label>
                    <input 
                        type="text" 
                        value={data.name} 
                        onChange={e => setData('name', e.target.value)} 
                    />
                    {errors.name && <div>{errors.name}</div>}
                </div>

                <div>
                    <label>Capacidad:</label>
                    <input 
                        type="number" 
                        value={data.max_capacity} 
                        onChange={e => setData('max_capacity', e.target.value)} 
                    />
                    {errors.max_capacity && <div>{errors.max_capacity}</div>}
                </div>

                <div>
                    <label>Tipo de Aula:</label>
                    <select
                        value={data.type}
                        onChange={e => setData('type', e.target.value)}
                    >
                        <option value="">Seleccione</option>

                        <option value="Presencial">
                            Presencial
                        </option>

                        <option value="Virtual">
                            Virtual
                        </option>
                    </select>

                    {data.type === 'Presencial' && (

                        <div>
                            <label>Edificio:</label>

                            <input
                                type="text"
                                value={data.building}
                                onChange={e => setData('building', e.target.value)}
                            />

                            {errors.building && <div>{errors.building}</div>}
                        </div>
                    )}

                    {data.type === 'Virtual' && (

                        <div>
                            <label>Plataforma:</label>

                            <select
                                value={data.platform}
                                onChange={e => setData('platform', e.target.value)}
                            >
                                <option value="">Seleccione</option>

                                <option value="Teams">Microsoft Teams</option>

                                <option value="Google Meet">Google Meet</option>

                                <option value="Zoom">Zoom</option>
                            </select>

                            {errors.platform && <div>{errors.platform}</div>}
                        </div>
                    )}
                </div>

                <div>
                    <label>Estado:</label>
                    <select
                        value={data.status}
                        onChange={e => setData('status', e.target.value)}
                    >

                        <option value="Disponible">
                            Disponible
                        </option>

                        <option value="Mantenimiento">
                            Mantenimiento
                        </option>

                        <option value="Inactiva">
                            Inactiva
                        </option>

                    </select>
                    {errors.status && <div>{errors.status}</div>}
                </div>

                <Button type="submit">
                    Actualizar Aula
                </Button>
                <Link href="/classrooms" className="btn">
                    Cancelar
                </Link>
            </form>
        </div>
        </AppLayout>
    );
}