"use strict";
const express = require('express');
const path = require("path");
const dataHandler = require("../controllers/data_handler");
const router = express.Router();

router.route("/").get((req, res) => {
	let got = dataHandler.getProducts();

	let toSend = [];
	got.forEach((obj) => {
		toSend.push(JSON.stringify(obj));
		console.log(obj._uuid);
	}
	);
	res.send(toSend);
}
);

router.route("/:id").get((req, res) => {
	let id = req.params.id;
	console.log("here", id);
	let product = (dataHandler.getProductById(id));
	console.log(product);
	if (product != undefined) res.status(200).json(product);
	else res.status(404).send("404 bad :c");
});
router.route("/cart").post((req, res) => {
	let proxies = req.body;
	let products = [];
	if (!Array.isArray(proxies)) {
		res.status(400).send("");
	}
	for (let proxy in proxies) {
		let product = dataHandler.getProductById(proxy._uuid);
		if (product != undefined) { products.push(product); }
		else {
			res.status(404).send("");
			return;
		}
	}
	res.status(200).json(products);
});

module.exports = router;
