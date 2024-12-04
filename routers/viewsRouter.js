const express = require('express');
const fs = require('fs');
const path = require('path');

const router = express.Router();
const filePath = path.join(__dirname, '../data/products.json');

// Helper para leer productos
const readProducts = () => JSON.parse(fs.readFileSync(filePath, 'utf-8'));

// Ruta "/products" - Vista con todos los productos
router.get('/products', (req, res) => {
  const products = readProducts();
  res.render('index', { products });
});

// Ruta "/realtimeproducts" - Vista en tiempo real
router.get('/realtimeproducts', (req, res) => {
  const products = readProducts();
  res.render('realTimeProducts', { products });
});

module.exports = router;
