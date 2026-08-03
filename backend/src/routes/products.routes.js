const express = require('express');
const router = express.Router();
const productsController = require('../controllers/products.controller');

// GET /api/products
router.get('/', productsController.list);

// GET /api/products/:slug
router.get('/:slug', productsController.getBySlug);

// POST /api/products
router.post('/', productsController.create);

// PUT /api/products/:id
router.put('/:id', productsController.update);

// DELETE /api/products/:id
router.delete('/:id', productsController.remove);

module.exports = router;
