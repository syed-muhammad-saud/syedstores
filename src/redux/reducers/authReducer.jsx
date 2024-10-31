
import { LOGIN, SIGNUP, RESET_PASSWORD } from "../actions/authActions";

const initialState = {
  users: {},
  responseMessage: "",
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case SIGNUP:
      const { username, email, password, securityQuestion, securityAnswer } = action.payload;
      return {
        ...state,
        users: {
          ...state.users,
          [username]: { username, email, password, securityQuestion, securityAnswer },
        },
        responseMessage: "Signup successful! You can now log in.",
      };

    case LOGIN:
      const loginUser = state.users[action.payload.username];
      if (loginUser && loginUser.password === action.payload.password) {
        return { ...state, responseMessage: "Login successful!" };
      } else {
        return { ...state, responseMessage: "Login failed. Check your credentials." };
      }

    case RESET_PASSWORD:
      const resetUser = state.users[action.payload.username];
      if (resetUser && resetUser.securityAnswer === action.payload.securityAnswer) {
        return {
          ...state,
          users: {
            ...state.users,
            [action.payload.username]: { ...resetUser, password: action.payload.newPassword },
          },
          responseMessage: "Password reset successful! You can now log in with your new password.",
        };
      } else {
        return { ...state, responseMessage: "Security answer is incorrect." };
      }

    default:
      return state;
  }
};

export default authReducer;
