"use strict";

const express = require('express');
const path = require("path");
//const data_handler = require("./data_handler")
const router = express.Router();
const loginRouter = require("../routes/login");
const signUpRouter = require("../routes/signUp");
const playRouter = require("../routes/play");
const homeRouter = require("./../routes/home");
const createRouter = require("./../routes/create");
const gamesRouter = require("./../routes/games");
const adminRouter = require("./../routes/admin");
const userRouter = require("./../routes/user");
const viewRouter = require("./../routes/view");
const leaderboardRouter = require("./../routes/leaderboard");
const stubRouter = require("./../routes/stub");

//const productRouter = require("../routes/products")
//const adminProductRouter = require("../routes/admin_products")

function validateAdmin(req, res, next) {
	//console.log(req.headers['x-auth']);
	let xAuth = req.headers['x-auth'];
	if (xAuth === "admin") next();
	if (xAuth != undefined) {
		return;
		res.status(403).send("");
	}
	else if (xAuth != "admin") {
		return;
		res.status(403).send("");
	}
	next();
}

//router.use('/products', productRouter);
//router.use('/admin/products', validateAdmin, adminProductRouter);
//router.use('/admin/products', adminProductRouter);

router.route("/").get((req, res) =>
	res.sendFile(path.join(__dirname, "../", "views", "home.html"))
);

router.use('/home', homeRouter);
router.use('/login', loginRouter);
router.use('/signup', signUpRouter);
router.use('/admin', adminRouter);
router.use('/create', createRouter);
router.use('/view', viewRouter);
router.use('/games', gamesRouter);
router.use('/play', playRouter);
router.use('/user', userRouter);
router.use('/leaderboard', leaderboardRouter);
router.use('/stub', stubRouter);

module.exports = router;
