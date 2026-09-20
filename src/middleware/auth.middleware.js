const jwt = require("jsonwebtoken");
const User = require("../models/user");

const requireAuth = async (req, res, next) => {
  const authorization = req.get("Authorization");

  const match = authorization?.match(/^Bearer ([^\s]+)$/i);

  if (!match) {
    return res.status(401).json({
      success: false,
      message: "Please provide a Bearer token",
    });
  }

  const token = match[1];
  const secret = process.env.JWT_SECRET;

  if (!secret) {
    return next(new Error("JWT_SECRET is missing"));
  }

  let payload;

  try {
    payload = jwt.verify(token, secret, {
      algorithms: ["HS256"],
      issuer: "otp-auth-task",
      audience: "otp-auth-task-client",
    });
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({
        success: false,
        message: "Your session has expired. Please log in again.",
      });
    }

    if (
      error.name === "JsonWebTokenError" ||
      error.name === "NotBeforeError"
    ) {
      return res.status(401).json({
        success: false,
        message: "Invalid authentication token",
      });
    }

    return next(error);
  }

  if (
    !payload ||
    typeof payload !== "object" ||
    typeof payload.sub !== "string" ||
    !/^[a-f0-9]{24}$/i.test(payload.sub) ||
    typeof payload.exp !== "number"
  ) {
    return res.status(401).json({
      success: false,
      message: "Invalid authentication token",
    });
  }

  try {
    const user = await User.findById(payload.sub)
      .select("_id name email isVerified createdAt");

    if (!user || !user.isVerified) {
      return res.status(401).json({
        success: false,
        message: "This account is not available for authenticated access",
      });
    }

    req.user = user;

    next();
  } catch (error) {
    next(error);
  }
};

module.exports = { requireAuth };