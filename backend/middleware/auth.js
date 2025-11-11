import jwt from "jsonwebtoken";

const authUser = async (req, res, next) => {
  const authHeader = req.headers["authorization"]; // lowercase because Express normalizes header names

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({
      message: "You are not authorized, login again",
      success: false,
    });
  }

  const token = authHeader.split(" ")[1]; // Get token after 'Bearer '

  try {
    const token_decode = jwt.verify(token, process.env.JWT_SECRATE);

    // ✅ Ensure req.body is defined before setting userId
    if (!req.body) {
      req.body = {};
    }

    req.body.userId = token_decode.id;
    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({ success: false, message: error.message });
  }
};

export default authUser;