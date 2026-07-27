const db = require("../models");
const bcrypt = require ("bcrypt");
const jwt = require("jsonwebtoken");
const { where } = require("sequelize");

const User = db.User;
async function register(req, res {
    try {
        const {email, password} = req.body
        if (!email || !password){
            return res.status(400).json({
                message: "email dan password wajib diisi"
            });
        }
        const existingUser = await User.findone({
            where : {email}
        });


        const hashedpassowrd = await bcrypt.hash(password, 10);
        const user =
    }
})