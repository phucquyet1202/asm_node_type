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

        // Thêm ObjectId vào thuộc tính products trong model Category
        // await Category.findByIdAndUpdate(product.categoryId, {
        //     $addToSet: {
        //         products: product._id,
        //     },
        // });
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

// tim kiem
// export const search = async (req, res) => {
//     try {
//         const searchQuery = req.params.name.toLowerCase();
//         const products = await Product.find({});
//         const filteredProducts = products.filter((product) => {
//             return product.name.toLowerCase().includes(searchQuery);
//         });
//         if (filteredProducts.length === 0) {
//             return res.status(404).json({
//                 message: 'Không tìm thấy sản phẩm',
//             });
//         }
//         return res.status(200).json({
//             message: 'Tìm kiếm sản phẩm thành công',
//             products: filteredProducts,
//         });
//     } catch (error) {
//         return res.status(500).json({
//             message: 'Lỗi server',
//             error: error,
//         });
//     }
// }
