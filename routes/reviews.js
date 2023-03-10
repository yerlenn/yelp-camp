const express = require('express');
const router = express.Router({ mergeParams: true });
const catchAsync = require('../utilities/catchAsync');
const ExpressError = require('../utilities/ExpressError');
const Review = require('../models/review');
const Campground = require('../models/campground');
const { campgroundSchema, reviewSchema } = require('../schemas.js')
const { isLoggedIn, validateCampground, isReviewAuthor } = require('../middleware');
const reviews = require('../controllers/reviews');


const validateReview = (req, res, next) => {
    const result = reviewSchema.validate(req.body);
    if (result.error) {
        const msg = result.error.details.map(el => el.message).join(',');
        throw new ExpressError(msg, 400)
    } else {
        next();
    }
}

router.post('/', isLoggedIn, validateReview, catchAsync(reviews.createReview))

router.delete('/:reviewId', isReviewAuthor, isLoggedIn, catchAsync(reviews.deleteReview))

module.exports = router;