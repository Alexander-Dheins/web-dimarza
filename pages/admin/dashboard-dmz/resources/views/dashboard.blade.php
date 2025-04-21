<!-- resources/views/dashboard.blade.php -->
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Dashboard</title>
    <link href="{{ mix('css/app.css') }}" rel="stylesheet">
    <script src="{{ mix('js/app.js') }}" defer></script>
</head>
<body>
    <div class="min-h-screen flex">
        <!-- Menú desplegable -->
        <div class="bg-gray-800 w-64 text-white">
            <div class="p-6">
                <h1 class="text-2xl font-semibold">Menú</h1>
            </div>
            <ul class="space-y-2">
                <li><a href="#" id="formReclamos" class="block p-4 hover:bg-gray-700">Formulario de Reclamos</a></li>
                <li><a href="#" id="formContacto" class="block p-4 hover:bg-gray-700">Formulario de Contacto</a></li>
                <li><a href="#" id="convocatorias" class="block p-4 hover:bg-gray-700">Convocatorias</a></li>
                <li>
                    <form action="{{ route('logout') }}" method="POST">
                        @csrf
                        <button type="submit" class="w-full p-4 text-left hover:bg-gray-700">Cerrar Sesión</button>
                    </form>
                </li>
            </ul>
        </div>

        <!-- Contenido del Dashboard -->
        <div class="flex-1 p-6">
            <h1 class="text-3xl font-semibold mb-4">Bienvenido al Dashboard</h1>
            <div id="contenido">
                <!-- Aquí se cambiará el contenido según se seleccione el menú -->
            </div>
        </div>
    </div>

    <script>
        // Cambiar el contenido según el menú seleccionado
        document.getElementById('formReclamos').addEventListener('click', function() {
            document.getElementById('contenido').innerHTML = `
                <h2 class="text-2xl mb-4">Formulario de Reclamos</h2>
                <!-- Aquí puedes pegar el formulario de reclamos -->
            `;
        });

        document.getElementById('formContacto').addEventListener('click', function() {
            document.getElementById('contenido').innerHTML = `
                <h2 class="text-2xl mb-4">Formulario de Contacto</h2>
                <!-- Aquí puedes pegar el formulario de contacto -->
            `;
        });

        document.getElementById('convocatorias').addEventListener('click', function() {
            document.getElementById('contenido').innerHTML = `
                <h2 class="text-2xl mb-4">Convocatorias</h2>
                <!-- Aquí puedes poner las convocatorias -->
            `;
        });
    </script>
</body>
</html>
