const express = require('express');
const productsRouter = require('./routers/productsRouter');
const cartsRouter = require('./routers/cartsRouter');

const app = express();
app.use(express.json()); // Para manejar JSON en las peticiones...

app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);

const PORT = 8080;
app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});


// PERDONEN QUERIDO PROFESOR O QUERIDOS TURORES QUE VAYAN A CORREGIR EL PROYECTO, LAS LINEAS DE COMENTARIOS LAS DEJO PARA GUIARME Y NO PERDERME CON EL CODIGO, PROMETO CUANDO SEAN LAS UTLTIMAS ENTREGAS O EL PROYECTO FINAL SACARLAS, DESDE YA MUCHAS GRACIAS!!!!  