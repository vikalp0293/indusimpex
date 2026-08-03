const express = require('express');
const router = express.Router();
const pagesController = require('../controllers/pages.controller');

// GET /api/pages/:key — e.g. home, about, export-info
router.get('/:key', pagesController.getByKey);

// PUT /api/pages/:key — admin edits
router.put('/:key', pagesController.update);

module.exports = router;
