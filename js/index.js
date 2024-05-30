let BaseDeDatos = [
    {
        id: 'a',
        nombre: "Juan",
        apellido: "Perez",
        edad: 66,
        profecion: "Ing Mecanico"
    },
    {
        id: 2,
        nombre: "Sofía",
        apellido: "Rodríguez",
        edad: 22,
        profecion: "Lic Marketing Digital"
    },
    {
        id: 3,
        nombre: "Mariana",
        apellido: "García",
        edad: 33,
        profecion: "Ing Sistemas Computacionales"
    },
    {
        id: 4,
        nombre: null,
        apellido: "Martínez",
        edad: 18,
        profecion: "Ing Industrial"
    },
    {
        id: 5,
        nombre: "Valentina",
        apellido: "Gómez",
        edad: 26,
        profecion: "Lic Derecho"
    },
    {
        id: 6,
        nombre: "Alejandro",
        apellido: "Flores",
        edad: 17,
    },
];

document.getElementById('consultaForm').addEventListener('submit', function (event) {
    event.preventDefault();
    const idInput = document.getElementById('idInput').value;
    const resultadoDiv = document.getElementById('resultado');
    const errorDiv = document.getElementById('error');

    resultadoDiv.innerHTML = '';
    errorDiv.innerHTML = '';

    try {
        if (isNaN(idInput)) {
            throw new Error('El id no es un número.');
        }

        const id = parseInt(idInput);
        const registro = BaseDeDatos.find(item => item.id === id);

        if (!registro) {
            throw new Error('La propiedad no existe.');
        }

        if (registro.nombre === null) {
            throw new Error('El nombre contiene un null.');
        }

        resultadoDiv.innerHTML = `
            <p>ID: ${registro.id}</p>
            <p>Nombre: ${registro.nombre}</p>
            <p>Apellido: ${registro.apellido}</p>
            <p>Edad: ${registro.edad}</p>
            <p>Profesión: ${registro.profecion || 'No especificado'}</p>
        `;
    } catch (error) {
        errorDiv.innerHTML = error.message;
    }
});
