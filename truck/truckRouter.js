const router = require("express").Router();
const bcryptjs = require("bcrypt");
const jwt = require("jsonwebtoken");
const randomConsts = require("../config/randomConsts");

const db = require("../allModel/allModel");

module.exports = router;
