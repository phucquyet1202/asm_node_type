import axios from "axios";
import Product from "../models/product";
import Category from "../models/category";
import Joi from "joi";
import loda from 'lodash'
import { productSchema } from "../Schema/Schema_product";
export const getAll = async (req, res) => {
    try {
        const data = await Product.find().populate("brand").populate("comments")
        // console.log(data);
        if (data.length === 0) {
            return res.status(200).json({
                message: "Không có dữ liệu",
            });
        }
        return res.json(data);
    } catch (error) {
        return res.status(404).json({
            message: error,
        });
    }
};
export const get = async (req, res) => {
    try {
        const data = await Product.findById(req.params.id)
            .populate("brand")
            .populate({
                path: "comments",
                populate: [
                    {
                        path: "user",
                    }],
            });
        // console.log(data);
        if (data.length === 0) {
            return res.status(200).json({
                message: "Không có dữ liệu",
            });
        }
        return res.json(data);
    } catch (error) {
        return res.status(404).json({
            message: error,
        });
    }
};
export const create = async (req, res) => {
    try {
        const { error } = productSchema.validate(req.body);

        if (error) {
            return res.status(400).json({
                message: error.details.map((err) => err.message),
            });
        }
        const product = await Product.create(req.body);
        if (product.length === 0) {
            return res.status(200).json({
                message: "Không thêm được sản phẩm",
            });
        }
        return res.json(product);
    } catch (error) {
        return res.status(404).json({
            message: error.message,
        });
    }
};
export const update = async (req, res) => {
    console.log(req.body);
    try {
        const { error } = productSchema.validate(req.body)
        if (error) {
            return res.status(400).json({
                message: error.details.map((err) => err.message)
            })
        }
        const data = await Product.findByIdAndUpdate({ _id: req.params.id }, req.body, { new: true })
        if (data.length === 0) {
            return res.status(200).json({
                message: "Cập nhật sản phẩm không thành công",
            });
        }
        return res.json(data);
    } catch (error) {
        return res.status(404).json({
            message: error,
        });
    }
};
export const remove = async (req, res) => {
    try {
        await Product.findByIdAndDelete({ _id: req.params.id });
        return res.json({
            message: "Xóa sản phẩm thành công",
        });
    } catch (error) {
        return res.status(404).json({
            message: error,
        });
    }
};

// search
export const search = async (req, res) => {
    try {
        const { name } = req.body; // Lấy tên sản phẩm từ req.body
        // console.log(name); // In ra tên sản phẩm
        const data = await Product.find({
            name: {
                $regex: name,
                $options: 'i', // Tìm kiếm không phân biệt chữ hoa, chữ thường
            },
        }).populate('brand'); // Tìm sản phẩm dựa trên tên và populate thông tin thương hiệu (brand)
        return res.status(200).json({ message: 'Tìm sản phẩm thành công', data: data });
    } catch (error) {
        console.log(error);
        return res.status(404).json({ message: error.message })
    }
}
