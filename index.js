"use strict";
/* ============================================ */
/*                LIFE BLOGS API                */
/* ============================================ */

//* -------------- import express -------------- */
const express = require("express");
const app = express();

require("dotenv").config();
const PORT = process.env.PORT;


//* ---------------- DB Connection --------------- */
const { dbConnection } = require("./src/configs/dbConnection");
dbConnection();

//* ------------------ Middlewares ------------------ */
// Accept JSON
app.use(express.json());
app.use(express.urlencoded({extended: true}))
app.set("query parser","extended")  // for nested query
// Query Handler
app.use(require('./src/middlewares/queryHandler'))

//* ------------------ Routes ------------------ */
app.all("/", (req, res) => res.send("Welcome to Life Blogs API"));

//* --------------- ErrorHandler --------------- */
app.use(require("./src/middlewares/errorHandler"));

//* ---------------- listen app ---------------- */
app.listen(PORT, () => console.log("Running at: http://127.0.0.1" + PORT));
