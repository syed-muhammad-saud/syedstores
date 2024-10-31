import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const mockApiDelay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// Helper functions to manage local storage
const getUserFromLocalStorage = () => {
  const savedUser = localStorage.getItem('user');
  return savedUser ? JSON.parse(savedUser) : null;
};

const saveUserToLocalStorage = (user) => {
  localStorage.setItem('user', JSON.stringify(user));
};

const removeUserFromLocalStorage = () => {
  localStorage.removeItem('user');
};

// Initial state
const initialState = {
  user: getUserFromLocalStorage(),
  responseMessage: '',
  error: null,
};

// Async thunks for API calls
export const login = createAsyncThunk('auth/login', async ({ username, password }, thunkAPI) => {
  try {
    await mockApiDelay(1000); // Simulate API delay
    const storedUser = getUserFromLocalStorage();
    if (storedUser && storedUser.username === username && storedUser.password === password) {
      return storedUser; // Return user info on successful login
    }
    throw new Error('Invalid username or password');
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

export const signup = createAsyncThunk('auth/signup', async ({ username, email, password, securityQuestion, securityAnswer }, thunkAPI) => {
  try {
    await mockApiDelay(1000); // Simulate API delay
    const newUser = { username, email, password, securityQuestion, securityAnswer };
    saveUserToLocalStorage(newUser); // Save new user info in local storage
    return newUser; // Return new user info
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

export const resetPassword = createAsyncThunk('auth/resetPassword', async ({ username, securityAnswer, newPassword }, thunkAPI) => {
  try {
    await mockApiDelay(1000); // Simulate API delay
    const storedUser = getUserFromLocalStorage();
    if (storedUser && storedUser.username === username && storedUser.securityAnswer === securityAnswer) {
      storedUser.password = newPassword; // Update password
      saveUserToLocalStorage(storedUser); // Save updated user info
      return 'Password reset successful';
    }
    throw new Error('Invalid username or security answer');
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

// New thunk for updating user information
export const updateUser = createAsyncThunk('auth/updateUser', async ({ username, email, oldPassword, newPassword }, thunkAPI) => {
  try {
    await mockApiDelay(1000); // Simulate API delay
    const storedUser = getUserFromLocalStorage();
    if (storedUser && storedUser.password === oldPassword) {
      storedUser.username = username; // Update username
      storedUser.email = email; // Update email
      if (newPassword) {
        storedUser.password = newPassword; // Update password if newPassword is provided
      }
      saveUserToLocalStorage(storedUser); // Save updated user info
      return storedUser; // Return updated user info
    }
    throw new Error('Invalid old password');
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

// Create slice
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null; // Reset user to null to indicate logged out state
      state.responseMessage = '';
      state.error = null;
      // Optionally clear specific sensitive data from local storage only if needed
      // removeUserFromLocalStorage(); // Uncomment if you want to remove all user data
    },
    clearResponseMessage: (state) => {
      state.responseMessage = ''; // Clear response message
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.fulfilled, (state, action) => {
        state.user = action.payload; // Set user info on successful login
        state.responseMessage = 'Login successful';
        state.error = null;
      })
      .addCase(login.rejected, (state, action) => {
        state.responseMessage = '';
        state.error = action.payload; // Set error message on login failure
      })
      .addCase(signup.fulfilled, (state, action) => {
        state.user = action.payload; // Set user info on successful signup
        state.responseMessage = 'Signup successful';
        state.error = null;
      })
      .addCase(signup.rejected, (state, action) => {
        state.responseMessage = '';
        state.error = action.payload; // Set error message on signup failure
      })
      .addCase(resetPassword.fulfilled, (state, action) => {
        state.responseMessage = action.payload; // Set success message on password reset
        state.error = null;
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.responseMessage = '';
        state.error = action.payload; // Set error message on password reset failure
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.user = action.payload; // Update user info
        state.responseMessage = 'User information updated successfully!';
        state.error = null;
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.responseMessage = '';
        state.error = action.payload; // Set error message on update failure
      });
  },
});

export const { logout, clearResponseMessage } = authSlice.actions;

export default authSlice.reducer;
