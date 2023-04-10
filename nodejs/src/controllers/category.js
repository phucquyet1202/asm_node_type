import Joi from "joi";
import Category from "../models/category";

export const getAll = async (req, res) => {
    try {
        const cate = await Category.find()
        if (cate.length === 0) {
            return res.status(404).json({
                message: 'ko co du lieu'
            })
        }
        return res.json(cate)
    } catch (error) {
        return res.status(404).json({
            message: error.message
        })
    }
}

export const get = async (req, res) => {
    try {
        const cate = await Category.findById(req.params.id)
        if (cate.length === 0) {
            return res.status(404).json({
                message: 'ko co du lieu'
            })
        }
        return res.json(cate)
    } catch (error) {
        return res.status(404).json({
            message: error.message
        })
    }
}

export const create = async (req, res) => {
    try {
        const cate = await Category.create(req.body)
        if (cate.length == 0) {
            return res.status(404).json({
                message: 'khong them duoc danh muc'
            })
        }
        return res.status(200).json({
            message: 'them danh muc thanh cong',
            cate
        })
    } catch (error) {
        return res.status(404).json({
            message: error.message
        })
    }
}

export const dele = async (req, res) => {
    try {
        const cate = await Category.findByIdAndDelete({ _id: req.params.id })
        return res.status(200).json({
            message: 'xoa danh muc thanh cong',
            cate
        })
    } catch (error) {
        return res.status(404).json({
            message: error.message
        })
    }
}

export const update = async (req, res) => {
    try {
        const cate = await Category.findByIdAndUpdate({ _id: req.params.id }, req.body, { new: true })
        if (cate.length === 0) {
            return res.status(200).json({
                message: "Cập nhật danh muc không thành công",
            });
        }
        return res.json(cate);
    } catch (error) {
        return res.status(404).json({
            message: error,
        });
    }
};