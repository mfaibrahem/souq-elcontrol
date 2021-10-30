import { createContext, useState } from 'react';

const INITIAL_VALUES = {
  forgetPasswordModalOpened: false,
  setForgetPasswordModalOpened: (v) => {},
  forgetPasswordForm1Appended: true,
  setForgetPasswordForm1Appended: (v) => {},
  forgetPasswordForm2Appended: false,
  setForgetPasswordForm2Appended: (v) => {},
  forgetPasswordForm3Appended: false,
  setForgetPasswordForm3Appended: (v) => {},
  userEmail: '',
  setUserEmail: (v) => {},
  resetContext: () => {}
};

const ForgetPasswordContext = createContext(INITIAL_VALUES);

export const ForgetPasswordProvider = ({ children }) => {
  const [forgetPasswordModalOpened, setForgetPasswordModalOpened] = useState(
    INITIAL_VALUES.forgetPasswordModalOpened
  );
  const [forgetPasswordForm1Appended, setForgetPasswordForm1Appended] =
    useState(INITIAL_VALUES.forgetPasswordForm1Appended);
  const [forgetPasswordForm2Appended, setForgetPasswordForm2Appended] =
    useState(INITIAL_VALUES.forgetPasswordForm2Appended);
  const [forgetPasswordForm3Appended, setForgetPasswordForm3Appended] =
    useState(INITIAL_VALUES.forgetPasswordForm3Appended);
  const [userEmail, setUserEmail] = useState(INITIAL_VALUES.userEmail);
  const resetContext = () => {
    setForgetPasswordForm1Appended(true);
    setForgetPasswordForm2Appended(false);
    setForgetPasswordForm3Appended(false);
    setUserEmail('');
  };
  return (
    <ForgetPasswordContext.Provider
      value={{
        forgetPasswordModalOpened,
        setForgetPasswordModalOpened,
        forgetPasswordForm1Appended,
        setForgetPasswordForm1Appended,
        forgetPasswordForm2Appended,
        setForgetPasswordForm2Appended,
        forgetPasswordForm3Appended,
        setForgetPasswordForm3Appended,
        userEmail,
        setUserEmail,
        resetContext
      }}
    >
      {children}
    </ForgetPasswordContext.Provider>
  );
};

export default ForgetPasswordContext;
