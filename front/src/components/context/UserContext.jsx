import React, { createContext, useState, useContext, useEffect } from "react";
import { loginUser, getUserById } from "../../api/library/UsersApi";

const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [userData, setUserData] = useState({});

  useEffect(() => {
    if (localStorage.user !== undefined) {
      setUserData(JSON.parse(localStorage.getItem("user")));
    }
  }, []);

  function refreshUserData(id) {
    getUserById(id).then((res) => {
      setUserData(res.data.data.users);
      localStorage.setItem("user", JSON.stringify(res.data.data.users));
    });
  }

  async function doLogin(data) {
    let result = await loginUser(data).then((res) => {
      setUserData(res.data.user);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      localStorage.setItem("token", JSON.stringify(res.data.token));
      return res;
    });
    return result;
  }

  function signOut() {
    setUserData({});
    localStorage.clear();
  }

  return (
    <UserContext.Provider
      value={{
        setUserData,
        userData,
        doLogin,
        refreshUserData,
        signOut,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useGlobalUserContext = () => {
  return useContext(UserContext);
};

export { UserContext, UserProvider };
