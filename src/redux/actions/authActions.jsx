 
export const LOGIN = "LOGIN";
export const SIGNUP = "SIGNUP";
export const RESET_PASSWORD = "RESET_PASSWORD";


export const loginAction = (username, password) => {
  return {
    type: LOGIN,
    payload: { username, password },
  };
};

export const signupAction = (username, email, password, securityQuestion, securityAnswer) => {
  return {
    type: SIGNUP,
    payload: { username, email, password, securityQuestion, securityAnswer },
  };
};

export const resetPasswordAction = (username, securityAnswer, newPassword) => {
  return {
    type: RESET_PASSWORD,
    payload: { username, securityAnswer, newPassword },
  };
};
