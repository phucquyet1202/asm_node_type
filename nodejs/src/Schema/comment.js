import joi from "joi";


export const commentSchema = joi.object({
    product: joi.string().required().messages({ "string.empty": "Mã sản phẩm không được để trống" },),
    comment: joi.string().required().messages({ "string.empty": "Nội dung không được để trống", }),
});
