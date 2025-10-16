"use strict";
/* ============================================ */
/*                LIFE BLOGS API                */
/* ============================================ */

const bcrypt = require("bcrypt")
const User = require('../models/user')
const Token = require('../models/token')
const CustomError = require("../helpers/customError")
const {generateToken, tokenExpiryDate} = require("../helpers/tokenHelper")
const SALT_ROUNDS = Number(process.env.SALT_ROUNDS) || 10
const TOKEN_TTL_MINUTES = Number(process.env.TOKEN_TTL_MINUTES) || 60 * 24 * 7

module.exports = {
    /* ----------------- register ----------------- */
    register: async (req, res) => {
        const {email,password, username}= req.body
        if(!username || !email || !password) throw new CustomError("Email/Username and password required", 400)
        
        const [existName,existEmail] = await Promise.all([User.findOne({username}),User.findOne({email})])
        if(existEmail) throw new CustomError("Email already in use", 409)
        if(existName) throw new CustomError("Username already in use", 409)

        const hashed = await bcrypt.hash(password,SALT_ROUNDS)
        const user = await User.create({email,password: hashed,username})
        
        //Create Token
        const token = generateToken()
        const expiresAt = tokenExpiryDate(TOKEN_TTL_MINUTES)
        const tokenData = await Token.create({userId: user._id,token,expiresAt})
        
        const result = {token:tokenData.token,expiresAt:tokenData.expiresAt,user: {id: user._id,email: user.email,username}}

        res.status(201).send({
            error: false,
            result
        })
    },

    /* ------------------- login ------------------ */
    login: async (req,res) => {
        const {email, username , password} = req.body
        if(!(email || username) || !password) throw new CustomError("Email/Username and password required", 400)

        const user = await User.findOne({ $or: [{email},{username}],password})
        if(!user) throw new CustomError("Invalid email/username or password",401)
        
        const valid = bcrypt.compareSync(password,user.password)
        if(!valid) throw new CustomError("Invalid email/username or password",401)
        
            //Create Token
        const token = generateToken()
        const expiresAt = tokenExpiryDate(TOKEN_TTL_MINUTES)
        const tokenData = await Token.create({userId: user._id,token,expiresAt})
        
        const result = {token:tokenData.token,expiresAt:tokenData.expiresAt,user: {id: user._id,email: user.email,username}}

        res.status(200).send({
            error: false,
            result
        })
    },

    /* ------------------ refresh ----------------- */
    refresh: async (req,res) => {
        const authHeader = req.headers["authorization"]
        const currentToken = authHeader && authHeader.split(" ")[1]
        if(!currentToken) throw new CustomError("Token required", 401)

        const tokenData = await Token.findOne({token: currentToken})
        if(!tokenData) throw new CustomError("Invalid Token", 401)
        if(tokenData.expiresAt < new Date()) throw new CustomError("Token expired", 401)
        
        await Token.findByIdAndDelete(tokenData._id)

        const newToken = generateToken()
        const expiresAt = tokenExpiryDate(TOKEN_TTL_MINUTES)

        const newtokenData = await Token.create({
            userId: tokenData.userId,
            token: newToken,
            expiresAt

        })
        const result = {token: newtokenData.token, expiresAt}

        res.status(200).send({
            error: false,
            result
        })
    },

    /* ------------------ logout ------------------ */
    logout: async (req, res) => {
        const authHeader = req.headers["authorization"]
        const token = authHeader && authHeader.split(" ")[1]
        if(!token) throw new CustomError("Token required.", 401)

        const deleted = await Token.findOneAndDelete({token})
        if(!deleted) throw new CustomError("Token not found or already deleted.", 404)

        res.status(200).send({error: false, result: "Logged out."})
    }
}


