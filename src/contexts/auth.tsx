import React, {createContext, useContext, useState} from 'react';
import * as auth from '../services/auth.service';
import {ISignIn} from '../types/auth.type';
import { ModalControlContext } from './modals';

interface IAuthContext{
    signed: boolean;
    signIn: (data: ISignIn) => Promise<void>;
    signOut:() => void;
    user: object | null;
    error: boolean;
}

interface IProps {
  children: React.ReactNode
}

export const AuthContext = createContext<IAuthContext>({} as IAuthContext);

export const AuthProvider: React.FC<IProps> = ({children}) => {

  const [user, setUser] = useState<object | null>(null);
  const [error, setError] = useState<boolean>(false);

  const {setIsOpenSignInModal} = useContext(ModalControlContext);

  const signIn = async (data: ISignIn) => {
    
    await auth.signInService(data)
      .then((response: any) => {
          setUser(response.data);
          setError(false);
          setIsOpenSignInModal(false);
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
          signed: !!user, user, signIn, signOut, error
        }}
      >
          {children}
      </AuthContext.Provider>
  );
}