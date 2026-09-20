const express=require("express");
 const{signup,verifyOtp,login,}=require("../controllers/auth.controller");
 const{validateSignup,validateVerifyOtp,validateLogin,}=require("../validators/auth.validator");
  const{signupLimiter,verifyOtpLimiter,loginLimiter}=require("../middleware/rateLimit.middleware");
const router = express.Router();

router.post(
   "/signup",signupLimiter, validateSignup,signup
);
router.post(
  "/verify-otp",verifyOtpLimiter,validateVerifyOtp,verifyOtp
);
router.post("/login",loginLimiter,validateLogin,login
);

module.exports = router;