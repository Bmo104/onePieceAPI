const express = require('express');
const { Pool } = require('pg');
const path = require('path');

const app = express();
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

const pool = new Pool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

app.get('/api/crew', async (req, res) => { // Obtener la lista de piratas
  try {
    const result = await pool.query('SELECT name, id FROM crew ORDER BY bounty DESC');    const resultado =
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({error: 'Error al consular los nombres de la tripulacion'});
  }
});

app.post('api/crew', async (req, res) => { // Para registrar nuevos piratas
  const { name, image, dead, bounty } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO crew (name, image, dead, bounty) VALUES($1, $2, $3) RETURNING *',
      [name, image, dead, bounty || 0]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al reclutar al pirata' });
  }
});

app.get('/api/mate/:id', async (req, res) => { // Obtener la info del cartel
  const { id } = req.params;
  try {
    const result = await pool.query(
      'SELECT * FROM crew WHERE id = $1',
      [id]
    );
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status("500").json({ error: 'Error al obtener pirata por nombre' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Nuestro barco esta atracado en el puerto ${PORT}`);
});
