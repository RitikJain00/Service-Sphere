import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "RitikJain";

interface AuthenticatedRequest extends Request {
  user?: any; // Define user type (modify as per schema)
}

const LoginStatus = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {

  const authenticate = req.headers.authorization; // Extract token from header
 

  if (!(authenticate) || !(authenticate.startsWith('Bearer '))) 
  {
     res.status(403).json({ msg: "Invalid token" });
     return
  }

  const token = authenticate.split(" ")[1]; // Extract token

  try {
    const decoded = jwt.verify(token, JWT_SECRET); // Verify token
    req.user = decoded; // Attach decoded user to request
    next(); // Pass to next middleware/route
  } catch (err) {
    res.status(403).json({ msg: "Invalid token" });
    return
  }
};

export default LoginStatus;
