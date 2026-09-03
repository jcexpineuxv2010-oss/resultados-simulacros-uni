document.getElementById('btnBuscar').addEventListener('click', function() {
    const dniBuscado = document.getElementById('inputDni').value.trim();
    const resultadoContainer = document.getElementById('resultadoContainer');
    const errorContainer = document.getElementById('errorContainer');

    if (dniBuscado === "") {
        alert("Por favor ingresa un DNI válido.");
        return;
    }

    // Buscamos dentro de la variable del archivo datos.js
    const alumnoEncontrado = resultadosAlumnos.find(alumno => alumno.dni === dniBuscado);

    if (alumnoEncontrado) {
        document.getElementById('resDni').textContent = alumnoEncontrado.dni;
        document.getElementById('resNombre').textContent = alumnoEncontrado.nombre;
        document.getElementById('resPuntaje').textContent = alumnoEncontrado.puntaje;
        
        const spanEstado = document.getElementById('resEstado');
        spanEstado.textContent = alumnoEncontrado.estado;
        
        if (alumnoEncontrado.estado.toUpperCase() === "INGRESANTE") {
            spanEstado.className = "badge";
        } else {
            spanEstado.className = "badge no-ingresante";
        }

        resultadoContainer.classList.remove('oculto');
        errorContainer.classList.add('oculto');
    } else {
        resultadoContainer.classList.add('oculto');
        errorContainer.classList.remove('oculto');
    }
});