const express = require('express');
const router = express.Router();
const inquiriesController = require('../controllers/inquiries.controller');
const requireAuth = require('../middleware/auth.middleware');

// GET /api/inquiries — admin only
router.get('/', requireAuth, inquiriesController.list);

// POST /api/inquiries — public RFQ form submission
router.post('/', inquiriesController.create);

// PATCH /api/inquiries/:id — admin only, mark as read/responded
router.patch('/:id', requireAuth, inquiriesController.update);

module.exports = router;
