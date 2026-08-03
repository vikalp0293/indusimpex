const express = require('express');
const router = express.Router();
const inquiriesController = require('../controllers/inquiries.controller');

// GET /api/inquiries — admin only
router.get('/', inquiriesController.list);

// POST /api/inquiries — public RFQ form submission
router.post('/', inquiriesController.create);

// PATCH /api/inquiries/:id — mark as read/responded
router.patch('/:id', inquiriesController.update);

module.exports = router;
