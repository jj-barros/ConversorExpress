const express = require('express')
const app = express()
const port = 3000
// Get the client
const mysql = require('mysql2/promise');
const cors = require('cors')

app.use(cors())

// Create the connection to database
const connection = mysql.createPool({
  host: 'localhost',
  user: 'root',
  database: 'servletlogin',
});

async function login(req, res) { //req peticion, res respuesta
  const datos = req.query;
  const [filas] = await connection.query("SELECT * FROM  `usuarios` WHERE `usuario` = '"+datos.usuario+"' AND `contraseña` = '"+datos.clave+"'")

  if (filas.length ==1) {
    res.status(200).json({ logueado: true })
  } else {
    res.status(401).json({ error: 'Usuario o contraseña incorrecta'})
  }
}

app.get('/login', login)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})