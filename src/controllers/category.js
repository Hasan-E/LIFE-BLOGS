"use strict";
/* ============================================ */
/*                LIFE BLOGS API                */
/* ============================================ */

const Category = require("../models/category")
const CustomError = require('../helpers/customError')

module.exports = {

    list: async (req,res) => {
        /*
            #swagger.tags = ["Categories"]
            #swagger.summary = "List Categories"
            #swagger.description = `
            You can use <u> filter[] & search[] & sort[] & page & limit </u> queries with endpoint.
            <ul>
                <li> URL/?<b>filter[field1]=value1&filter[field2]=value2</b> </li>
                <li> URL/?<b>search[field1]=value1&search[field2]=value2</b> </li>
                <li> URL/?<b>sort[field1]=value1&sort[field2]=value2</b> </li>
                <li> URL/?<b>page=1&limit=10</b> </li>
            </ul>
            `
        */
       const result = await res.g
    }

}