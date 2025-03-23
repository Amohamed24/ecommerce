import jwt from 'jsonwebtoken';

const authUser = async (req, res, next) => {
  // Look for the Authorization header with Bearer token
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer')) {
    return res
      .status(401)
      .json({ success: false, message: 'Not Authorized Login Again' });
  }

  // Extract the token from "Bearer <token>"
  const token = authHeader.split(' ')[1];

  try {
    const token_decode = jwt.verify(token, process.env.JWT_SECRET);
    req.body.userId = token_decode.id;

    // need to call this to proceed to route handler
    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({ success: false, message: error.message });
  }
};

export default authUser;
