import joi from "joi";

export const productSchema = joi.object({
    name: joi.string().required().messages({
        "string.empty": "Tên không được để trống",
        "any.required": "Trường tên là bắt buộc",
    }),
    price: joi.number().min(0).required().messages({
        "number.base": "Giá không được để trống",
        "number.empty": "Giá phải là số",
        "any.required": "Trường giá là bắt buộc",
    }),
    original_price: joi.number().min(0).required().messages({
        "number.base": "Giá gốc không được để trống",
        "number.empty": "Giá gốc phải là số",
        "any.required": "Trường giá gốc là bắt buộc",
    }),
    short_description: joi.string().optional().messages({
        "string.empty": "Mô tả ngắn không được để trống",
        "any.required": "Trường mô tả ngắn là bắt buộc",
    }),
    description: joi.string().optional().messages({
        "string.empty": "Mô tả không được để trống",
        "any.required": "Trường mô tả là bắt buộc",
    }),
    images: joi.array().items(joi.object({
        base_url: joi.string().messages({
            "string.empty": "Ảnh không được để trống",
            "any.required": "Trường ảnh là bắt buộc",
        }),
    })).optional(),
    specifications: joi.array().items(joi.object({
        name: joi.string().optional(),
        attributes: joi.array().items(joi.object({
            code: joi.string().optional(),
            name: joi.string().optional(),
            value: joi.string().optional(),
        })).optional(),
    })).optional(),
}).options({ allowUnknown: true });