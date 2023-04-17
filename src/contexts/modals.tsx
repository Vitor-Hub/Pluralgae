import React, { createContext, useState } from "react";

interface IProps {
  children: React.ReactNode;
}

interface IModalControlContext {
  isOpenSignInModal: boolean;
  isOpenSignUpModal: boolean;
  setIsOpenSignInModal: Function;
  setIsOpenSignUpModal: Function;
}

export const ModalControlContext = createContext<IModalControlContext>(
  {} as IModalControlContext
);

export const ModalControlProvider: React.FC<IProps> = ({ children }) => {
  const [isOpenSignInModal, setIsOpenSignInModal] = useState<boolean>(false);
  const [isOpenSignUpModal, setIsOpenSignUpModal] = useState<boolean>(false);

  return (
    <ModalControlContext.Provider
      value={{
        isOpenSignUpModal,
        isOpenSignInModal,
        setIsOpenSignInModal,
        setIsOpenSignUpModal,
      }}
    >
      {children}
    </ModalControlContext.Provider>
  );
};
