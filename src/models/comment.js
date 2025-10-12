"use strict";
/* ============================================ */
/*                LIFE BLOGS API                */
/* ============================================ */

const {mongoose: {Schema, model}} = require('../configs/dbConnection')

const commentSchema = new Schema({

    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    postId: {
        type: Schema.Types.ObjectId,
        ref: 'Post',
        required: true,
    },
    content: {
        type: String,
        trim: true,
        required: true,
    },
    likeCount: {
        type: Number,
        default: 0,
    },
    likedBy: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    }
})