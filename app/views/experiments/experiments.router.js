const service = require('./experiments.service');
const tableService = require('./table.service');

const express = require('express');

const router = new express.Router();

router.get('/', (req, res) => {
	const { experiments } = service;

	res.render('experiments', { experiments });
});

router.get('/table', (req, res) => {
	const { tables } = tableService;

	res.render('experiments/table', { tables });
});

router.get('/d3', (req, res) => {
	res.render('experiments/d3');
});

module.exports = router;
