import jwt from "jsonwebtoken";

export const genToken = async (user, res) => {
  try {
    const payload = {
      id: user._id,
      role: user.role,
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

// generated to reset the password on forgot password
export const genOTPToken = async (user, res) => {
  try {
    const payload = {
      id: user._id,
      role: user.role,
    };
    const token = await jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "10m",
      // 1d, 1h, '' forever,
    });

    res.cookie("otpToken", token, {
        maxAge:1000*60*10,
        httpOnly:true,
        secure:false,
        sameSite:'lax', 
    })
    
  } catch (error) {
    throw error;
  }
};
