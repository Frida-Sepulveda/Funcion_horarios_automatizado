import React from 'react';
import { useForm, Link } from '@inertiajs/react';

export default function Create() {
    const { data, setData, post, errors } = useForm({
        name: '',
        building: '',
        capacity: '',
        type: ''
    });

    function submit(e) {
        e.preventDefault();
        post('/classrooms');
    }

    return (
        <div>
            <h1>Crear Aula</h1>
            
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
                    <label>Edificio:</label>
                    <input 
                        type="text" 
                        value={data.building} 
                        onChange={e => setData('building', e.target.value)} 
                    />
                    {errors.building && <div>{errors.building}</div>}
                </div>

                <div>
                    <label>Capacidad:</label>
                    <input 
                        type="number" 
                        value={data.capacity} 
                        onChange={e => setData('capacity', e.target.value)} 
                    />
                    {errors.capacity && <div>{errors.capacity}</div>}
                </div>

                <div>
                    <label>Tipo de Aula:</label>
                    <select
                        value={data.type}
                        onChange={e => setData('type', e.target.value)}
                    >

                        <option value="Normal">
                            Normal
                        </option>

                        <option value="Magna">
                            Magna
                        </option>

                    </select>
                    {errors.type && <div>{errors.type}</div>}
                </div>

                <button type="submit">Guardar Aula</button>
                <Link href="/classrooms">Cancelar</Link>
            </form>
        </div>
    );
}