<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">

    <style>

        body {
            font-family: Arial, sans-serif;
            font-size: 12px;
        }

        h1 {
            text-align: center;
            color: #1F3A5F;
            margin-bottom: 20px;
        }

        table {
            width: 100%;
            border-collapse: collapse;
        }

        th {
            background: #1F3A5F;
            color: white;
            padding: 8px;
            border: 1px solid #ccc;
        }

        td {
            padding: 8px;
            border: 1px solid #ccc;
            text-align: center;
        }

    </style>

</head>

<body>

    <h1>
        Horarios Finales
    </h1>

    <table>

        <thead>

            <tr>

                <th>Grupo</th>

                <th>Nivel</th>

                <th>Modalidad</th>

                <th>Horario</th>

                <th>Aula</th>

                <th>Docente</th>

                <th>Estado</th>

            </tr>

        </thead>

        <tbody>

            @foreach($groups as $group)

                <tr>

                    <td>
                        {{ $group->group_key }}
                    </td>

                    <td>
                        {{ $group->level->name ?? 'N/A' }}
                    </td>

                    <td>
                        {{ $group->modality }}
                    </td>

                    <td>

                        @foreach($group->schedules as $schedule)

                            {{ $schedule->scheduleBlock->day }}

                            {{ substr($schedule->scheduleBlock->start_time,0,5) }}

                            -

                            {{ substr($schedule->scheduleBlock->end_time,0,5) }}

                            <br>

                        @endforeach

                    </td>

                    <td>
                        {{ $group->classroom->name ?? 'Sin aula' }}
                    </td>

                    <td>

                        @if($group->teacher)

                            {{ $group->teacher->first_name }}
                            {{ $group->teacher->last_name }}

                        @else

                            Sin docente

                        @endif

                    </td>

                    <td>
                        {{ $group->status }}
                    </td>

                </tr>

            @endforeach

        </tbody>

    </table>

</body>
</html>