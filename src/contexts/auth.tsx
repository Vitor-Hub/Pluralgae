import React, {createContext, useContext, useEffect, useState} from 'react';
import * as auth from '../services/auth.service';
import {ISignIn} from '../types/auth.type';
import { IUser } from '../types/user.type';
import { ModalControlContext } from './modals';

interface IAuthContext{
    signed: boolean;
    signIn: (data: ISignIn) => Promise<void>;
    signOut:() => void;
    user: IUser | null;
    error: boolean;
    setUser: Function;
}

interface IProps {
  children: React.ReactNode
}

export const AuthContext = createContext<IAuthContext>({} as IAuthContext);

export const AuthProvider: React.FC<IProps> = ({children}) => {

  const [user, setUser] = useState<IUser | null>(null);
  const [error, setError] = useState<boolean>(false);

  const {setIsOpenSignInModal} = useContext(ModalControlContext);

  useEffect(() => {
    const storagedToken = localStorage.getItem("token");
    const storagedUser = localStorage.getItem("user");

    if (storagedToken && storagedUser) setUser(JSON.parse(storagedUser));
  },[]);

  const signIn = async (data: ISignIn) => {
    
    await auth.signInService(data)
      .then((response: any) => {
          let data = {...response.data, city: response.data.address.city, address: response.data.address.address, state: response.data.address.state, zipCode: response.data.address.zipCode};
          setUser(data);
          setError(false);
          setIsOpenSignInModal(false);
          localStorage.setItem("token", response.data.access_token);
          localStorage.setItem("user", JSON.stringify(data));
      })
      .catch((e: Error) => {
          console.error(e);
          setUser(null);
          setError(true);
      });
  }

  const signOut = () => {
    setUser(null);
  }

  return(
      <AuthContext.Provider 
        value={{ 
          signed: !!user, user, signIn, signOut, error, setUser
        }}
      >
          {children}
      </AuthContext.Provider>
  );
}