const Router = require('koa-router');
const bookHandler = require('../handlers/books/bookHandlers');
const productHandler = require('../handlers/products/productHandlers')
const { bookInputMiddleware } = require('../middleware/bookInputMiddleware')
const { productInputMiddleware } = require('../middleware/product/productInputMiddleware')

// Prefix all routes with /books
const router = new Router({
  prefix: '/api'
});

// Routes book
router.get('/books', bookHandler.getBooks);
router.get('/books/:id', bookHandler.getBook);
router.post('/books', bookInputMiddleware, bookHandler.save);

// product routes
router.post('/products/init', productHandler.initDataProduct)   
router.post('/products',productInputMiddleware, productHandler.createProductById)
router.put('/products/:id',productInputMiddleware, productHandler.updateProductById)
router.delete('/products/:id', productHandler.deleteProductById)
router.get('/products/:id', productHandler.getProductById)
router.get('/products', productHandler.getAllProduct)


module.exports = router;
