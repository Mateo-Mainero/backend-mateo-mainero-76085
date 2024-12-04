const express = require('express');
const { create } = require('express-handlebars');
const http = require('http');
const { Server } = require('socket.io');
const fs = require('fs');
const path = require('path');
const productsRouter = require ('./routers/productsRouter');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use( express.static('public'));
app.use('/products', productsRouter);

// Configuración de Handlebars
const hbs = create({ extname: '.handlebars' });
app.engine('.handlebars', hbs.engine);
app.set('view engine', '.handlebars');
app.set('views', './views');

// Ruta para la vista de productos en tiempo real
app.get('/realtimeproducts', (req, res) => {
  const products = loadProducts();
  res.render('realTimeProducts', { title: 'Productos en Tiempo Real', products });
});

// Función para cargar productos desde el archivo JSON
const loadProducts = () => {
  try {
    const data = fs.readFileSync('./data/products.json', 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error cargando productos:', error);
    return [];
  }
};

// Función para guardar productos en el archivo JSON
const saveProducts = (products) => {
  fs.writeFileSync('./data/products.json', JSON.stringify(products, null, 2), 'utf-8');
};

// WebSocket: Manejo de conexión
io.on('connection', (socket) => {
  console.log('Cliente conectado');

  // Enviar los productos iniciales al cliente
  socket.emit('product-updated', loadProducts());

  // Manejar la adición de productos
  socket.on('add-product', (newProduct) => {
    const products = loadProducts();

    // Crear un nuevo producto con ID único
    const newId = products.length > 0 ? products[products.length - 1].id + 1 : 1;
    const product = { id: newId, ...newProduct };

    products.push(product);
    saveProducts(products);

    // Emitir la lista actualizada de productos a todos los clientes
    io.emit('product-updated', products);
  });

  // Manejar la eliminación de productos
  socket.on('delete-product', (productId) => {
    let products = loadProducts();

    // Filtrar el producto a eliminar
    products = products.filter(product => product.id !== productId);
    saveProducts(products);

    // Emitir la lista actualizada de productos a todos los clientes
    io.emit('product-updated', products);
  });
});




// Inicio del servidor
server.listen(8080, () => {
  console.log('Servidor ejecutándose en http://localhost:8080');
});



// PERDONEN QUERIDO PROFESOR O QUERIDOS TURORES QUE VAYAN A CORREGIR EL PROYECTO, LAS LINEAS DE COMENTARIOS LAS DEJO PARA GUIARME Y NO PERDERME CON EL CODIGO, PROMETO CUANDO SEAN LAS UTLTIMAS ENTREGAS O EL PROYECTO FINAL SACARLAS, DESDE YA MUCHAS GRACIAS!!!!  