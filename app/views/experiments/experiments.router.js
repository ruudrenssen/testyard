const service = require('./experiments.service');
const tableService = require('./table.service');

const express = require('express');

const router = new express.Router();

router.get('/', (req, res) => {
	const { experiments } = service;

	res.render('experiments', { experiments });
});

router.get('/table', (req, res) => {
	const { table } = tableService;

	console.log(table);

	res.render('experiments/table', { table });
});

router.get('/typography', (req, res) => {
	res.render('experiments/typography');
});

module.exports = router;
