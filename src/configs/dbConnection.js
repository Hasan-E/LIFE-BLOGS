"use strict";

/* ============================================ */
/*                LIFE BLOGS API                */
/* ============================================ */

//* ------------ MongoDB Connection ------------ */
const mongoose = require("mongoose");

const dbConnection = function () {
  //Connect:
  mongoose
    .connect(process.env.MONGODB)
    .then(() => console.log("** DB CONNECTED **"))
    .catch(() => console.log("** DB NOT CONNECTED **", err));
};

module.exports = { mongoose, dbConnection };
