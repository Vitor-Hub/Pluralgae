import React, { createContext, useContext, useEffect, useState } from "react";
import * as auth from "../services/auth.service";
import { ISignIn } from "../types/auth.type";
import { IUser } from "../types/user.type";
import { ModalControlContext } from "./modals";

interface IAuthContext {
  signed: boolean;
  signIn: (data: ISignIn) => Promise<void>;
  signOut: () => void;
  user: IUser | null;
  error: boolean;
  setUser: Function;
}

interface IProps {
  children: React.ReactNode;
}

export const AuthContext = createContext<IAuthContext>({} as IAuthContext);

export const AuthProvider: React.FC<IProps> = ({ children }) => {
  const [user, setUserState] = useState<IUser | null>(null);
  const [error, setError] = useState<boolean>(false);

  const { setIsOpenSignInModal } = useContext(ModalControlContext);

  useEffect(() => {
    const storagedToken = localStorage.getItem("token");
    const storagedUser = localStorage.getItem("user");

    if (storagedToken && storagedUser) setUserState(JSON.parse(storagedUser));
  }, []);

  useEffect(() => {
    if (user) {
      localStorage.setItem("token", user.access_token);
      localStorage.setItem("user", JSON.stringify(user));
    }
  }, [user]);

  useEffect(() => {
    const handleBeforeUnload = () => {
      if (user) {
        localStorage.setItem("token", user.access_token);
        localStorage.setItem("user", JSON.stringify(user));
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [user]);

  const signIn = async (data: ISignIn) => {
    await auth
      .signInService(data)
      .then((response: any) => {
        setUserState(response.data);
        setError(false);
        setIsOpenSignInModal(false);
      })
      .catch((e: Error) => {
        console.error(e);
        setUserState(null);
        setError(true);
      });
  };

  const signOut = () => {
    localStorage.clear();
    setUserState(null);
  };

  return (
    <AuthContext.Provider
      value={{
        signed: !!user,
        user,
        signIn,
        signOut,
        error,
        setUser: setUserState,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};