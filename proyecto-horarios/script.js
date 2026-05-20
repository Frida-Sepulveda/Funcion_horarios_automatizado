// =========================
// MODALES
// =========================

function abrirModal(id){

    document.getElementById(id)
        .style.display = 'flex';
}

function cerrarModal(id){

    document.getElementById(id)
        .style.display = 'none';
}


// =========================
// TABS
// =========================

function mostrarTab(tabID, boton){

    let tabs = document.querySelectorAll('.tab-contenido');

    tabs.forEach(tab=>{
        tab.classList.add('oculto');
    });

    document.getElementById(tabID)
        .classList.remove('oculto');


    let botones = document.querySelectorAll('.tab-btn');

    botones.forEach(btn=>{
        btn.classList.remove('active');
    });

    boton.classList.add('active');
}


// =========================
// MENU RESPONSIVE
// =========================

function toggleMenu(){

    let menu = document.querySelector('.menu');

    if(menu.style.display === 'flex'){

        menu.style.display = 'none';

    }else{

        menu.style.display = 'flex';
        menu.style.flexDirection = 'column';
    }
}



// ====================================================
// DATOS DEL SISTEMA
// ====================================================

let alumnos = [];

let grupos = [];

let asignaciones = [];


// DOCENTES

const docentes = [

    {
        nombre:"Ana Martínez",
        correo:"ana.martinez@itl.edu.mx",
        modalidad:"Ambos",
        carga:0,
        horarios:[]
    },

    {
        nombre:"Pedro López",
        correo:"pedro.lopez@itl.edu.mx",
        modalidad:"Presencial",
        carga:0,
        horarios:[]
    },

    {
        nombre:"Lucía Hernández",
        correo:"lucia.hernandez@itl.edu.mx",
        modalidad:"En línea",
        carga:0,
        horarios:[]
    },

    {
        nombre:"Carlos Ramírez",
        correo:"carlos.ramirez@itl.edu.mx",
        modalidad:"Ambos",
        carga:0,
        horarios:[]
    }

];


// AULAS

const aulas = [

    {
        id:"A1",
        horarios:[]
    },

    {
        id:"A2",
        horarios:[]
    }

];


// BLOQUES

const bloquesManana = [

    "07:00-08:30",
    "08:30-10:00",
    "10:00-11:30",
    "11:30-13:00"

];


const bloquesTarde = [

    "14:00-15:30",
    "15:30-17:00",
    "17:00-18:30",
    "18:30-20:00"

];


// ====================================================
// IMPORTAR DATOS
// ====================================================

function importarDatos(){

    alumnos = [];

    grupos = [];

    asignaciones = [];


    // SIMULACION

    for(let i=0;i<35;i++){

        alumnos.push({

            subnivel:"A1",
            modalidad:"Presencial",
            tipo:"LM",
            turno:i%2==0 ? "Mañana":"Tarde"

        });

    }


    for(let i=0;i<20;i++){

        alumnos.push({

            subnivel:"B1",
            modalidad:"En línea",
            tipo:"MJ",
            turno:"Tarde"

        });

    }


    // MENSAJE

    document.getElementById('infoImportacion')
        .innerHTML = `
        
        <p>
            ${alumnos.length} inscripciones importadas correctamente.
        </p>

    `;


    generarGrupos();

    mostrarGrupos();

}


// ====================================================
// GENERAR GRUPOS
// ====================================================

function generarGrupos(){

    let mapa = {};

    alumnos.forEach(a=>{

        let clave = `
            ${a.subnivel}
            -
            ${a.modalidad}
            -
            ${a.tipo}
            -
            ${a.turno}
        `;

        if(!mapa[clave]){

            mapa[clave] = [];

        }

        mapa[clave].push(a);

    });


    mostrarValidacion(mapa);


    grupos = [];


    for(let clave in mapa){

        let lista = mapa[clave];

        if(lista.length >= 15){

            let num = Math.floor(lista.length / 15);

            for(let i=0;i<num;i++){

                let partes = clave.split("-");

                grupos.push({

                    id:"G" + (grupos.length+1),

                    subnivel:partes[0].trim(),

                    modalidad:partes[1].trim(),

                    tipo:partes[2].trim(),

                    turno:partes[3].trim()

                });

            }

        }

    }


    asignarHorarios();

}



// ====================================================
// VALIDACION
// ====================================================

function mostrarValidacion(mapa){

    let html = '';

    for(let clave in mapa){

        let cantidad = mapa[clave].length;

        let partes = clave.split("-");

        let subnivel = partes[0];

        let modalidad = partes[1];

        let tipo = partes[2];

        let turno = partes[3];


        if(cantidad >= 15){

            html += `

            <div class="resultado aprobado">

                ${subnivel}
                (${turno})

                → ${cantidad} alumnos

                ✓ Grupo válido

            </div>

            `;

        }else{

            html += `

            <div class="resultado rechazado">

                ${subnivel}
                (${turno})

                → ${cantidad} alumnos

                ✗ No se abre grupo

            </div>

            `;
        }

    }

    document.getElementById('validacion')
        .innerHTML = html;

}



// ====================================================
// MOSTRAR GRUPOS
// ====================================================

function mostrarGrupos(){

    let html = '';

    grupos.forEach(g=>{

        html += `

        <div class="grupo-card">

            <strong>${g.id}</strong>

            <br>

            ${g.subnivel}

            -
            ${g.modalidad}

            -
            ${g.turno}

        </div>

        `;

    });


    document.getElementById('grupos')
        .innerHTML = html;

}



// ====================================================
// ASIGNACION DE HORARIOS
// ====================================================

function asignarHorarios(){

    grupos.forEach(g=>{

        let bloque = obtenerBloque(g);

        let aula = null;


        if(g.modalidad === 'Presencial'){

            aula = asignarAula(bloque);

        }


        let docente = asignarDocente(

            bloque,
            g.modalidad

        );


        asignaciones.push({

            ...g,

            bloque,

            aula:aula ? aula.id : 'Virtual',

            docente:docente.nombre,
            correo:docente.correo

        });

    });


    mostrarResultado();

}



// ====================================================
// OBTENER BLOQUE
// ====================================================

function obtenerBloque(grupo){

    let bloques;


    if(grupo.turno === 'Mañana'){

        bloques = bloquesManana;

    }else{

        bloques = bloquesTarde;

    }


    return bloques[

        Math.floor(
            Math.random() * bloques.length
        )

    ];

}



// ====================================================
// ASIGNAR AULA
// ====================================================

function asignarAula(bloque){

    for(let aula of aulas){

        if(!aula.horarios.includes(bloque)){

            aula.horarios.push(bloque);

            return aula;

        }

    }

    return null;

}



// ====================================================
// ASIGNAR DOCENTE
// ====================================================

function asignarDocente(bloque, modalidad){

    let candidatos = docentes.filter(d=>{

        return (

            d.modalidad === 'Ambos'

            ||

            d.modalidad === modalidad

        )

        &&

        !d.horarios.includes(bloque);

    });


    candidatos.sort(

        (a,b)=>a.carga - b.carga

    );


    let elegido = candidatos[0];


    elegido.carga++;

    elegido.horarios.push(bloque);


    return elegido;

}



// ====================================================
// MOSTRAR RESULTADO
// ====================================================

function mostrarResultado(){

    let tbody = document.querySelector(
        '#tablaDocentes tbody'
    );


    tbody.innerHTML = '';


    asignaciones.forEach(a=>{

        tbody.innerHTML += `

        <tr>

            <td>${a.id}</td>

            <td>${a.subnivel}</td>

            <td>${a.modalidad}</td>

            <td>${a.bloque}</td>

            <td>${a.docente}</td>

        </tr>

        `;

    });

}

function mostrarDocentes(){

    let tbody = document.querySelector(
        '#tablaAsignaciones tbody'
    );

    tbody.innerHTML = '';



    if(asignaciones.length === 0){

        tbody.innerHTML = `

        <tr>

            <td colspan="5">

                No hay asignaciones generadas.

            </td>

        </tr>

        `;

    }else{

        asignaciones.forEach(a=>{

            tbody.innerHTML += `

            <tr>

                <td>${a.docente}</td>

                <td>${a.id}</td>

                <td>${a.modalidad}</td>

                <td>${a.correo}</td>

                <td>

                    <span class="estado-asignado">

                        Asignado

                    </span>

                </td>

            </tr>

            `;

        });

    }


    abrirModal('modalDocentes');

}

function mostrarResumenFinal(){

    // ESTADISTICAS

    document.getElementById('totalAlumnos')
        .innerText = alumnos.length;


    document.getElementById('totalGrupos')
        .innerText = grupos.length;


    document.getElementById('totalDocentes')
        .innerText = asignaciones.length;


    // AULAS UTILIZADAS

    let aulasUsadas = new Set();

    asignaciones.forEach(a=>{

        if(a.aula !== 'Virtual'){

            aulasUsadas.add(a.aula);

        }

    });

    document.getElementById('totalAulas')
        .innerText = aulasUsadas.size;



    // TABLA FINAL

    let tbody = document.querySelector(
        '#tablaFinal tbody'
    );

    tbody.innerHTML = '';



    if(asignaciones.length === 0){

        tbody.innerHTML = `

        <tr>

            <td colspan="5">

                No existen horarios generados.

            </td>

        </tr>

        `;

    }else{

        asignaciones.forEach(a=>{

            tbody.innerHTML += `

            <tr>

                <td>${a.id}</td>

                <td>${a.subnivel}</td>

                <td>${a.bloque}</td>

                <td>${a.aula}</td>

                <td>${a.docente}</td>

            </tr>

            `;

        });

    }


    abrirModal('modalHorarios');

}