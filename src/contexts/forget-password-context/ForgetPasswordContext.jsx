import { createContext, useState } from 'react';

const INITIAL_VALUES = {
  forgetPasswordModalOpened: false,
  setForgetPasswordModalOpened: (v) => {},
  forgetPasswordFormEnterEmailAppended: true,
  setForgetPasswordFormEnterEmailAppended: (v) => {},
  forgetPasswordFormEnterCodeAppended: false,
  setForgetPasswordFormEnterCodeAppended: (v) => {},
  forgetPasswordFormResetPasswordAppended: false,
  setForgetPasswordFormResetPasswordAppended: (v) => {},
  user: null,
  setUser: (v) => {},
  resetContext: () => {}
};

const ForgetPasswordContext = createContext(INITIAL_VALUES);

export const ForgetPasswordProvider = ({ children }) => {
  const [forgetPasswordModalOpened, setForgetPasswordModalOpened] = useState(
    INITIAL_VALUES.forgetPasswordModalOpened
  );
  const [
    forgetPasswordFormEnterEmailAppended,
    setForgetPasswordFormEnterEmailAppended
  ] = useState(INITIAL_VALUES.forgetPasswordFormEnterEmailAppended);
  const [
    forgetPasswordFormEnterCodeAppended,
    setForgetPasswordFormEnterCodeAppended
  ] = useState(INITIAL_VALUES.forgetPasswordFormEnterCodeAppended);
  const [
    forgetPasswordFormResetPasswordAppended,
    setForgetPasswordFormResetPasswordAppended
  ] = useState(INITIAL_VALUES.forgetPasswordFormResetPasswordAppended);
  const [user, setUser] = useState(INITIAL_VALUES.user);
  const resetContext = () => {
    setForgetPasswordFormEnterEmailAppended(true);
    setForgetPasswordFormEnterCodeAppended(false);
    setForgetPasswordFormResetPasswordAppended(false);
    setUser(null);
  };
  return (
    <ForgetPasswordContext.Provider
      value={{
        forgetPasswordModalOpened,
        setForgetPasswordModalOpened,
        forgetPasswordFormEnterEmailAppended,
        setForgetPasswordFormEnterEmailAppended,
        forgetPasswordFormEnterCodeAppended,
        setForgetPasswordFormEnterCodeAppended,
        forgetPasswordFormResetPasswordAppended,
        setForgetPasswordFormResetPasswordAppended,
        user,
        setUser,
        resetContext
      }}
    >
      {children}
    </ForgetPasswordContext.Provider>
  );
};

export default ForgetPasswordContext;
