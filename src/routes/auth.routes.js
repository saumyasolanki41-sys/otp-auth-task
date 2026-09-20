const express=require("express");
 const{signup}=require("../controllers/auth.controller");
 const{validateSignup}=require("../validators/auth.validator");
  const{signupLimiter}=require("../middleware/rateLimit.middleware");
const router = express.Router();
router.post(
   "/signup",
  signupLimiter,
   validateSignup,
   signup
);
module.exports = router;