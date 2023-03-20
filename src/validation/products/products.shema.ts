import Joi from "joi";

const productSchema = Joi.object({
    name: Joi.string()
        .min(3)
        .max(36),
    price: Joi.string()
        .min(1)
        .max(48),
    category_id: Joi.number()
})

export default productSchema;