const express = require('express');
const router = express.Router();
const pagesController = require('../controllers/pages.controller');
const requireAuth = require('../middleware/auth.middleware');

// GET /api/pages/:key — public, e.g. home, about, export-info
router.get('/:key', pagesController.getByKey);

// PUT /api/pages/:key — admin only
router.put('/:key', requireAuth, pagesController.update);

module.exports = router;
