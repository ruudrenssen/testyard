const service = require('./experiments.service');

const express = require('express');

const router = new express.Router();

router.get('/', (req, res) => {
	const { experiments } = service;

	res.render('experiments', { experiments });
});

router.get('/table', (req, res) => {
	res.render('experiments/table');
});

router.get('/typography', (req, res) => {
	res.render('experiments/typography');
});

module.exports = router;
