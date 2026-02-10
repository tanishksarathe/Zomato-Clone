import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { ShoppingCart } from "lucide-react";
import toast from "react-hot-toast";

const UserOverview = () => {
  const navigate = useNavigate();

  const { isLogin } = useAuth();

  if (!isLogin) {
    navigate("/login");
  }

  return (
    <>
      <div>User Overview</div>
    </>
  );
};

export default UserOverview;
