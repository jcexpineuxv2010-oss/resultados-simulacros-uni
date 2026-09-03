// Contraseña sencilla para el tutor
const PASSWORD_ADMIN = "1234";

document.getElementById('btnLogin').addEventListener('click', function() {
    const pass = document.getElementById('inputPass').value;
    if (pass === PASSWORD_ADMIN) {
        document.getElementById('loginSection').classList.add('oculto');
        document.getElementById('panelSection').classList.remove('oculto');
    } else {
        document.getElementById('loginError').classList.remove('oculto');
    }
});

document.getElementById('btnProcesar').addEventListener('click', function() {
    const fileInput = document.getElementById('excelFile');
    if (fileInput.files.length === 0) {
        alert("Por favor selecciona un archivo Excel.");
        return;
    }

    const file = fileInput.files[0];
    const reader = new FileReader();

    reader.onload = function(e) {
        const data = new Uint8Array(e.target.result);
        const workbook = XLSX.read(data, { type: 'array' });

        // Tomar la primera pestaña del Excel
        const firstSheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[firstSheetName];

        // Convertir Excel a un arreglo de objetos JSON
        const jsonData = XLSX.utils.sheet_to_json(worksheet);

        // Limpiamos los datos para asegurar que las propiedades coincidan
        const listaFormateada = jsonData.map(row => ({
            dni: String(row.dni || row.DNI || "").trim(),
            nombre: String(row.nombre || row.NOMBRE || row.Apellidos || "").trim(),
            puntaje: String(row.puntaje || row.Puntaje || "").trim(),
            estado: String(row.estado || row.ESTADO || "").trim()
        }));

        // Crear el contenido del archivo datos.js en texto plano
        const contenidoJS = `let resultadosAlumnos = ${JSON.stringify(listaFormateada, null, 4)};`;

        // Crear un archivo descargable virtual (Blob)
        const blob = new Blob([contenidoJS], { type: 'text/javascript' });
        const url = URL.createObjectURL(blob);

        // Mostrar botón de descarga para que el tutor guarde su nuevo datos.js
        const btnDescargar = document.getElementById('btnDescargar');
        btnDescargar.href = url;
        btnDescargar.download = 'datos.js';
        btnDescargar.classList.remove('oculto');

        document.getElementById('successMsg').classList.remove('oculto');
    };

    reader.readAsArrayBuffer(file);
});