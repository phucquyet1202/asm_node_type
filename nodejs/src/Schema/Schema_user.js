import joi from "joi"
export const signupSchema = joi.object({
    name: joi.string().required().messages({
        "string.empty": "Tên không được để trống",
        "any.required": "Trường tên là bắt buộc",
    }),
    phone: joi.string().required().messages({
        "string.empty": "Số điện thoại không được để trống",
        "any.required": "Trường tên là bắt buộc",
    }),
    email: joi.string().email().required().messages({
        "string.empty": "Email không được để trống",
        "any.required": "Trường email là bắt buộc",
    }),
    password: joi.string().required().min(6).messages({
        "string.empty": "Mật khẩu không được để trống",
        "string.min": "Mật khẩu phải có ít nhất {#limit} ký tự",
        "any.require": "Trường mật khẩu là bắt buộc",
    }),

});
export const signinSchema = joi.object({
    email: joi.string().email().required().messages({
        "string.empty": "Email không được để trống",
        "any.required": "Trường email là bắt buộc",
    }),
    password: joi.string().required().min(6).messages({
        "string.empty": "Mật khẩu không được để trống",
        "string.min": "Mật khẩu phải có ít nhất {#limit} ký tự",
        "any.require": "Trường mật khẩu là bắt buộc",
    }),
})