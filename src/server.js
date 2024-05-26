const express = require('express');
const path = require('path');
const fs = require('fs');
const { conexionMysql } = require('./db/conexionDB');
const variables = require('./utils/variables');
const { configuracionSeguridad } = require('./security/configuracionSeguridad');

const app = express();

const PORT = variables.EXPRESS_PORT;
const HOST = variables.EXPRESS_HOST;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const uploadsPath = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsPath)) {
    fs.mkdirSync(uploadsPath, { recursive: true });
}
app.use('/uploads', express.static(uploadsPath));

configuracionSeguridad(app);

conexionMysql()
    .then(() => {
        app.listen(PORT, HOST, () => {
            console.log(`Escuchando por el servidor http://${HOST}:${PORT}`);
        });
    })
    .catch((err) => {
        console.error("Error al conectar a la base de datos: ", err);
        process.exit();
    });
