const express = require('express');
const router = express.Router();
const productsController = require('../controllers/products.controller');
const requireAuth = require('../middleware/auth.middleware');

// GET /api/products
router.get('/', productsController.list);

// GET /api/products/:slug
router.get('/:slug', productsController.getBySlug);

// POST /api/products — admin only
router.post('/', requireAuth, productsController.create);

// PUT /api/products/:id — admin only
router.put('/:id', requireAuth, productsController.update);

// DELETE /api/products/:id — admin only
router.delete('/:id', requireAuth, productsController.remove);

module.exports = router;
