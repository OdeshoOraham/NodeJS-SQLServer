// Require Node libraries
const express = require("express");
const router = express.Router();

// Welcome Page
router.get("/", (req, res) => res.render("index"));

//Export Module
module.exports = router;
