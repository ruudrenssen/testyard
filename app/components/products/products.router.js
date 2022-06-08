const service = require('./products.service');

const express = require('express');

const router = new express.Router();

router.get('/', (req, res) => {
	const { products } = service;

	res.render('products', { products });
});

module.exports = router;
