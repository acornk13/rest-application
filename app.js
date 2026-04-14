const express = require('express');
const app = express();
app.use(express.json());

// almacenamiento en memoria
let alumnos = [];
let profesores = [];

// Validaciones
function validarAlumno(alumno) {
    return alumno && 
        typeof alumno.nombres === 'string' &&
        typeof alumno.apellidos === 'string' &&
        typeof alumno.matricula === 'string' &&
        typeof alumno.promedio === 'number';
}

function validarProfesor(profesor) {
    return profesor &&
        typeof profesor.nombres === 'string' &&
        typeof profesor.apellidos === 'string' &&
        typeof profesor.horasClase === 'number';
}

// Alumnos

//GET todos
app.get('/alumnos', (req, res) => {
    res.status(200).json(alumnos);
});

//GET por ID
app.get('/alumnos/:id', (req, res) => {
    const alumno = alumnos.find(a => a.id == req.params.id);
    if (!alumno) return res.status(404).json({ error: "Alumno no encontrado" });
    res.status(200).json(alumno);
});

// POST
app.post('/alumnos', (req, res) => {
    if (!validarAlumno(req.body)) {
        return res.status(400).json({ error: "Datos inválidos" });
    }

    const nuevo = { id: alumnos.length + 1, ...req.body };
    alumnos.push(nuevo);

    res.status(201).json(nuevo);
});

// PUT
app.put('/alumnos/:id', (req, res) => {
    const index = alumnos.findIndex(a => a.id == req.params.id);

    if (index === -1) {
        return res.status(404).json({ error: "Alumno no encontrado" });
    }

    if (!validarAlumno(req.body)) {
        return res.status(400).json({ error: "Datos inválidos" });
    }

    alumnos[index] = { id: alumnos[index].id, ...req.body };

    res.status(200).json(alumnos[index]);
});

// DELETE
app.delete('/alumnos/:id', (req, res) => {
    const index = alumnos.findIndex(a => a.id == req.params.id);

    if (index === -1) {
        return res.status(404).json({ error: "Alumno no encontrado" });
    }

    alumnos.splice(index, 1);

    res.status(200).json({ mensaje: "Alumno eliminado" });
});

// Profesores

// GET todos
app.get('/profesores', (req, res) => {
    res.status(200).json(profesores);
});

// GET por ID
app.get('/profesores/:id', (req, res) => {
    const profesor = profesores.find(p => p.id == req.params.id);
    if (!profesor) return res.status(404).json({ error: "Profesor no encontrado" });
    res.status(200).json(profesor);
});

// POST
app.post('/profesores', (req, res) => {
    if (!validarProfesor(req.body)) {
        return res.status(400).json({ error: "Datos inválidos" });
    }

    const nuevo = { id: profesores.length + 1, ...req.body };
    profesores.push(nuevo);

    res.status(201).json(nuevo);
});

// PUT
app.put('/profesores/:id', (req, res) => {
    const index = profesores.findIndex(p => p.id == req.params.id);

    if (index === -1) {
        return res.status(404).json({ error: "Profesor no encontrado" });
    }

    if (!validarProfesor(req.body)) {
        return res.status(400).json({ error: "Datos inválidos" });
    }

    profesores[index] = { id: profesores[index].id, ...req.body };

    res.status(200).json(profesores[index]);
});

// DELETE
app.delete('/profesores/:id', (req, res) => {
    const index = profesores.findIndex(p => p.id == req.params.id);

    if (index === -1) {
        return res.status(404).json({ error: "Profesor no encontrado" });
    }

    profesores.splice(index, 1);

    res.status(200).json({ mensaje: "Profesor eliminado" });
});

// 405

app.all('/alumnos', (req, res) => {
    if (!['GET', 'POST'].includes(req.method)) {
        return res.status(405).json({ error: "Método no permitido" });
    }
});

app.all('/alumnos/:id', (req, res) => {
    if (!['GET', 'PUT', 'DELETE'].includes(req.method)) {
        return res.status(405).json({ error: "Método no permitido" });
    }
});

app.all('/profesores', (req, res) => {
    if (!['GET', 'POST'].includes(req.method)) {
        return res.status(405).json({ error: "Método no permitido" });
    }
});

app.all('/profesores/:id', (req, res) => {
    if (!['GET', 'PUT', 'DELETE'].includes(req.method)) {
        return res.status(405).json({ error: "Método no permitido" });
    }
});

// 404

app.use((req, res) => {
    res.status(404).json({ error: "Ruta no encontrada" });
});

// Servidor
const PORT = 8080;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en puerto ${PORT}`);
});