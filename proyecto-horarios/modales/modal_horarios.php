<div class="modal"
     id="modalHorarios">

    <div class="modal-contenido modal-grande">

        <!-- HEADER -->

        <div class="modal-header">

            <h2>
                Generación final de horarios
            </h2>

            <span class="cerrar"
                  onclick="cerrarModal('modalHorarios')">

                &times;

            </span>

        </div>


        <!-- CONTENIDO -->

        <div class="tab-contenido">

            <!-- RESUMEN -->

            <div class="estadisticas-grid">

                <div class="estadistica-card">

                    <h3 id="totalAlumnos">
                        0
                    </h3>

                    <p>
                        Alumnos procesados
                    </p>

                </div>


                <div class="estadistica-card">

                    <h3 id="totalGrupos">
                        0
                    </h3>

                    <p>
                        Grupos abiertos
                    </p>

                </div>


                <div class="estadistica-card">

                    <h3 id="totalDocentes">
                        0
                    </h3>

                    <p>
                        Docentes asignados
                    </p>

                </div>


                <div class="estadistica-card">

                    <h3 id="totalAulas">
                        0
                    </h3>

                    <p>
                        Aulas utilizadas
                    </p>

                </div>

            </div>


            <!-- ESTADO -->

            <div class="estado-final">

                ✓ Proceso completado correctamente

            </div>


            <!-- TABLA -->

            <div class="tabla-contenedor">

                <table id="tablaFinal">

                    <thead>

                        <tr>

                            <th>Grupo</th>
                            <th>Subnivel</th>
                            <th>Horario</th>
                            <th>Aula</th>
                            <th>Docente</th>

                        </tr>

                    </thead>

                    <tbody></tbody>

                </table>

            </div>


            <!-- BOTONES -->

            <div class="acciones-finales">

                <button class="btn">

                    Confirmar horarios

                </button>


                <button class="btn btn-secundario">

                    Descargar PDF

                </button>


                <button class="btn btn-secundario">

                    Exportar Excel

                </button>

            </div>

        </div>

    </div>

</div>