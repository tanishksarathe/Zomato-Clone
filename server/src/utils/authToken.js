import jwt from "jsonwebtoken";

export const genToken = async (user, res) => {
  try {
    const payload = {
      id: user._id,
      role: user.role || "admin",
    };
    const token = await jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "1d",
      // 1d, 1h, '' forever,
    });

    res.cookie("oreo", token, {
        maxAge:1000*60*60*24,
        httpOnly:true,
        secure:false,
        sameSite:'lax', 
    })
    
  } catch (error) {
    throw error;
  }
};
