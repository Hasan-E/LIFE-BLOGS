"use strict";
/* ============================================ */
/*                LIFE BLOGS API                */
/* ============================================ */

const Post = require("../models/comment")
const CustomError = require('../helpers/customError');

module.exports = {

    list: async (req,res) => {
        /*
            #swagger.tags = ["Posts"]
            #swagger.summary = "List Posts"
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
       const result = await res.getModelList(Post)

       res.status(200).send({
        error: false,
        details: await res.getModelListDetails(Post),
        result
       })
    },

    create: async (req, res) => {
        /*
        #swagger.tags = ["Posts"]
        #swagger.summary = "Create Post"
        #swagger.parameters['body'] = {
            in: 'body',
            required: true,
            schema: {$ref: "#/definations/Post"}
            }
         */

        const result = await Post.create(req.body)

        res.status(201).send({
            error: false,
            result
        })
    },

    read: async (req,res) => {
        /*
            #swagger.tags = ["Posts"]
            #swagger.summary = "Get single Post"
         */

        const result = await Post.findById(req.params.id)

        res.status(200).send({
            error: false,
            result
        })
    },

    update: async (req, res) => {
        /*
            #swagger.tags = ["Posts"]
            #swagger.summary = "Update Post"
            #swagger.parameters['body'] = {
                in: 'body',
                required: true,
                schema: $ref: "#definations/Post"
            }
         */

        const result = await Post.findByIdAndUpdate(req.params.id,req.body,{runValidators: true,new: true})

        if (!result) throw new CustomError("Update failed, data is not found or already updated.",404)

        res.status(202).send({
            error: false,
            result
        })
    },

    dlt: async (req, res) => {
        /*
            #swagger.tags = ["Posts"]
            #swagger.summary= "Delete Single Post"
         */

        const result = await Post.findByIdAndDelete(req.params.id)

        if (!result) throw new CustomError("Delete failed, data is not found or already deleted.")
        
        res.status(200).send({
            error: false,
            result
        })
    }

}