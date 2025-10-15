"use strict";
/* ============================================ */
/*                LIFE BLOGS API                */
/* ============================================ */

const Comment = require("../models/comment")
const CustomError = require('../helpers/customError');

module.exports = {

    list: async (req,res) => {
        /*
            #swagger.tags = ["Comments"]
            #swagger.summary = "List Comments"
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
       const result = await res.getModelList(Comment)

       res.status(200).send({
        error: false,
        details: await res.getModelListDetails(Comment),
        result
       })
    },

    create: async (req, res) => {
        /*
        #swagger.tags = ["Comments"]
        #swagger.summary = "Create Comment"
        #swagger.parameters['body'] = {
            in: 'body',
            required: true,
            schema: {$ref: "#/definations/Comment"}
            }
         */

        const result = await Comment.create(req.body)

        res.status(201).send({
            error: false,
            result
        })
    },

    read: async (req,res) => {
        /*
            #swagger.tags = ["Comments"]
            #swagger.summary = "Get single Comment"
         */

        const result = await Comment.findById(req.params.id)

        if (!result) throw new CustomError('Comment not found')
        
        res.status(200).send({
            error: false,
            result
        })
    },

    update: async (req, res) => {
        /*
            #swagger.tags = ["Comments"]
            #swagger.summary = "Update Comment"
            #swagger.parameters['body'] = {
                in: 'body',
                required: true,
                schema: $ref: "#definations/Comment"
            }
         */

        const result = await Comment.findByIdAndUpdate(req.params.id,req.body,{runValidators: true,new: true})

        if (!result) throw new CustomError("Update failed, data is not found or already updated.",404)

        res.status(202).send({
            error: false,
            result
        })
    },

    dlt: async (req, res) => {
        /*
            #swagger.tags = ["Comments"]
            #swagger.summary= "Delete Single Comment"
         */

        const result = await Comment.findByIdAndDelete(req.params.id)

        if (!result) throw new CustomError("Delete failed, data is not found or already deleted.")
        
        res.status(200).send({
            error: false,
            result
        })
    }

}