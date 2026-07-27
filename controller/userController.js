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


        const hashedpassword = await bcrypt.hash(password, 10);
        const user = await User.create({
            email,
            password: hashedpassword
        });
        return res.status(201).json({
            message: "resgistrasi berhasil",
            data {
                id: user.id,
                email: user.email
            }
        });
    }
    catch {error} {
        return res.status(500). json ({
            message: error.message
        });
    }
})