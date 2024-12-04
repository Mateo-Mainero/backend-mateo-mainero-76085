const socket = io();

// Escuchar actualizaciones iniciales y en tiempo real de los productos
socket.on('product-updated', (products) => {
  const productList = document.getElementById('product-list');
  
  // Generar la lista de productos
  productList.innerHTML = products.map(product => `
    <li id="product-${product.id}" class="product-item">
      <span class="product-title">${product.title}</span>
      <span class="product-price">$${product.price}</span>
      <span class="product-stock">Stock: ${product.stock}</span>
      <button class="delete-btn" onclick="deleteProduct(${product.id})">Eliminar</button>
    </li>
  `).join('');
});

// Manejar el envío del formulario
const form = document.getElementById('product-form');
form.addEventListener('submit', (event) => {
  event.preventDefault();

  const title = form.elements['title'].value;
  const price = parseFloat(form.elements['price'].value);
  const stock = parseInt(form.elements['stock'].value);

  // Enviar producto al servidor
  socket.emit('add-product', { title, price, stock });

  // Limpiar el formulario
  form.reset();
});

// Eliminar producto
function deleteProduct(productId) {
  socket.emit('delete-product', productId);
}


