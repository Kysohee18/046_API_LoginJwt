const db = require("../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = db.user;

async function register (req, res)
{
    try {
        const {
            email, password
        } = req.body

        if (!email || !password) {
            return res.status(400).json({
                message: "email dan password wajib diisi"
            });
        }

        const existingUser = await User.findOne({
            where: { email }
        });

        if (existingUser) {
            return res.status(409).json({
                message: "email sudah terdaftar"
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({
            email,
            password: hashedPassword
        });

        return res.status(201).json({
            message: "registrasi berhasil",
            data: {
                id: user.id,
                email: user.email
            }
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }
}

async function login (req, res)
{
    try {
        const {
            email, password
        } = req.body

        if (!email || !password) {
            return res.status(400).json({
                message: "email dan password wajib diisi"
            });
        }

        const user = await User.findOne({
            where: { email }
        });

        if (!user) {
            return res.status(404).json({
                message: "user tidak ditemukan"
            });
        }

        const isValid = await bcrypt.compare(password, user.password);

        if (!isValid) {
            return res.status(401).json({
                message: "password salah"
            });
        }

        const token = jwt.sign(
            { id: user.id, email: user.email },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
        );

        return res.status(200).json({
            message: "login berhasil",
            token
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }
}

module.exports = {
    register,
    login
}
