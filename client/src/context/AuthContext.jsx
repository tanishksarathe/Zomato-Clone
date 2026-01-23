import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = (props) => {
  const [user, setUser] = useState(JSON.parse(sessionStorage.getItem("GrabMyMeal User")) || "");

  const [isLogin, setIsLogin] = useState(false);

  useEffect(() => {
    setIsLogin(!!user);
  }, [user]);

  const value = { user, setUser, isLogin, setIsLogin };

  return (
    <AuthContext.Provider value={value}>{props.children}</AuthContext.Provider>
  );
};

//permission granted

export const useAuth = () => useContext(AuthContext);
