const express = require('express');
const { db } = require('@vercel/postgres');
const app = express();

app.use(express.json());

// 1. ENDPOINT GET: Para leer los usuarios de la DB
app.get('/api/usuarios', async (req, res) => {
    try {
        const { rows } = await db.query('SELECT id, nombre FROM usuarios');
        res.json(rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// 2. ENDPOINT POST: Para añadir usuarios
app.post('/api/usuarios', async (req, res) => {
    const { nombre } = req.body;
    try {
        const { rows } = await db.query(
            'INSERT INTO usuarios (nombre) VALUES ($1) RETURNING *',
            [nombre]
        );
        res.status(201).json(rows[0]);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = app;