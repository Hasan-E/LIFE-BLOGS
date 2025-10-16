"use strict";
/* ============================================ */
/*                LIFE BLOGS API                */
/* ============================================ */

const crypto = require("crypto")

const generateToken = (len = 48) => crypto.randomBytes(len).toString("hex")
const tokenExpiryDate = (minutes = 60*24*7)=> new Date(Date.now() + minutes * 60 * 1000)

module.exports = {generateToken,tokenExpiryDate}