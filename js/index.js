const BaseDeDatos = [
    {
        id: 'a',
        nombre: "Juan",
        apellido: "Perez",
        edad: 66,
        profesion: "Ing Mecanico"
    },
    {
        id: 2,
        nombre: "Sofía",
        apellido: "Rodríguez",
        edad: 22,
        profesion: "Lic Marketing Digital"
    },
    {
        id: 3,
        nombre: "Mariana",
        apellido: "García",
        edad: 33,
        profesion: "Ing Sistemas Computacionales"
    },
    {
        id: 4,
        nombre: null,
        apellido: "Martínez",
        edad: 18,
        profesion: "Ing Industrial"
    },
    {
        id: 5,
        nombre: "Valentina",
        apellido: "Gómez",
        edad: 26,
        profesion: "Lic Derecho"
    },
    {
        id: 6,
        nombre: "Alejandro",
        apellido: "Flores",
        edad: 17,
        
    },
];

class ErrorPersonalizado extends Error {
    constructor(message) {
        super(message);
        this.name = this.constructor.name;
    }
}

class ErrorPropiedadNoEncontrada extends ErrorPersonalizado {
    constructor(property) {
        super(`La propiedad '${property}' no existe.`);
        this.property = property;
    }
}

class ErrorIDInvalido extends ErrorPersonalizado {
    constructor() {
        super('El ID debe ser un número.');
    }
}

class ErrorNombreNulo extends ErrorPersonalizado {
    constructor() {
        super('El nombre no puede ser null.');
    }
}

class ErrorPropiedadFaltante extends ErrorPersonalizado {
    constructor(property) {
        super(`El registro no tiene la propiedad '${property}'.`);
        this.property = property;
    }
}

document.getElementById('consultaForm').addEventListener('submit', function (event) {
    event.preventDefault();
    const idInput = document.getElementById('idInput').value;
    const resultadoDiv = document.getElementById('resultado');
    const errorDiv = document.getElementById('error');

    resultadoDiv.innerHTML = '';
    errorDiv.innerHTML = '';

    try {
        validarID(idInput);
        const registro = encontrarRegistro(idInput);

        validarNombre(registro.nombre);
        validarPropiedad(registro, 'profesion');

        mostrarRegistro(registro, resultadoDiv);
    } catch (error) {
        mostrarError(error, errorDiv);
    }
});

function validarID(id) {
    if (isNaN(id)) {
        throw new ErrorIDInvalido();
    }
}

function encontrarRegistro(id) {
    const registro = BaseDeDatos.find(item => item.id === parseInt(id));
    if (!registro) {
        throw new ErrorPropiedadNoEncontrada('ID');
    }
    return registro;
}

function validarNombre(nombre) {
    if (nombre === null) {
        throw new ErrorNombreNulo();
    }
}

function validarPropiedad(objeto, propiedad) {
    if (!objeto.hasOwnProperty(propiedad)) {
        throw new ErrorPropiedadFaltante(propiedad);
    }
}

function mostrarRegistro(registro, div) {
    div.innerHTML = `
        <p>ID: ${registro.id}</p>
        <p>Nombre: ${registro.nombre}</p>
        <p>Apellido: ${registro.apellido}</p>
        <p>Edad: ${registro.edad}</p>
        <p>Profesión: ${registro.profesion || 'No especificado'}</p>
    `;
}

function mostrarError(error, div) {
    if (error instanceof ErrorPersonalizado) {
        div.innerHTML = error.message;
    } else {
        div.innerHTML = '<p>Error desconocido.</p>';
    }
}
