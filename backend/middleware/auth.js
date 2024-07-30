import jwt from "jsonwebtoken";

const authMiddleware = async (req, res, next) => {
  const { token } = req.headers;
  if (!token)
    return res.status(401).json({ success: false, message: "Not authorized" });

  try {
    const tokenDecode = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.body.userId = tokenDecode.id;
    next();
  } catch (err) {
    return res
      .status(400)
      .json({ success: false, message: "Something went wrong" });
    console.log(err);
  }
};

export default authMiddleware;
