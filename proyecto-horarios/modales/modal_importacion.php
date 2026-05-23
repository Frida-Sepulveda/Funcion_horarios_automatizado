<div class="modal"
     id="modalImportacion">

    <div class="modal-contenido">

        <!-- HEADER -->

        <div class="modal-header">

            <h2>
                Importar inscripciones
            </h2>

            <span class="cerrar"
                  onclick="cerrarModal('modalImportacion')">

                &times;

            </span>

        </div>


        <!-- TABS -->

        <div class="tabs">

            <button class="tab-btn active"
                    onclick="mostrarTab('tabImportacion', this)">

                Importación

            </button>


            <button class="tab-btn"
                    onclick="mostrarTab('tabValidacion', this)">

                Validación

            </button>


            <button class="tab-btn"
                    onclick="mostrarTab('tabGrupos', this)">

                Grupos generados

            </button>

        </div>


        <!-- CONTENIDO TAB 1 -->

        <div class="tab-contenido"
             id="tabImportacion">

            <h3>
                Carga de datos
            </h3>

            <br>

            <button class="btn"
                    onclick="importarDatos()">

                Importar datos

            </button>

            <br><br>

            <div id="infoImportacion"></div>

        </div>


        <!-- CONTENIDO TAB 2 -->

        <div class="tab-contenido oculto"
             id="tabValidacion">

            <h3>
                Resultado de validación
            </h3>

            <br>

            <div id="validacion"></div>

        </div>


        <!-- CONTENIDO TAB 3 -->

        <div class="tab-contenido oculto"
             id="tabGrupos">

            <h3>
                Grupos generados
            </h3>

            <br>

            <div id="grupos"></div>

        </div>

    </div>

</div>