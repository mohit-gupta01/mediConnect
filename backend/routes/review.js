const express = require("express");
const { getAllReviews, createReview } = require("../controllers/reviewController");
const { authenticate, restrict } = require('../auth/verifyToken');

const router = express.Router({ mergeParams: true });

router.route('/').get(getAllReviews).post(authenticate, restrict(["patient"]), createReview);


module.exports = router;