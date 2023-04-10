import User from "../models/user";
import bcrypt from "bcryptjs"
import { signinSchema, signupSchema } from "../Schema/Schema_user";
import jwt from "jsonwebtoken";

// đăng ký 
export const signup = async (req, res) => {
    try {
        const { error } = signupSchema.validate(req.body, { abortEarly: false });
        if (error) {
            const err = error.details.map((err) => err.message)
            return res.status(400).json({
                message: err
            })
        }
        const Email = await User.findOne({ email: req.body.email })
        if (Email) {
            return res.status(400).json({
                message: 'email nay da ton tai'
            })
        }
        const hashPassword = await bcrypt.hash(req.body.password, 10)
        const user = await User.create({
            name: req.body.name,
            password: hashPassword,
            email: req.body.email,
            phone: req.body.phone
        })
        user.password = undefined
        return res.status(200).json({
            message: 'dang ky thanh cong',
            user
        })
    } catch (error) {
        return res.status(400).json({
            message: error
        })
    }
}

// dang nhap
export const signin = async (req, res) => {
    try {
        const { error } = signinSchema.validate(req.body, { abortEarly: false })
        if (error) {
            const err = error.details.map(err => err.message)
            return res.status(400).json({
                message: err
            })
        }
        const Email = await User.findOne({ email: req.body.email })
        if (!Email) {
            return res.status(404).json({
                message: 'email khong dung'
            })
        }
        const password = await bcrypt.compare(req.body.password, Email.password)
        if (!password) {
            return res.status(404).json({
                message: 'password khong dung'
            })
        }
        const token = jwt.sign({ id: Email._id }, "123456", { expiresIn: '1d' })
        Email.password = undefined
        console.log(1);
        return res.status(200).json({
            message: 'dang nhap thanh cong',
            "token": token,
            Email,

        })
    } catch (error) {
        return res.status(400).json({

        })
    }
}

export const getUser = async (req, res) => {
    const user = await User.find()
    user.password = undefined
    if (user.length == 0) {
        return res.status(404).json({
            message: 'ko lay dc user'
        })
    }
    return res.status(200).json({
        message: 'lay user thanh cong',
        user
    })
}