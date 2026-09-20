const express=require("express");
 const{signup,verifyOtp}=require("../controllers/auth.controller");
 const{validateSignup,validateVerifyOtp}=require("../validators/auth.validator");
  const{signupLimiter,verifyOtpLimiter,}=require("../middleware/rateLimit.middleware");
const router = express.Router();
router.post(
   "/signup",signupLimiter, validateSignup,signup
);

router.post(
  "/verify-otp",verifyOtpLimiter,validateVerifyOtp,verifyOtp
);

module.exports = router;