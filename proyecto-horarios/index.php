<!DOCTYPE html>
<html lang="es">

<head>
    <meta charset="UTF-8">

    <meta name="viewport"
          content="width=device-width, initial-scale=1.0">

    <title>Sistema de Horarios - TecNM</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>

    <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600;700&display=swap" rel="stylesheet">
    <link rel="stylesheet"
          type="text/css"
          href="./estilos.css">
    
</head>

<body>
<!-- NAVBAR -->
<?php include './navbar.php'; ?>

<!-- CONTENIDO -->
<div class="contenedor">

    <!-- TITULO -->
    <div class="titulo-pagina">

        <h2>Generación de Horarios</h2>

        <p>
            Panel administrativo del sistema
        </p>

    </div>

    <!-- GRID -->
    <div class="grid-paneles">

        <!-- CARD 1 -->
        <div class="card">

            <h3>Inscripciones</h3>

            <!--<p>
                Cargar datos académicos del periodo.
            </p> -->

            <button class="btn"
                    onclick="abrirModal('modalImportacion')">

                Importar

            </button>

        </div>

        <!-- CARD 2 -->
        <div class="card">

            <h3>Asignación de docentes</h3>

            <!--<p>
                Carga académica.
            </p>-->

            <button class="btn" onclick="mostrarDocentes('modalDocentes')">

                Ver asignaciones

            </button>

        </div>

        <!-- CARD 3 -->
        <div class="card">

            <h3>Horario final</h3>

            <!--<p>
                Confirmación y generación final de horarios.
            </p>-->

            <button class="btn" onclick="mostrarResumenFinal('modalHorarios')">

                Generar horarios

            </button>

        </div>

    </div>

    <!-- TABLA -->
    <div class="tabla-contenedor">

        <table id="tablaDocentes">

            <thead>

                <tr>
                    <th>Grupo</th>
                    <th>Subnivel</th>
                    <th>Modalidad</th>
                    <th>Horario</th>
                    <th>Docente</th>
                </tr>

            </thead>

            <tbody></tbody>

        </table>

    </div>

</div>

<!-- MODAL -->
<?php include './modales/modal_importacion.php'; ?>
<?php include './modales/modal_docentes.php'; ?>
<?php include './modales/modal_horarios.php'; ?>

<!-- JS -->
<script src="./script.js"></script>

</body>
</html>