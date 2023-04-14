import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
  if (!req.headers.authorization) {
    return res.status(403).json({ message: "Not authorizzed. No token " });
  }

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer ")
  ) {
    const token = req.headers.authorization.split(" ")[1];
    jwt.verify(token, process.env.JWT_SECRET_KEY, (error, data) => {
      if (error) {
        return res.status(403).json({ msg: "Wrong or expired token" });
      } else {
        req.id = data.userId;
        console.log(req.id, "here");
      }
    });
  }
};
