import jwt from "jsonwebtoken";

export const verify = (req, res, next) => {
  try {
    let token = req.header("Authorization");

    if (!token) {
      return res.status(403).send("Token Not Available");
    }

    if (token.startsWith("Bearer ")) {
      token = token.slice(" ")[1];
    }

    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified;
    next();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
