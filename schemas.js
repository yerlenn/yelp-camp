const Joi = require('joi');


module.exports.campgroundSchema = Joi.object({
    title: Joi.string().required(),
    price: Joi.number().required().min(0),
    // img: Joi.string().required(),
    location: Joi.string().required(),
    deleteImages: Joi.array()
});

module.exports.reviewSchema = Joi.object({
    rating: Joi.number().required(),
    body: Joi.string().required()
});