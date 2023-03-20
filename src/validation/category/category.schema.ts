import Joi from "joi";

const categorySchema = Joi.object({
    name: Joi.string()
        .min(3)
        .max(48)
})

export default categorySchema;